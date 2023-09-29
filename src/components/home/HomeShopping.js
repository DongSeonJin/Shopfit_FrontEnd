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
    <div style={{maxWidth: '1080px', width: '90%', margin: '0 auto 150px'}}>

      <div style={{fontWeight: 'bold', margin: '25px 0', fontSize: '24px'}}>인기 상품</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px'}}>
        {topProducts.map((data) => (
          <div>
            <Top3Product data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeShopping;
