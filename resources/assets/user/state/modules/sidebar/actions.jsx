import {FETCH_SIDEBAR_STATE} from './types';

export const fetchSidebarState = (major_segment) => ({
    type: FETCH_SIDEBAR_STATE,
    payload: major_segment
})