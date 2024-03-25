import axios from 'axios';

export const fetchMajorSegment = () => {
    return axios.get('/api/major-segment');
}

export const fetchUserMajorSegmentStatuses = () => {
    return axios.get('/api/major-segment/statuses');
}
