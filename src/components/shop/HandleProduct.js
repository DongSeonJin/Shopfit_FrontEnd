import axios from "axios";

export const handleDeleteProduct = (productId, thumbnailUrl, productImageUrls, navigate) => {

    // thumbnailUrl과 productImageUrls를 사용해서 S3 객체 키들을 생성
    const thumbnailObjectKey = thumbnailUrl.split("/").pop(); // 마지막 부분을 추출하여 S3 객체 키로 사용
    const imageObjectKeys = productImageUrls.map((url) => url.split("/").pop());
    // 모든 이미지 URL의 마지막 부분을 추출하여 S3 객체 키들로 사용

    axios
        .delete(`/shopping/${productId}`)
        .then(() => {
            // DELETE 요청 성공 처리
            console.log("상품 삭제 성공");

            // 여기서 S3 thumbnailUrl 삭제 요청 보내기
            axios
                .delete(`/api/${thumbnailObjectKey}`)
                .then(() => {
                    console.log("S3 썸네일 삭제 성공");
                })
                .catch((error) => {
                    console.log("S3 썸네일 객체 삭제 실패".error);
                });

            // productImageUrls 삭제 요청
            imageObjectKeys.forEach((imageObjectKey) => {
                axios
                    .delete(`/api/${imageObjectKey}`)
                    .then(() => {
                        console.log("S3 상품 상세 이미지 삭제 성공");
                    })
                    .catch((error) => {
                        console.log("S3 상품 상세 이미지 삭제 실패", error);
            });});

            // 리스트로 돌아가기
            navigate("/shopping");
        })
        .catch((error) => {
            // DELETE 요청 실패 처리
            console.log("상품 삭제 실패", error);
        });
};

export const handleProductUpdate = (productNum, navigate) => {
    // "상품 수정" 버튼을 클릭할 때 ProductUpdate 페이지로 이동하면서 productId를 전달
    navigate(`/shopping/update/${productNum}`);
};