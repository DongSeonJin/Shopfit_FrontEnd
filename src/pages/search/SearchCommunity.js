import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SearchResultPost from '../../components/community/SearchResultPost';
import Page from '../../components/common/Page';

const SearchCommunity = () => {
    const { text } = useParams();
    const [communityPage, setCommunityPage] = useState(1);
    const [communityTotalPages, setCommunityTotalPages] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfSearch, setNumberOfSearch] = useState(0);


    useEffect(() => {
        fetchData(`/post/search/${text}/${communityPage}`);
    // eslint-disable-next-line
    }, [communityPage, text]);

    const fetchData = (url) => {
        axios.get(url)
            .then((response) => {
            const contentArray = response.data.content;
            const extractedData = contentArray.map((item) => ({
                postId: item.postId,
                nickname: item.nickname,
                title: item.title,
                viewCount: item.viewCount,
                imageUrl1: item.imageUrl1,
                likeCnt: item.likeCnt,
                replyCnt: item.replyCnt,
            }));

            if (text.trim() === "") {
                setDataList(extractedData);
            } else {
                setSearchResults(extractedData);
            }

            setCommunityTotalPages(response.data.totalPages);
            setNumberOfSearch(response.data.totalElements);
            })
            .catch((error) => {
            console.error('데이터를 불러오는 중 에러 발생:', error);
        });
    };

    const handlePageChange = (newPage) => {
        setCommunityPage(newPage);
    };

    return (
        <div>
            <div>
                community "{text}" 검색결과 - {numberOfSearch} 개
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', margin: '0 auto' }}>
                {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
                    <div key={data.newsId} style={{ flexBasis: '20%', padding: '10px' }}>
                        <SearchResultPost data={data} />
                    </div>
                ))}
            </div>
            <div>
                <Page currentPage={communityPage} onPageChange={handlePageChange} totalPages={communityTotalPages} />
            </div>

        </div>
    );
};

export default SearchCommunity;