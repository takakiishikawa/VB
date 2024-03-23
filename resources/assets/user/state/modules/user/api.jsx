import axios from 'axios';

export const fetchUser = () => {
    return axios.get('/user');
};
