import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductList from "../components/shop/ProductList";
import ProductListCategory from "../components/shop/ProductListCategory";
import ProductDetail from "../components/shop/ProductDetail";
import Order from "../components/shop/Order";
import CartList from "../components/shop/CartList";
import ProductCreate from "../components/shop/ProductCreate";

const Shopping = () => {
  return (
    <div>
      <Routes>
        <Route path="/shopping" element={<ProductList />} />
        <Route path="/shopping/:pageNum" element={<ProductList />} />
        <Route path="/shopping/search/:keyword" element={<ProductList />} />
        <Route
          path="/shopping/search/:keyword/:pageNum"
          element={<ProductList />}
        />

        <Route
          path="/shopping/category/:categoryId"
          element={<ProductListCategory />}
        />
        <Route
          path="/shopping/category/:categoryId/:pageNum"
          element={<ProductListCategory />}
        />
        <Route
          path="/shopping/category/:categoryId/search/:keyword"
          element={<ProductListCategory />}
        />
        <Route
          path="/shopping/category/:categoryId/search/:keyword/:pageNum"
          element={<ProductListCategory />}
        />

        <Route
          path="/shopping/products/:productNum"
          element={<ProductDetail />}
        />

        <Route path="/shopping/:productNum/order" element={<Order />} />

        <Route path="/shopping/create" element={<ProductCreate />} />

        <Route path="/shopping/cart/:userId" element={<CartList />} />
      </Routes>
    </div>
  );
};

export default Shopping;
