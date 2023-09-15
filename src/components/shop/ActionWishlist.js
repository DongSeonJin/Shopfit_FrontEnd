export const addToWishlist = async (userId, productNum) => {
    try {
        const response = await fetch(`/wishlist/add?userId=${userId}&productId=${productNum}`, {
            method: "POST",
        });

        if (response.ok) {
            console.log("상품이 위시리스트에 추가되었습니다.");
        } else {
            console.error("상품 추가 실패");
        }
    } catch (error) {
        console.error("오류 발생", error);
    }
};

export const removeFromWishlist = async (userId, productNum) => {
    try {
        const response = await fetch(`/wishlist/remove?userId=${userId}&productId=${productNum}`, {
            method: "DELETE",
        });

        if (response.ok) {
            console.log("상품이 위시리스트에서 삭제되었습니다.");
        } else {
            console.error("상품 삭제 실패");
        }
    } catch (error) {
            console.error("오류 발생", error);
    }
};