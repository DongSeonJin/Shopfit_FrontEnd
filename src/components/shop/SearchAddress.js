import React, { useState } from 'react';
import NaverMap, { Marker } from 'react-naver-maps';

const SearchAddress = ({ onAddressSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/map-geocode/v2/geocode?query=${searchQuery}`,
        {
          headers: {
            'Accept': 'application/json',
            'X-NCP-APIGW-API-KEY-ID': '',
            'X-NCP-APIGW-API-KEY': '',
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.addresses);
    } catch (error) {
      console.error('Error searching address:', error);
    }
  };

  const handleAddressSelect = (selectedAddress) => {
    onAddressSelected(selectedAddress);
    setSelectedMarker(selectedAddress);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="주소를 입력하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {searchResults.map((address) => (
          <li
            key={address.jibunAddress}
            onClick={() => handleAddressSelect(address)}
            style={{ cursor: 'pointer' }}
          >
            {address.jibunAddress}
          </li>
        ))}
      </ul>
      {/* <NaverMap
        naverRef={(ref) => {
          if (ref && selectedMarker) {
            const { x, y } = selectedMarker.point;
            ref.setCenter({ lat: y, lng: x });
          }
        }}
        center={{ lat: 37.5665, lng: 126.9780 }} // Default center
        zoom={12} // Default zoom level
        style={{ width: '100%', height: '400px', marginTop: '20px' }}
      >
        {selectedMarker && (
          <Marker
            position={{ lat: selectedMarker.point.y, lng: selectedMarker.point.x }}
          />
        )}
      </NaverMap> */}
    </div>
  );
};

export default SearchAddress;
