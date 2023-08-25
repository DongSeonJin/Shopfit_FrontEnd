import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductList from "../components/shop/ProductList";
import ProductListCategory from "../components/shop/ProductListCategory";
import ProductDetail from "../components/shop/ProductDetail";
import Order from "../components/shop/Order";

import { ProductDetailProvider } from "../context/ProductDetailContext";


const Shopping = () => {
  return (
    <ProductDetailProvider>  
        <Routes>
          <Route path="/shopping" element={<ProductList />} />
          <Route path="/shopping/:pageNum" element={<ProductList />} />
          <Route path="/shopping/search/:keyword" element={<ProductList />} />
          <Route
            path="/shopping/search/:keyword/:pageNum"
            element={<ProductList />}
          />


          <Route path="/shopping/category/:categoryId" element={<ProductListCategory />} />
          <Route path="/shopping/category/:categoryId/:pageNum" element={<ProductListCategory />} />
          <Route path="/shopping/category/:categoryId/search/:keyword" element={<ProductListCategory />} />
          <Route path="/shopping/category/:categoryId/search/:keyword/:pageNum" element={<ProductListCategory />} />

          <Route path="/shopping/products/:productNum" element={<ProductDetail />} />

          <Route path="/shopping/:productNum/order" element={<Order />} />

        </Routes>
    </ProductDetailProvider>
  );
};

export default Shopping;
