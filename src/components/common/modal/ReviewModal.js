import React, { useState } from 'react';

import { Button } from '@material-ui/core';

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
                <div style={{fontSize: '20px', fontWeight: 'bold'}}>리뷰 작성</div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', padding: '0 5px'}}>
                    <div>리뷰 내용: </div>
                    <div>
                        <label>평점: </label>
                        <input
                            type="number"
                            min="0"
                            max="5"
                            value={rating}
                            style={{border: 'none', textAlign: 'right'}}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                    </div>
                </div>
                <textarea
                    rows="10"
                    cols="50"
                    value={comment}
                    style={{width: '100%', padding: '10px'}}
                    onChange={(e) => setComment(e.target.value)}
                />
                
                <div style={{display:'flex'}}>
                    <div style={{flex: '1', textAlign: 'right', padding: '0 10px'}}>
                        <Button variant='outlined' color='primary' style={{width: '120px'}} onClick={handleReviewSubmit} disabled={isSubmitting}>
                            {isSubmitting ? '작성 중...' : '작성 완료'}
                        </Button>
                    </div>
                    <div style={{flex: '1', textAlign: 'left', padding: '0 10px'}}>
                        <Button variant='outlined' color='secondary' style={{width: '120px'}} onClick={onClose}>취소</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
