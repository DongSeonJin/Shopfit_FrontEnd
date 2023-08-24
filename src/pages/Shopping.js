import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductList from "../components/shop/ProductList";
import ProductListCategory from "../components/shop/ProductListCategory";
import ProductDetail from "../components/shop/ProductDetail";

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
      </Routes>
    </div>
  );
};

export default Shopping;
