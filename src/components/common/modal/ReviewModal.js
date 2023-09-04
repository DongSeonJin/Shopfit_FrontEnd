import React, { useState } from 'react';

import styles from '../../../styles/common/modal/ReviewModal.module.css';

const ReviewModal = ({ onClose, productId, userId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReviewSubmit = async () => {
        // 평점과 리뷰 내용을 검증합니다.
        if (rating <= 0 || rating > 5 || comment.trim() === '') {
            alert('평점과 리뷰 내용을 올바르게 입력해주세요.');
            return;
        }

        // 리뷰를 백엔드로 전송합니다.
        setIsSubmitting(true);
        try {
            const response = await fetch('/reviews/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    rating,
                    comment,
                }),
            });

            if (response.ok) {
                alert('리뷰가 성공적으로 작성되었습니다.');
                onClose();
            } else {
                alert('리뷰 작성 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('리뷰 작성 중 오류가 발생했습니다.', error);
            alert('리뷰 작성 중 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>리뷰 작성</h2>
                <label>평점: </label>
                <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
                <br />
                <label>리뷰 내용: </label>
                <textarea
                    rows="4"
                    cols="50"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <br />
                <button onClick={handleReviewSubmit} disabled={isSubmitting}>
                    {isSubmitting ? '작성 중...' : '작성 완료'}
                </button>
                <button onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default ReviewModal;
