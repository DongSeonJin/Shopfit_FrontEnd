import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchasedProduct = ({ products }) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const promises = products.map((product) => axios.get("/shopping/detail/" + product.productId));
        const responses = await Promise.all(promises);
        const fetchedProductData = responses.map((response) => response.data);
        setProductData(fetchedProductData);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setProductData([]); // Error occurred, set data to empty array
      }
    };

    fetchProductData();
  }, [products]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
        {productData.map((product, index) => (
          <div style={{ display: "flex", margin: "5px 0", height: "120px", width: "100%" }}>
            <img
              src={product.thumbnailUrl}
              alt={product.productName}
              style={{ width: "auto", height: "100%", borderRadius: "5px", border: "1px white solid" }}
            />
            <div style={{ width: "1px", height: "100%", backgroundColor: "white", margin: "0 10px" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "5px 0",
              }}
            >
              <div style={{ flex: "4", margin: "0 5px" }}>{product.productName}</div>
              <div style={{ width: "1px", height: "100%", backgroundColor: "white", margin: "0 10px" }} />
              <div style={{ flex: "1", margin: "0 10px", textAlign: "right" }}>{products[index].quantity} 개</div>
              <div style={{ width: "1px", height: "100%", backgroundColor: "white", margin: "0 10px" }} />
              <div style={{ flex: "1", margin: "0 10px", textAlign: "right" }}>
                {(products[index].quantity * product.price).toLocaleString()} 원
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedProduct;
