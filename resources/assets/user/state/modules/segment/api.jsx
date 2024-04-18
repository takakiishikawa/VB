import axios from 'axios';

export const fetchSegments = (id) => {
    return axios.get(`./api/segment/${id}`);
}

export const fetchUserSegmentStatuses = (id) => {
    return axios.get(`./api/segment/statuses/${id}`);
}

export const fetchGenerateArticle = (segmentId) => {
    return axios.post(`./api/segment/generate/${segmentId}`);
}

export const fetchReadingStatus = (segmentId) => {
    return axios.get(`./api/segment/reading-status/${segmentId}`);
}

export const fetchSegmentCycle = (segmentId) => {
    return axios.get(`./api/segment/cycle/${segmentId}`);
}

export const updateReadingStatus = (segmentId) => {
    return axios.get(`./api/segment/update-reading-status/${segmentId}`);
}