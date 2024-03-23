import {FETCH_MAJOR_SEGMENT, FETCH_MAJOR_SEGMENT_SUCCESS} from './types';

export const fetchMajorSegment = () => ({
    type: FETCH_MAJOR_SEGMENT,
});

export const fetchMajorSegmentSuccess = (major_segments) => ({
    type: FETCH_MAJOR_SEGMENT_SUCCESS,
    payload: major_segments,
});