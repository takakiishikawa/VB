import {FETCH_USER, FETCH_USER_SUCCESS} from './types';

export const fetchUser = () => ({type: FETCH_USER});
export const fetchUserSuccess = (user) => ({type: FETCH_USER_SUCCESS, payload: user});
