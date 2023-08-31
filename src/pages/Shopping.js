import React from "react";
import { Route, Routes } from "react-router-dom";

import ProductList from "../components/shop/ProductList";
import ProductListCategory from "../components/shop/ProductListCategory";
import ProductDetail from "../components/shop/ProductDetail";
import Order from "../components/shop/Order";
import OrderDetail from "../components/shop/OrderDetail";
import CartList from "../components/shop/CartList";
import WishList from "../components/shop/WishList";

import { ProductDetailProvider } from "../context/ProductDetailContext";

import ProductCreate from "../components/shop/ProductCreate";
import ProductUpdate from "../components/shop/ProductUpdate";


const Shopping = () => {
  return (
    <ProductDetailProvider>
      <Routes>
        <Route path="/shopping" element={<ProductList />} />
        <Route path="/shopping/:pageNum" element={<ProductList />} />
        <Route path="/shopping/search/:keyword" element={<ProductList />} />
        <Route path="/shopping/search/:keyword/:pageNum" element={<ProductList />} />

        <Route path="/shopping/category/:categoryId" element={<ProductListCategory />} />
        <Route path="/shopping/category/:categoryId/:pageNum" element={<ProductListCategory />} />
        <Route path="/shopping/category/:categoryId/search/:keyword" element={<ProductListCategory />} />
        <Route path="/shopping/category/:categoryId/search/:keyword/:pageNum" element={<ProductListCategory />} />

        <Route path="/shopping/products/:productNum" element={<ProductDetail />} />
        <Route path="/shopping/create" element={<ProductCreate />} />
        <Route path="/shopping/update/:productNum" element={<ProductUpdate />} />

        <Route path="/shopping/order" element={<Order />} />
        <Route path="/shopping/order/detail" element={<OrderDetail />} />
          
        <Route path="/shopping/cart" element={<CartList />} />  

        <Route path="/shopping/wishlist" element={<WishList />} />

        <Route path="/shopping/sort/:sortType" element={<ProductList />} />
        <Route path="/shopping/sort/:sortType/:pageNum" element={<ProductList />} />
        <Route path="/shopping/category/:categoryId/sort/:sortType" element={<ProductListCategory />} />
        <Route path="/shopping/category/:categoryId/sort/:sortType/:pageNum" element={<ProductListCategory />} />

      </Routes>
    </ProductDetailProvider>
  );
};

export default Shopping;
