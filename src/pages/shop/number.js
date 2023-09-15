import React from 'react';

const number = () => {
    const initialOrderData = {
        address: "",
        phoneNumber: "",
      };

    return (        
        <div style={{display: 'flex', margin: '5px 0'}}>
            <label style={{ width: "80px" }}>연락처</label>
            <input style={{ width: "100px", textAlign: 'center' }} type="tel" name="phoneNumber1" value={phoneNumber1} onChange={handleInputChange} />
            <div style={{ width: '30px', textAlign: 'center', fontWeight: 'bold'}}>-</div>
            <input style={{ width: "100px", textAlign: 'center' }} type="tel" name="phoneNumber2" value={phoneNumber2} onChange={handleInputChange} />
            <div style={{ width: '30px', textAlign: 'center', fontWeight: 'bold'}}>-</div>
            <input style={{ width: "100px", textAlign: 'center' }} type="tel" name="phoneNumber3" value={phoneNumber3} onChange={handleInputChange} />
        </div>
    );
};

export default number;