import React from 'react';
import ReactDOM from 'react-dom';

export const SearchAddress = ({ onSelect }) => {
  const handleAddressSearch = () => {
    const windowWidth = 600; // 창의 너비
    const windowHeight = 420; // 창의 높이
    
    // 화면 중앙에 위치하도록 x 및 y 좌표를 계산
    const x = window.screenX + window.innerWidth / 2 - windowWidth / 2;
    const y = window.screenY + window.innerHeight / 2 - windowHeight / 2;
    
    // 새 창 열기
    const newWindow = window.open('', '_blank', `width=${windowWidth},height=${windowHeight},left=${x},top=${y},location=0,menubar=0,toolbar=0`);

    newWindow.document.write('<div id="root"></div>');
    newWindow.document.title = '주소 검색';
    const DaumPostcode = require('react-daum-postcode').default;

    const handleAddressSelected = (data) => {
      const fullAddress = data.address;
      const extraAddress = data.addressType === 'R' ? '' : data.bname;
      const selectedAddress = `${fullAddress} ${extraAddress}`;

      onSelect(selectedAddress);
      newWindow.close();
    };

    const daumPostcodeComponent = React.createElement(DaumPostcode, {
      onComplete: handleAddressSelected,
    });

    ReactDOM.render(daumPostcodeComponent, newWindow.document.getElementById('root'));
  };

  return (
    <div>
      <button onClick={handleAddressSearch} style={{marginLeft: '10px', width: '110px'}}>주소찾기</button>
    </div>
  );
};

export default SearchAddress;
