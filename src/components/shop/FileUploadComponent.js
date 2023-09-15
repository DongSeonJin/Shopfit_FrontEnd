import React, { useState } from "react";
import axios from "axios";

function FileUploadComponent({ onUploadSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // 파일 선택 시 POST 요청
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("/api/imageOptimizer/1", formData)
        .then((response) => {
          // console.log("파일 업로드 성공", response.data);
          onUploadSuccess(response.data); // response.data에 최적화한 이미지 URL이 들어옴
          setPreviewImage(response.data); // 이미지 URL을 미리보기 이미지로 설정
        })
        .catch((error) => {
          console.error("파일 업로드 실패", error);
        });
      // 미리보기 이미지 설정 (원본 크기)
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div style={{margin: '2% 0'}}>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div style={{margin: '2% 0'}}>
        {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: '40%'}} />}
      </div>
    </div>
  );
}

export default FileUploadComponent;
