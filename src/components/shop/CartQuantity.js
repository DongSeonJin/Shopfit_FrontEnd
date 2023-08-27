import { useState } from "react";
import styles from "../../styles/shop/CartQuantity.module.css";

const CartQuantity = (props) => {
  const [count, setCount] = useState(props.count);

  const handleButtonClick = (amount) => {
    const newValue = count + amount;
    if (newValue >= 1 && newValue <= props.stockQuantity) {
      setCount(newValue);
      props.onCountChange(newValue); // 변경된 count 값을 부모로 전달
    }
  };

  return (
    <div className={styles.squareContainer}>
      <button
        className={styles.squareElement}
        onClick={() => handleButtonClick(-1)}
        disabled={count < 2}
      >
        -
      </button>
      <input
        className={styles.squareElement}
        value={count}
        min="1" // 최소값 설정
        max={props.stockQuantity} // 최대값 설정 - 재고수량
        readOnly
      ></input>
      <button
        className={styles.squareElement}
        onClick={() => handleButtonClick(1)}
        disabled={count >= props.stockQuantity}
      >
        +
      </button>
    </div>
  );
};

export default CartQuantity;
