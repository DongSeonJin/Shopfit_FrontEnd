import React from 'react';
import ReactDOM from 'react-dom';

const SearchAddress = ({ onSelect }) => {
  const handleAddressSearch = () => {
    const newWindow = window.open(
      '',
      '_blank',
      'width=600,height=800,location=0,menubar=0,toolbar=0'
    );

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
      <button onClick={handleAddressSearch} style={{marginLeft: '10px'}}>주소찾기</button>
    </div>
  );
};

export default SearchAddress;
