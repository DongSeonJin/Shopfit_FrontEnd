import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import FileUploadComponent from "./FileUploadComponent";
import FilesUploadComponent from "./FilesUploadComponent";
import { Button } from "@mui/material";

const ProductUpdate = () => {
  const [ProductCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [productImageUrls, setProductImageUrls] = useState([]);
  const [productImageIds, setProductImageIds] = useState([]);

  const productCategories = [
    { id: 1, name: "닭가슴살" },
    { id: 2, name: "음료/보충제" },
    { id: 3, name: "운동용품" },
  ];

  const navigate = useNavigate();
  const { productNum } = useParams();

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
    // 이미지 URL을 입력 받아 리스트에 추가 (중복 체크)
    const imageUrl = url;

    if (imageUrl && !productImageUrls.includes(imageUrl)) {
      setProductImageUrls([...productImageUrls, imageUrl]);
    }
  };

  // 비동기적으로 폼 제출 처리하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryId: ProductCategory,
      productName: productName,
      price: price,
      stockQuantity: stockQuantity,
      thumbnailUrl: thumbnailUrl,
      productImageUrls: productImageUrls,
    };

    if (!productName || !thumbnailUrl || !price || !stockQuantity) {
      alert("모든 항목을 입력해주세요.");
    } else {
      try {
        // 백엔드 서버에 PATCH 요청 보내기
        await axios.patch(`/shopping/update/${productNum}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        alert("수정이 완료되었습니다.");

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

  // 이펙트 훅을 사용하여 수정 버튼을 눌렀을 때 데이터 로드 및 초기화
  useEffect(() => {
    // 기존 데이터 로딩 및 상태 설정 로직
    const fetchData = async () => {
      try {
        const response = await axios.get(`/shopping/update/${productNum}`);
        const productData = response.data;

        setProductCategory(productData.categoryId);
        setProductName(productData.productName);
        setThumbnailUrl(productData.thumbnailUrl);
        setPrice(productData.price);
        setStockQuantity(productData.stockQuantity);
        setProductImageUrls(productData.productImageUrls);
        setProductImageIds(productData.productImageIds);
      } catch (error) {
        console.error("상품 정보 로딩 실패");
        // 실패 처리 로직 추가
      }
    };
    fetchData();
  }, []);

  const handleDeleteThumbnail = (thumbnailUrl) => {
    const thumbnailObjectKey = thumbnailUrl.split("/").pop(); // 마지막 부분을 추출하여 S3 객체 키로 사용

    axios
      .delete(`/api/delete/${thumbnailObjectKey}`)
      .then(() => {
        console.log("S3 썸네일 삭제 성공");
        setThumbnailUrl("");
      })
      .catch((error) => {
        console.log("S3 썸네일 객체 삭제 실패", error);
      });
  };

  const handleDeleteImages = (imageUrl, productImageId) => {
    const imageUrlObjectKey = imageUrl.split("/").pop();

    axios
      .delete(`/api/delete/${imageUrlObjectKey}`)
      .then(() => {
        console.log("S3 상세이미지 삭제 성공");

        // 이미지 URL을 제거한 새로운 배열을 생성
        const updatedProductImageUrls = productImageUrls.filter((url) => url !== imageUrl);

        // 상태 업데이트
        setProductImageUrls(updatedProductImageUrls);
      })
      .catch((error) => {
        console.log("S3 상세이미지 삭제 실패", error);
      });

    // db에서 이미지 제거
    axios.delete(`/shopping/img/${productImageId}`);
  };

  return (
    <div>
      <h2>상품 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            상품 카테고리:
            <select value={ProductCategory} onChange={handleProductCategoryChange}>
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
            <input type="text" value={productName} onChange={handleProductNameChange} />
          </label>
        </div>

        <div>
          <label>
            썸네일: <img src={thumbnailUrl} alt="" style={{ maxWidth: "150px", maxHeight: "150px" }}></img>
            <Button variant="outlined" color="error" onClick={() => handleDeleteThumbnail(thumbnailUrl)}>
              삭제
            </Button>
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
            <input type="number" value={stockQuantity} onChange={handleStockQuantityChange} />
          </label>
        </div>

        <div>
          상세 이미지 :
          <FilesUploadComponent onUploadSuccess={handleAddImage} />
          <ul>
            {productImageUrls.map((imageUrl, index) => (
              <li key={index}>
                <img src={imageUrl} alt="" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteImages(imageUrl, productImageIds[index])}
                >
                  삭제
                </Button>
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

export default ProductUpdate;
