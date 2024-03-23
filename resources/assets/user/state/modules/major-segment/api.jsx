import axios from 'axios';

export const fetchMajorSegment = () => {
    return axios.get('/api/major-segment');
}