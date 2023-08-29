import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import FileUploadComponent from "./FileUploadComponent";

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

  const handleAddImage = () => {
    // 이미지 URL을 입력 받아 리스트에 추가
    const imageUrl = prompt("이미지 URL을 입력하세요:");
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
      productImageUrls: productImageUrls, // *** 사진 업로드 방식으로 처리하기
    };

    if (!productName || !thumbnailUrl || !price || !stockQuantity) {
      alert("모든 항목을 입력해주세요.");
    } else {
      try {
        // 백엔드 서버에 POST 요청 보내기
        await axios.post("/shopping/save", data, {
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
    <div>
      <h2>상품 등록 페이지</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            상품 카테고리:
            <select
              value={ProductCategory}
              onChange={handleProductCategoryChange}
            >
              <option value="">카테고리를 선택하세요</option>
              {productCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label>
            상품명:
            <input
              type="text"
              value={productName}
              onChange={handleProductNameChange}
            />
          </label>
        </div>

        <div>
          <label>
            썸네일:
            <FileUploadComponent onUploadSuccess={handleUploadSuccess} />
          </label>
        </div>

        <div>
          <label>
            가격:
            <input type="number" value={price} onChange={handlePriceChange} />
          </label>
        </div>
        <div>
          <label>
            재고 수량:
            <input
              type="number"
              value={stockQuantity}
              onChange={handleStockQuantityChange}
            />
          </label>
        </div>

        <div>
          <button type="button" onClick={handleAddImage}>
            이미지 추가
          </button>
          <ul>
            {productImageUrls.map((imageUrl, index) => (
              <li key={index}>
                {imageUrl}
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <button type="submit">등록</button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
