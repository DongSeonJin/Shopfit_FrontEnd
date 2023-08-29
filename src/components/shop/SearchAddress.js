import React, { useState } from 'react';

const SearchAddress = ({ onAddressSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = async () => {
    try {
      const naver = window.naver; // Naver Maps JavaScript API 객체
      const service = new naver.maps.Service(); // Naver Maps 서비스 객체 생성

      service.geocode(
        {
          query: searchQuery,
        },
        (status, response) => {
          if (status === naver.maps.Service.Status.OK) {
            setSearchResults(response.v3.addresses || []);
          } else {
            console.error('Error searching address:', status);
          }
        }
      );
    } catch (error) {
      console.error('Error searching address:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowSearch(true)}>주소 검색</button>
      {showSearch && (
        <div>
          <input
            type="text"
            placeholder="주소 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
          <div>
            {searchResults.map((result) => (
              <div
                key={result.name}
                onClick={() => {
                  onAddressSelected(result);
                  setShowSearch(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                {result.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAddress;
