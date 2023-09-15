import axios from 'axios';

export const addCart = (userId, productNum, count) => {
    axios
        .get("/cart/checkCart", {
            params: {
                userId: userId,
                productId: productNum,
            },
        })
        .then((response) => {
            console.log(response.data);
        if (response.data === false) {

        axios
        .post("/cart", {
            userId: userId,
            productId: productNum,
            quantity: count,
        })
        .then(() => {
            alert("장바구니에 담았습니다");
        })
        .catch((error) => {
            console.error("Error adding to cart:", error);
        });
        } else {
            alert("이미 장바구니에 담긴 상품입니다");
        }
        })
        .catch((error) => {
            console.error("Error checking cart:", error);
    });
};