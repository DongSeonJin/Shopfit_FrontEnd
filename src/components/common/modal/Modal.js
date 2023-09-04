import React from 'react';

import styles from '../../../styles/common/modal/Modal.module.css';


const Modal = ({ errorMessage, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p>{errorMessage}</p>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default Modal;
