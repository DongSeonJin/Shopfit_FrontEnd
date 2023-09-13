import React, { useEffect, useState } from "react";
import axios from "axios";
import addDays from "date-fns/addDays";
import { useLocation, useNavigate } from "react-router-dom";

import PurchasedProduct from "../../components/shop/PurchasedProduct";
import SearchAddress from "../../components/shop/SearchAddress";

import { IAMPORT_API_KEY, KAKAOPAY_PG, TOSSPAY_PG } from "../../config";
import { OrderStatusUpdater } from "../../components/shop/OrderStatusUpdater";
import UserPoint from "../../components/shop/UserPoint";
import CouponSelectModal from "../../components/common/modal/CouponSelectModal";

const Order = () => {
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [productStocks, setProductStocks] = useState({});
  const [detailedAddress, setDetailedAddress] = useState("");
  const [PGKey, setPGKey] = useState();
  const [userPoint, setUserPoint] = useState(null);
  const [usingPoint, setUsingPoint] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달의 열림/닫힘 상태를 관리하는 상태 변수
  const [usingCoupon, setUsingCoupon] = useState(0);
  const [couponDescription, setCouponDescription] = useState(null);
  const [isCouponUsed, setIsCouponUsed] = useState(0);

  const location = useLocation();
  const selectedItems = location.state.selectedItems;

  const initialOrderData = {
    userId: selectedItems[0].userId,
    totalPrice: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0),
    deliveryDate: addDays(now, 3),
    address: "",
    phoneNumber: "",
    orderDate: now,
    orderStatus: "결제대기",
    orderProducts: selectedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const [orderData, setOrderData] = useState(initialOrderData);

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

  const updateOrderStatus = async (orderId) => {
    try {
      await OrderStatusUpdater(orderId, "결제완료");

      console.error("주문 상태 업데이트 성공");
    } catch (error) {
      console.error("주문 상태 업데이트 중 오류 발생", error);
    }
  };

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

  useEffect(() => {
    const fetchUserPoint = async () => {
      try {
        const response = await axios.get(`/${orderData.userId}/point`);
        setUserPoint(response.data.point);
      } catch (error) {
        console.error("Error fetching user point:", error);
      }
    };

    fetchUserPoint();
  }, [orderData.userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handlePGSelection = (selectedPG) => {
    if (selectedPG === "kakaopay") {
      setPGKey(KAKAOPAY_PG);
    } else if (selectedPG === "tosspay") {
      setPGKey(TOSSPAY_PG);
    } else if (selectedPG === null) {
      setPGKey(null);
    }
  };

  // 결제 누락정보 확인
  const isAddressValid = orderData.address.trim() !== "";
  const isPhoneNumberValid = orderData.phoneNumber.trim() !== "";
  const isPaymentAllowed = isAddressValid && isPhoneNumberValid;

  const handleCreateOrder = async () => {
    if (!isPaymentAllowed) {
      alert("주소와 연락처를 입력해주세요.");
      return;
    }

    const finalAddress = `${orderData.address} ${detailedAddress}`;
    const updatedOrderData = { ...orderData, address: finalAddress };

    try {
      // 주문 생성 요청 보내고 주문 성공 시
      const response = await axios.post("/orders", updatedOrderData);

      console.log(response.data.orderId);

      // handleCreateOrder 함수 호출
      await openPaymentWindow(response.data.orderId);
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

  const handleUserPointUpdate = (newPointValue) => {
    // UserPoint 컴포넌트에서 전달된 업데이트된 포인트 값
    setUsingPoint(newPointValue);
  };

  // 함수 추가: 포인트 사용 업데이트
  const updateUsedPoints = async (usedPoints) => {
    try {
      await axios.patch(`/${orderData.userId}/usePoints/${usedPoints}`);
      console.log(`포인트 사용 업데이트 완료: ${usedPoints}`);
    } catch (error) {
      console.error("포인트 사용 업데이트 중 오류 발생", error);
    }
  };

  // 아임포트 결제창 열기
  const openPaymentWindow = async (orderId) => {
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

      // 계산된 최종 가격을 finalPrice 변수에 저장
      const finalPrice = orderData.totalPrice + 3000 - usingPoint;

      IMP.request_pay(
        {
          pg: PGKey,
          pay_method: "card",
          merchant_uid: orderId,
          amount: finalPrice, // finalPrice를 사용
          name: productName, // productName을 아임포트의 name 필드에 사용
          buyer_email: orderData.userId,
          buyer_name: orderData.userId,
          buyer_tel: orderData.phoneNumber,
          buyer_addr: orderData.address,
        },
        async function (rsp) {
          if (rsp.success) {
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

            // 결제 성공
            console.log("결제가 성공적으로 완료되었습니다.");

            // 포인트 사용 업데이트를 수행
            await updateUsedPoints(usingPoint);

            // 상태(결제완료) 업데이트
            await updateOrderStatus(orderId, "결제완료");
          } else {
            // 결제 실패
            console.log(rsp);
            alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
            try {
              await axios.delete(`/orders/${orderId}`);
              console.error(`주문 삭제 완료(${orderId})`);
            } catch (erro) {
              console.error(`존재하지 않는 주문`);
            }
          }
        }
      );
    } catch (error) {
      console.error("Error fetching product information:", error);
    }
  };

  const handleCouponApplyClick = () => {
    setIsModalOpen(true); // 쿠폰 적용 버튼 클릭 시 모달을 열기 위해 상태 변경
    setUsingPoint(0);
  };

  const closeCouponModal = () => {
    setIsModalOpen(false);
  };

  const handleCouponSelection = (discountValue, description) => {
    console.log(`선택한 쿠폰의 할인 값: ${discountValue}원`);
    setUsingCoupon(discountValue);
    setCouponDescription(description);
    setIsCouponUsed(1);
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
          <div>
            <h4>쿠폰</h4>
            <button onClick={handleCouponApplyClick}>쿠폰적용</button>
            {isModalOpen && (
              <CouponSelectModal
                onClose={closeCouponModal}
                userId={orderData.userId}
                orderData={orderData}
                onSelectCoupon={handleCouponSelection}
              />
            )}
            {couponDescription && <div>선택한 쿠폰 : {couponDescription}</div>}
          </div>
          <div>
            {/* 포인트 */}
            {userPoint !== null && (
              <UserPoint
                userPoint={userPoint}
                totalPrice={orderData.totalPrice - usingCoupon}
                onUpdateUserPoint={handleUserPointUpdate}
                isCouponUsed={isCouponUsed}
              />
            )}
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
                <div>쿠폰 사용:</div>
                <div style={{ color: "red" }}>{usingCoupon}원</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>포인트 사용:</div>
                <div style={{ color: "red" }}>{usingPoint}원</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>최종 결제 금액:</div>
                <div>{(orderData.totalPrice + 3000 - usingCoupon - usingPoint).toLocaleString()}원</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
              <button onClick={handleCreateOrder}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
