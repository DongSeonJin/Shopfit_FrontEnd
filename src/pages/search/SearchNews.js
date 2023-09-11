import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import SearchResultArticle from '../../components/news/SearchResultArticle';
import Page from '../../components/common/Page';
import { formatDate } from '../../components/common/DateUtils';

const SearchNews = () => {
    const { text } = useParams();
    const [newsPage, setNewsPage] = useState(1);
    const [newsTotalPages, setNewsTotalPages] = useState(1);
    const [dataList, setDataList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [numberOfSearch, setNumberOfSearch] = useState(0);
    

    useEffect(() => {
        fetchData(`/news/search/${text}/${newsPage}`);
    // eslint-disable-next-line
    }, [newsPage, text]);

    const fetchData = (url) => {
        axios.get(url)
            .then((response) => {
            const contentArray = response.data.content;
            const extractedData = contentArray.map((item) => ({
                newsId: item.newsId,
                title: item.title,
                content: item.content,
                imageUrl: item.imageUrl,
                newsUrl: item.newsUrl,
                createdAt: formatDate(item.createdAt),
                totalPages: item.totalPages,
        }));

        if (text.trim() === "") {
            setDataList(extractedData);
        } else {
            setSearchResults(extractedData);
        }

        setNewsTotalPages(response.data.totalPages);
        setNumberOfSearch(response.data.totalElements)
        })
        .catch((error) => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
        });
    };

    const handlePageChange = (newPage) => {
        setNewsPage(newPage);
    };

    return (
        <div style={{margin: '50px 0'}}>
            <div>
                news "{text}" 검색결과 - {numberOfSearch} 개
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', margin: '0 auto' }}>
                {(searchResults.length > 0 ? searchResults : dataList).map((data) => (
                    <div key={data.newsId} style={{ flexBasis: '20%', padding: '10px' }}>
                        <SearchResultArticle data={data} />
                    </div>
                ))}
            </div>
            <div>
                <Page currentPage={newsPage} onPageChange={handlePageChange} totalPages={newsTotalPages} />
            </div>
        </div>
    );
};

export default SearchNews;