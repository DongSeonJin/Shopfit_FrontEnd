import { createStore } from 'redux';

// 초기 상태
const initialState = {
  order: {
    userId: '',
    totalPrice: '',
    deliveryDate: '',
    address: '',
    phoneNumber: '',
    orderDate: '',
    orderStatus: '',
    quantity: 1 // 기본 수량 설정
  }
};

// 리듀서
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return { ...state, order: action.payload };
    default:
      return state;
  }
};

// 스토어 생성
const store = createStore(rootReducer);

export default store;
