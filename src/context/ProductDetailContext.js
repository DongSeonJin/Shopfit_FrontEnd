import React, { createContext, useContext, useState } from 'react';

const ProductDetailContext = createContext();

export const ProductDetailProvider = ({ children }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  return (
    <ProductDetailContext.Provider value={{ totalPrice, setTotalPrice, quantity, setQuantity }}>
      {children}
    </ProductDetailContext.Provider>
  );
};

export const useProductDetail = () => {
  return useContext(ProductDetailContext);
};
