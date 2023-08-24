import React from "react";

import ProductList from "../components/shop/ProductList";
// import ProductDetail from "../components/shop/ProductDetail";

import styles from "../styles/pages/Shopping.module.css";

const Shopping = () => {
  return (
    <div className={styles.shoppingBody}>
      <ProductList />
    </div>
  );
};

export default Shopping;
