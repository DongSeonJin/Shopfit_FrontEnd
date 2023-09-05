import React from "react";

import { Route, Routes } from 'react-router-dom';

import NewsList from "../components/news/NewsList";


const News = () => {
  return (
    <Routes>
      <Route path="/news/list" element={<NewsList />} />
      <Route path="/news/list/:pageNum" element={<NewsList />} />
      <Route path="/news/list/search/:keyword" element={<NewsList />} />
      <Route path="/news/list/search/:keyword/:pageNum" element={<NewsList />} />
    </Routes>
  );
};

export default News;
