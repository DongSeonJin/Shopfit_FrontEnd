import React, { useState, useEffect } from "react";
import axios from "axios";

import Top3Product from "../shop/Top3Product";

const HomeShopping = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    fetchTopProducts();
  }, []);


  const fetchTopProducts = async () => {
    try {
      const response = await axios.get("/wishlist/top3");
      setTopProducts(response.data);
    } catch (error) {
      console.error("상위 상품 가져오기 오류:", error);
    }
  };


  return (
    <div style={{margin: '5% 0'}}>
      <div style={{fontWeight: 'bold', margin: '2% 0', fontSize: '24px'}}>인기 상품</div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {topProducts.map((data) => (
          <div style={{width: '300px'}}>
            <Top3Product data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeShopping;
