import React, { useState } from "react";
import axios from "axios";

function FilesUploadComponent({ onUploadSuccess }) {
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
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
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default FilesUploadComponent;
