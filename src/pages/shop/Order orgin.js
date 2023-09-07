import React, { useEffect, useState } from "react";
import axios from "axios";
import addDays from "date-fns/addDays";
import { useLocation, useNavigate } from "react-router-dom";
import PurchasedProduct from '../../components/shop/PurchasedProduct';
import SearchAddress from '../../components/shop/SearchAddress';
import { IAMPORT_API_KEY, KAKAOPAY_PG, TOSSPAY_PG } from "../../config";

const Order = () => {
  const now = new Date();
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [detailedAddress, setDetailedAddress] = useState("");
  const [PGKey, setPGKey] = useState();

  const location = useLocation();
  const selectedItems = location.state.selectedItems;

  const initialOrderData = {
    userId: selectedItems[0].userId,
    totalPrice: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    deliveryDate: addDays(now, 3),
    address: "",
    phoneNumber: "",
    orderDate: now,
    orderStatus: "1",
    orderProducts: selectedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const [productStocks, setProductStocks] = useState({});

  useEffect(() => {
    // 선택한 상품들의 재고 정보를 가져오는 함수
    const fetchProductStocks = async () => {
      try {
        const stockInfo = {};
        for (const selected of selectedItems) {
          const response = await axios.get(`/shopping/products/${selected.productId}`);
          stockInfo[selected.productId] = response.data.stockQuantity;
        }
        setProductStocks(stockInfo);
      } catch (error) {
        console.error("Error fetching product stocks:", error);
      }
    };

    fetchProductStocks();
  }, [selectedItems]);

  const [orderData, setOrderData] = useState(initialOrderData);

  useEffect(() => {
    // userId를 이용하여 장바구니 정보를 가져오고, 가져온 정보로 cart 상태를 업데이트
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`/cart/${orderData.userId}`);
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching user cart:", error);
      }
    };

    fetchUserCart();
  }, [orderData.userId]); // userId가 변경될 때마다 useEffect 실행

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  // 결제 누락정보 확인
  const isAddressValid = orderData.address.trim() !== "";
  const isPhoneNumberValid = orderData.phoneNumber.trim() !== "";
  const isPaymentAllowed = isAddressValid && isPhoneNumberValid;

  const handlePGSelection = (selectedPG) => {
    if (selectedPG === "kakaopay") {
      setPGKey(KAKAOPAY_PG);
    } else if (selectedPG === "tosspay") {
      setPGKey(TOSSPAY_PG);
    } else if (selectedPG === null) {
      setPGKey(null);
    }
  };

  // 아임포트 결제창 열기
  const openPaymentWindow = async () => {
    if (!isPaymentAllowed) {
      alert("주소와 연락처를 입력해주세요.");
      return;
    }

    const productId = selectedItems[0].productId; // 선택한 첫 번째 상품의 productId
    try {
      const productResponse = await axios.get(`/shopping/products/${productId}`); // 제품 정보 요청
      const IMP = window.IMP;
      IMP.init(IAMPORT_API_KEY);

      // 주문 상품 수에 따라 이름 설정
      let productName = productResponse.data.productName; // 기본 상품 이름
      if (orderData.orderProducts.length > 1) {
        productName += ` 외 ${orderData.orderProducts.length - 1}건`;
      }

      IMP.request_pay(
        {
          pg: PGKey,
          pay_method: "card",
          merchant_uid: orderData.orderId,
          amount: orderData.totalPrice,
          name: productName, // productName을 아임포트의 name 필드에 사용
          buyer_email: orderData.userId,
          buyer_name: orderData.userId,
          buyer_tel: orderData.phoneNumber,
          buyer_addr: orderData.address,
        },
        async function (rsp) {
          if (rsp.success) {
            // 결제 성공
            console.log("결제가 성공적으로 완료되었습니다.");

            // handleCreateOrder 함수 호출
            await handleCreateOrder();
          } else {
            // 결제 실패
            console.log(rsp);
            alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching product information:", error);
    }
  };

  const handleCreateOrder = async () => {
    // Create orderData with detailed address
    const finalAddress = `${orderData.address} ${detailedAddress}`;
    const updatedOrderData = { ...orderData, address: finalAddress };

    try {
      // 주문 생성 요청 보내고 주문 성공 시
      const response = await axios.post("/orders", updatedOrderData);
      console.log("Order created:", response.data);

      // 주문한 제품의 productId에 해당하는 row만 선택
      const updatedCart = cart.filter((item) =>
        selectedItems.some((selected) => selected.productId === item.productId)
      );
      setCart(updatedCart); // setCart 함수로 카트를 업데이트

      // 주문이 성공적으로 생성되었으므로 주문 상세 페이지로 이동
      navigate(`/shopping/order/detail`, { state: { purchasedProducts: selectedItems } });

      // 장바구니에서 구매 이용 시 해당 상품들을 삭제
      selectedItems.forEach(async (selected) => {
        try {
          await axios.delete(`/cart/${selected.cartId}`);
        } catch (error) {
          console.error("Error removing item from cart:", error);
        }
      });

      // 주문한 제품의 재고량 업데이트
      for (const selected of selectedItems) {
        const updatedStockQuantity = productStocks[selected.productId] - selected.quantity;
        try {
          await axios.post(`/shopping/stock/${selected.productId}`, {
            stockQuantity: updatedStockQuantity,
          });
          console.log(`Stock quantity for product ${selected.productId} updated.`);
        } catch (error) {
          console.error(`Error updating stock quantity for product ${selected.productId}:`, error);
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleDetailedAddressChange = (event) => {
    setDetailedAddress(event.target.value);
  };

  const handleAddressSelected = (selectedAddress) => {
    setOrderData({
      ...orderData,
      address: selectedAddress,
    });
  };

  return (
    <div style={{ margin: "0 20%" }}>
      <h2>주문/결제</h2>
      <h4 style={{ marginTop: "50px" }}>배송정보</h4>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <div>
            <label style={{ width: "80px" }}>이름</label>
            <input style={{ width: "240px" }} type="text" name="name" value={orderData.userId} readOnly />
          </div>
          <div>
            <label style={{ width: "80px" }}>이메일</label>
            <input style={{ width: "240px" }} type="email" name="email" value={orderData.userId} readOnly />
          </div>
          <div>
            <label style={{ width: "80px" }}>연락처</label>
            <input
              style={{ width: "240px" }}
              type="tel"
              name="phoneNumber"
              value={orderData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "80px" }}>주소</label>
            <input
              style={{ width: "240px" }}
              type="text"
              name="address"
              value={orderData.address}
              onChange={handleInputChange}
            />
            <SearchAddress onSelect={handleAddressSelected} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ width: "80px" }}>상세주소</label>
            <input
              style={{ width: "240px" }}
              type="text"
              name="detailedAddress"
              value={detailedAddress}
              onChange={handleDetailedAddressChange}
            />
          </div>
          <div style={{ marginTop: "50px" }}>
            <h4>주문상품</h4>
            <div>
              <PurchasedProduct products={orderData.orderProducts} />
            </div>
          </div>
          <div style={{ marginTop: "50px" }}>
            <h4>결제방식</h4>
            <div style={{ display: "flex", margin: "5px" }}>
              <button
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "5px",
                  border: "none",
                  background: KAKAOPAY_PG === PGKey ? "#00BFFF" : "#000000",
                  color: "white",
                  borderRadius: "20%",
                  transition: "background 1s",
                }}
                onClick={() => handlePGSelection(PGKey === KAKAOPAY_PG ? null : "kakaopay")}
              >
                카카오
                <br />
                페이
              </button>
              <button
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "5px",
                  border: "none",
                  background: TOSSPAY_PG === PGKey ? "#00BFFF" : "#000000",
                  color: "white",
                  borderRadius: "20%",
                  transition: "background 1s",
                }}
                onClick={() => handlePGSelection(PGKey === TOSSPAY_PG ? null : "tosspay")}
              >
                토스
                <br />
                페이
              </button>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, margin: "0 10%" }}>
          <div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>총 상품 금액:</div>
                <div>{orderData.totalPrice.toLocaleString()}원</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>배송비:</div>
                <div>3,000원</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>최종 결제 금액:</div>
                <div>{(orderData.totalPrice + 3000).toLocaleString()}원</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <button onClick={openPaymentWindow}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
