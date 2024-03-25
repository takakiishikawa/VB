import {FETCH_MAJOR_SEGMENT, FETCH_MAJOR_SEGMENT_SUCCESS} from './types';
import {FETCH_USER_MAJOR_SEGMENT_STATUSES, FETCH_USER_MAJOR_SEGMENT_STATUSES_SUCCESS} from './types';

export const fetchMajorSegment = () => ({
    type: FETCH_MAJOR_SEGMENT,
});

export const fetchMajorSegmentSuccess = (major_segments) => ({
    type: FETCH_MAJOR_SEGMENT_SUCCESS,
    payload: major_segments,
});

export const fetchUserMajorSegmentStatuses = () => ({
    type: FETCH_USER_MAJOR_SEGMENT_STATUSES,
});

export const fetchUserMajorSegmentStatusesSuccess = (user_major_segments_statuses) => ({
    type: FETCH_USER_MAJOR_SEGMENT_STATUSES_SUCCESS,
    payload: user_major_segments_statuses,
});