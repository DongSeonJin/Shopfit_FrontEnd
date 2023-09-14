// api.js (또는 원하는 다른 파일명)
import axios from 'axios';
import { formatDate } from '../../components/common/DateUtils';

export const fetchData = async (url, searchTerm, setDataList, setSearchResults, setTotalPages) => {
  try {
    const response = await axios.get(url);
    const contentArray = response.data.content;
    const extractedData = contentArray.map((item) => ({
      productId: item.productId,
      createdAt: formatDate(item.createdAt),
      price: item.price,
      productName: item.productName,
      stockQuantity: item.stockQuantity,
      thumbnailUrl: item.thumbnailUrl,
      updatedAt: formatDate(item.updatedAt),
      categoryId: item.categoryId,
      totalPages: item.totalPages,
    }));
    if (searchTerm.trim() === "") {
      setDataList(extractedData);
    } else {
      setSearchResults(extractedData);
    }
    const calculatedTotalPages = response.data.totalPages;
    setTotalPages(calculatedTotalPages);
  } catch (error) {
    console.error("데이터를 불러오는 중 에러 발생:", error);
  }
};
