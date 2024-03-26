import axios from 'axios';

export const fetchSegments = (id) => {
    return axios.get(`./api/segment/${id}`);
}