import axios from 'axios';

export const fetchWordList = (segmentId) => {
    return axios.get(`/api/word/${segmentId}`);
}