import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CartQuantity from '../../components/shop/CartQuantity';
import HeaderSubMyPage from "../../components/common/HeaderSubMypage";

// import styles from '../../styles/shop/CartList.module.css';

const CartList = () => {
  const userId = 1; // 임시로 설정한 userId 변수 -> 추후 수정해야 함

  const [cartItems, setCartItems] = useState([]); // 장바구니 아이템 상태 관리
  // const { userId } = useParams(); // userId를 useParams로 추출 -> 제거
  const navigate = useNavigate();

  const [isCheckedAll, setIsCheckedAll] = useState(true); // 전체 선택 여부 상태관리
  // 전체 선택/해제 이벤트 핸들러
  const handleCheckChange = () => {
    setIsCheckedAll(!isCheckedAll);
    // cartItems 상태를 업데이트하면서 isChecked 값을 변경
    setCartItems((prevItems) => prevItems.map((item) => ({ ...item, isChecked: !isCheckedAll })));
  };

  // 개별 아이템 체크 여부 변경 이벤트 핸들러
  const handleItemCheckChange = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.cartId === cartId ? { ...item, isChecked: !item.isChecked } : item))
    );
  };

  // 선택된 아이템 일괄 삭제 이벤트 핸들러
  const handleBulkDelete = async () => {
    const selectedCartIds = cartItems.filter((item) => item.isChecked).map((item) => item.cartId);

    if (selectedCartIds.length === 0) {
      return;
    }

    // 선택된 아이템들을 순회하며 삭제 요청을 보내고, 성공한 경우 상태를 업데이트
    try {
      await Promise.all(selectedCartIds.map((cartId) => axios.delete(`/cart/${cartId}`)));

      setCartItems((prevItems) => prevItems.filter((item) => !selectedCartIds.includes(item.cartId)));
    } catch (error) {
      console.error("선택 삭제 요청 에러", error);
    }
  };

  // 개별 아이템 삭제 이벤트 핸들러
  const handleDelete = async (cartId) => {
    try {
      // 선택한 아이템 하나를 삭제 요청
      await axios.delete(`/cart/${cartId}`);
      // 삭제 요청이 성공한 경우, 해당 아이템을 장바구니에서 제거
      setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
    } catch (error) {
      console.error("삭제 요청 에러", error);
    }
  };

  // 선택된 아이템의 총 가격 계산
  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.isChecked) // isChecked가 true인 항목만 선택
      .reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleItemQuantityChange = (cartId, newQuantity) => {
    // console.log(cartId);
    // console.log(newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item))
    );
  };

  // 컴포넌트 로드 시에 장바구니 아이템 조회
  useEffect(() => {
    axios
      .get(`/cart/${userId}`)
      .then((response) => {
        // 조회한 아이템에 isChecked 속성 추가하여 상태 초기화
        const itmesWithCheckStatus = response.data.map((item) => ({
          ...item,
          quantity: item.quantity,
          isChecked: true,
        }));
        setCartItems(itmesWithCheckStatus);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("장바구니 조회 get 요청 에러", error);
      });
  }, [userId]);

  // 컴포넌트 내부에 handleOrderClick 함수 추가
  const handleOrderClick = () => {
    const selectedItems = cartItems.filter((item) => item.isChecked);
    navigate(`/shopping/order`, { state: { selectedItems } });
  };

  return (
    <div style={{ maxWidth: '1420px', width: '100%', margin: '0 auto 150px'}}>
      <HeaderSubMyPage />

      <div style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', width: '100%' }}>장바구니</div>
      <div style={{display: 'flex'}}>
        <div style={{flex: 1}}>
          <input type="checkbox" style={{ margin: '10px' }} id="checkAll" checked={isCheckedAll} onChange={handleCheckChange} />
          {isCheckedAll ? "전체해제" : "전체선택"}
        </div>
        <div style={{flex: 1, textAlign: 'right'}}>
          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleBulkDelete()}>
            선택삭제
          </Button>
        </div>
      </div>


      <div style={{ borderTop: '1px solid lightgray', borderBottom: '1px solid lightgray', minHeight: '240px', padding: '20px', margin: '50px 0'}}>
        {cartItems.map((item) => (
          <div key={item.cartId} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', position: 'relative' }}>
            <div>
              <input
                type="checkbox"
                style={{ margin: '0 5px', width: '10px' }}
                checked={item.isChecked}
                onChange={() => handleItemCheckChange(item.cartId)}
              />
            </div>
            <div style={{margin: '0 10px'}}>
              <img style={{ height: '180px', width: '180px', borderRadius: '25px', border: '1px white solid' }} src={item.thumbnailUrl} alt={item.productName} />
            </div>

            <div style={{ width: '60%', padding: '0 20px' }}>
              <div style={{ fontSize: '24px', display: 'block', flex: 1 }}>{item.productName}</div>
              <div style={{ textAlign: 'right', color: '#888', flex: 1, fontSize: '20px' }}>{item.price.toLocaleString()}원</div>
            </div>
            <div style={{ display: 'flex', width: '40%', textAlign: 'center', alignItems: 'center'}}>
              <div style={{flex: '4', paddingRight: '20px'}}>
                <div style={{ display: 'flex', width: '100%', justifyContent: "right", paddingBottom: '20px'}}>
                  <CartQuantity
                    count={item.quantity}
                    stockQuantity={item.stockQuantity}
                    onCountChange={(newCount) => handleItemQuantityChange(item.cartId, newCount)}
                  />
                </div>
                <div style={{ color: '#888', fontSize: '24px', textAlign: "right", paddingTop: '20px' }}>{(item.quantity * item.price).toLocaleString()} 원</div>
              </div>
              <div style={{flex: '1', textAlign: "right"}}>
                <Button variant="outlined" color="error" onClick={() => handleDelete(item.cartId)}>
                  삭제
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ color: '#888', textAlign: "right", fontSize: '28px'}}>총 금액 : {calculateTotal().toLocaleString()} 원</div>
      <div style={{ textAlign: 'right', margin: '3% 0'}}>
        <Button variant="outlined" onClick={() => handleOrderClick()} style={{width: '240px', height: '60px', fontSize: '28px'}}>
            주문하기
        </Button>
      </div>

    </div>

  );
};

export default CartList;
