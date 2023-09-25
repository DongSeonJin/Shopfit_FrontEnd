import React from 'react';
import styles from '../../styles/common/spinner.module.css'

export const Spinner = () => {

    return(
        <div className={styles.container}>
        <div className={styles.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>

        </div>

    );


};

export default Spinner;