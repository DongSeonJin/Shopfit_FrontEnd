export const OrderStatusUpdater = async (orderId, status) => {
    try {
        const response = await fetch(`/orders/${orderId}/status/${status}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.error('주문 상태 업데이트 성공');
                        
        } else {
            console.error('주문 상태 업데이트 실패');
        }
        
    } catch (error) {
        console.error('주문 상태 업데이트 중 오류 발생', error);
    }
};