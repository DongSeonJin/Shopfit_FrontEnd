import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploadComponent from "./FileUploadComponent";
import FilesUploadComponent from "./FilesUploadComponent";

import styles from "../../styles/shop/ProductCreate.module.css";
import { Button } from "@mui/material";

const ProductCreate = () => {
  const [ProductCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [productImageUrls, setProductImageUrls] = useState([]);

  const productCategories = [
    { id: 1, name: "닭가슴살" },
    { id: 2, name: "음료/보충제" },
    { id: 3, name: "운동용품" },
  ];

  const navigate = useNavigate();

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleUploadSuccess = (url) => {
    // 업로드된 이미지 URL을 상태로 설정
    setThumbnailUrl(url);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleStockQuantityChange = (e) => {
    setStockQuantity(e.target.value);
  };

  const handleAddImage = (url) => {
    // 이미지 URL을 입력 받아 리스트에 추가
    const imageUrl = url;
    if (imageUrl) {
      setProductImageUrls([...productImageUrls, imageUrl]);
    }
  };

  const handleRemoveImage = (index) => {
    // 선택한 인덱스의 이미지를 리스트에서 제거
    const newImageUrls = productImageUrls.filter((_, i) => i !== index);
    setProductImageUrls(newImageUrls);
  };

  // 비동기적으로 폼 제출 처리하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryId: ProductCategory,
      productName: productName,
      thumbnailUrl: thumbnailUrl,
      price: price,
      stockQuantity: stockQuantity,
      productImageUrls: productImageUrls,
    };

    if (!productName || !thumbnailUrl || !price || !stockQuantity) {
      alert("모든 항목을 입력해주세요.");
    } else {
      try {
        // 백엔드 서버에 POST 요청 보내기
        await axios.post("/shopping", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("상품이 등록되었습니다.");

        // 입력 필드 초기화
        setProductName("");
        setThumbnailUrl("");
        setPrice("");
        setStockQuantity("");
        setProductImageUrls([]);

        // 전체조회 페이지로 이동
        navigate("/shopping");
      } catch (error) {
        console.error("상품 등록 실패");
        alert("상품 등록에 실패했습니다.");
      }
    }
  };

  return (
    <div style={{ margin: "0 20%" }}>
      <h2>상품 등록</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginTop: "50px" }}>
          <label className={styles.label}>상품 카테고리:</label>
          <select value={ProductCategory} onChange={handleProductCategoryChange}>
            <option value="">카테고리를 선택하세요</option>
            {productCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={styles.label}>상품명: </label>
          <input type="text" value={productName} onChange={handleProductNameChange} />
        </div>

        <div>
          <label className={styles.label}>썸네일:</label>
          <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
        </div>

        <div>
          <label className={styles.label}>가격:</label>
          <input type="number" value={price} onChange={handlePriceChange} />
        </div>
        <div>
          <label className={styles.label}>재고 수량:</label>
          <input type="number" value={stockQuantity} onChange={handleStockQuantityChange} />
        </div>

        <div>
          <label className={styles.label}>상세 이미지 :</label>
          <FilesUploadComponent onUploadSuccess={handleAddImage} />
          <ul>
            {productImageUrls.map((imageUrl, index) => (
              <li key={index}>
                <img src={imageUrl} alt={`Image ${index}`} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Button variant="outlined" type="submit">
            등록
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
