import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import CreateFileUploadComponent from "../../components/shop/CreateFileUploadComponent";
import FilesUploadComponent from "../../components/shop/FilesUploadComponent";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

// import styles from "../../styles/shop/ProductUpdate.module.css";


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
    <div style={{maxWidth: '720px', width: '100%', textAlign: 'center', margin: '0 auto 200px'}}>

      <div style={{fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px'}}>
        상 품 수 정
      </div>


      <form onSubmit={handleSubmit}>
        <div style={{borderTop: '1px white solid', borderBottom: '1px white solid', padding: '20px 10px'}}>

          <div style={{display: 'flex', margin: '10px 0'}}>
            <div style={{flex: '1', textAlign: 'left', height: '30px'}}>상품 카테고리:</div>
            <div style={{flex: '1'}}>
              <select value={ProductCategory} onChange={handleProductCategoryChange} style={{width: '100%', height: '35px', padding: '0 10px'}}>
                <option value="">카테고리를 선택하세요</option>
                {productCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{display: 'flex', marginBottom: '10px'}}>
            <div style={{flex: '1', textAlign: 'left', height: '30px'}}>상품명: </div>
            <div style={{flex: '1'}}>
              <input type="text" value={productName} onChange={handleProductNameChange} style={{width: '100%', height: '35px', padding: '0 10px'}} />
            </div>
          </div>

          <div style={{display: 'flex', marginBottom: '10px'}}>
            <div style={{flex: '1', textAlign: 'left', height: '30px'}}>가격:</div>
            <div style={{flex: '1'}}>
              <input type="number" value={price} onChange={handlePriceChange} style={{width: '100%', height: '35px', padding: '0 10px'}} />
            </div>
          </div>


          <div style={{display: 'flex', marginBottom: '10px'}}>
            <div style={{flex: '1', textAlign: 'left', height: '30px'}}>재고 수량:</div>
            <div style={{flex: '1'}}>
              <input type="number" value={stockQuantity} onChange={handleStockQuantityChange} style={{width: '100%', height: '35px', padding: '0 10px'}} />

            </div>
          </div>
        </div>

        <div style={{margin: '30px 0', borderBottom: '1px solid white', padding: '0 10px'}}>
          <div style={{textAlign: 'left', marginBottom: '10px'}}>썸네일: </div>

          <div>
            <CreateFileUploadComponent onUploadSuccess={handleUploadSuccess} />
          </div>
        </div>

        <div style={{margin: '30px 0', borderBottom: '1px solid white', padding: '0 10px 30px'}}>
          <div style={{textAlign: 'left', marginBottom: '10px'}}>상세 이미지 :</div>

          <div>
            <FilesUploadComponent onUploadSuccess={handleAddImage} />
          </div>

          {productImageUrls.map((imageUrl, index) => (
          <div key={index} style={{display: 'flex', margin: '20px 0'}}>
            <div style={{flex: '4'}}>
              <img src={imageUrl} alt="productImages" style={{border: '1px solid white', borderRadius: '10px', width: '80%'}} />
            </div>
            <div style={{flex: '1', display: 'flex', alignItems: 'center'}}>
              <CloseIcon
                variant="outlined"
                color="error"
                onClick={() => handleDeleteImages(imageUrl, productImageIds[index])}
                style={{width: '60px', height: '60px', cursor:'pointer', color: 'white'}}
              />
            </div>
          </div>
          ))}
        </div>

        <div style={{margin: '100px 0', textAlign: 'center'}}>
          <Button
            variant="outlined"
            type="submit"
            style={{color: 'white', width: '180px', height: '60px', fontWeight: 'bold', fontSize: '24px', marginRight: '10px'}}
          >
            수정
          </Button>

          <Link to={"/shopping/1"}>
            <Button
              variant="outlined"
              color="error"
              style={{color: 'white', width: '180px', height: '60px', fontWeight: 'bold', fontSize: '24px', marginLeft: '10px'}}
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
