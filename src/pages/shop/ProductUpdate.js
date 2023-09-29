import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import CreateFileUploadComponent from "../../components/shop/CreateFileUploadComponent";
import FilesUploadComponent from "../../components/shop/FilesUploadComponent";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import styles from "../../styles/shop/pages/ProductUpdate.module.css";


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
        await axios.patch(`/shopping/${productNum}`, data, {
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
        const response = await axios.get(`/shopping/updatePage/${productNum}`);
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
      .delete(`/api/${thumbnailObjectKey}`)
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
      .delete(`/api/${imageUrlObjectKey}`)
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
    <div className={styles.productUpdateContainer}>
      <div className={styles.productUpdateHeader}>
        상 품 수 정
      </div>

      <form onSubmit={handleSubmit}>
        <div className={styles.divWithBorder}>

          <div className={styles.selectContainer}>
            <div className={styles.selectLabel}>상품 카테고리:</div>
            <div className={styles.selectDropdown}>
              <select value={ProductCategory} onChange={handleProductCategoryChange}>
                <option value="">카테고리를 선택하세요</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className={styles.inputContainer}>
              <div className={styles.inputLabel}>상품명:</div>
              <div className={styles.inputField}>
                <input type="text" value={productName} onChange={handleProductNameChange} />
              </div>
            </div>

            <div className={styles.inputContainer}>
              <div className={styles.inputLabel}>가격:</div>
              <div className={styles.inputField}>
                <input type="number" value={price} onChange={handlePriceChange} />
              </div>
            </div>
          </div>

          <div className={styles.inputContainer}>
            <div className={styles.inputLabel}>재고 수량:</div>
            <div className={styles.inputField}>
              <input type="number" value={stockQuantity} onChange={handleStockQuantityChange} />
            </div>
          </div>
        </div>

        <div className={styles.thumbnailContainer}>
          <div className={styles.thumbnailLabel}>썸네일:</div>
          <div>
            <CreateFileUploadComponent onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imageLabel}>상세 이미지 :</div>

          <div>
            <FilesUploadComponent onUploadSuccess={handleAddImage} />
          </div>

          {productImageUrls.map((imageUrl, index) => (
            <div key={index} className={styles.imageWrapper}>
              <div className={styles.image}>
                <img className={styles.imageDetail} src={imageUrl} alt="productImages" />
              </div>
              <div className={styles.closeIconContainer}>
                <CloseIcon
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteImages(imageUrl, productImageIds[index])}
                  className={styles.closeIcon}
                />
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.buttonContainer}>
          <Button
            variant="outlined"
            type="submit"
            className={styles.submitButton}
          >
            수정
          </Button>

          <Link to="/shopping/1">
            <Button
              variant="outlined"
              color="error"
              className={styles.cancelButton}
            >
              취소
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
