/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import CreateFileUploadComponent from '../../components/shop/CreateFileUploadComponent';
import FilesUploadComponent from '../../components/shop/FilesUploadComponent';

// import styles from '../../styles/shop/ProductCreate.module.css';
import CloseIcon from '@mui/icons-material/Close';
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
    <div style={{maxWidth: '720px', width: '100%', textAlign: 'center', margin: '0 auto 200px'}}>
      <div style={{fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '50px'}}>
        상 품 등 록
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
          <div style={{textAlign: 'left', marginBottom: '10px'}}>썸네일:</div>
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
              <img src={imageUrl} alt={`Image ${index}`} style={{border: '1px solid white', borderRadius: '10px', width: '80%'}} />
            </div>
            <div style={{flex: '1', display: 'flex', alignItems: 'center'}}>
              <CloseIcon onClick={() => handleRemoveImage(index)} style={{width: '60px', height: '60px', cursor:'pointer'}} />
            </div>
          </div>
          ))}
        </div>

        <div style={{margin: '100px 0', textAlign: 'center'}}>
          <Button type="submit" variant="outlined" style={{color: 'white', width: '180px', height: '60px', fontWeight: 'bold', fontSize: '24px'}} onClick={handleSubmit} >등 록</Button>
        </div>

      </form>
    </div>
  );
};

export default ProductCreate;
