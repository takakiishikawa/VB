import axios from 'axios';

export const fetchWordList = (segmentId) => {
    console.log(segmentId, 'api');
    return axios.get(`/api/word/${segmentId}`);
}