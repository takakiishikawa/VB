import axios from 'axios';

export const fetchArticleList = (segmentId, articleId) => {
    return axios.get(`/api/article/${segmentId}/${articleId}`);
}