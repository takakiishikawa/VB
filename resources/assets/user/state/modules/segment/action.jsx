import {FETCH_SEGMENTS} from './types';
import {FETCH_SEGMENTS_SUCCESS} from './types';

export const fetchSegments = (id) => ({
    type: FETCH_SEGMENTS,
    payload: id,
});

export const fetchSegmentsSuccess = (segments) => ({
    type: FETCH_SEGMENTS_SUCCESS,
    payload: segments,
});
