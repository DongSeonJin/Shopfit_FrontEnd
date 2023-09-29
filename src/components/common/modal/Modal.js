import React from 'react';

import styles from '../../../styles/common/modal/Modal.module.css';
import { Button } from '@material-ui/core';


const Modal = ({ errorMessage, onClose }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p>{errorMessage}</p>
                <div style={{textAlign: 'right'}}>
                    <Button variant='outlined' color='secondary' onClick={onClose} style={{width: '80px', height: '40px'}}>닫기</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
