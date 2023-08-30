import React, { useState } from "react";
import axios from "axios";

function FileUploadComponent({ onUploadSuccess }) {
  const [previewImage, setPreviewImage] = useState(null);

  const MAX_WIDTH = 150; // 원하는 최대 너비 설정

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const image = new Image();
        image.src = e.target.result;

        image.onload = () => {
          const canvas = document.createElement("canvas");
          let width = image.width;
          let height = image.height;

          if (width > MAX_WIDTH) {
            height = (MAX_WIDTH / width) * height;
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, width, height);

          const resizedDataURL = canvas.toDataURL(file.type);

          // 미리보기 이미지 설정
          setPreviewImage(resizedDataURL);

          // 파일 선택 시 POST 요청
          const formData = new FormData();
          formData.append("file", file);

          axios
            .post("/api/upload", formData)
            .then((response) => {
              // console.log("파일 업로드 성공", response.data);
              onUploadSuccess(response.data);
            })
            .catch((error) => {
              console.error("파일 업로드 실패", error);
            });
        };
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {previewImage && <img src={previewImage} alt="Preview" />}
    </div>
  );
}

export default FileUploadComponent;
