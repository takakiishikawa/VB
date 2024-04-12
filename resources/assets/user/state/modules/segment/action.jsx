import {FETCH_SEGMENTS} from './types';
import {FETCH_SEGMENTS_SUCCESS} from './types';
import {FETCH_USER_SEGMENT_STATUSES} from './types';
import {FETCH_USER_SEGMENT_STATUSES_SUCCESS} from './types';
import {FETCH_GENERATE_ARTICLE} from './types';
import {FETCH_READING_STATUS} from './types';
import {FETCH_READING_STATUS_SUCCESS} from './types';
import {FETCH_SEGMENT_CYCLE} from './types';
import {FETCH_SEGMENT_CYCLE_SUCCESS} from './types';

export const fetchSegments = (id) => ({
    type: FETCH_SEGMENTS,
    payload: id,
});

export const fetchSegmentsSuccess = (segments) => ({
    type: FETCH_SEGMENTS_SUCCESS,
    payload: segments,
});

export const fetchUserSegmentStatuses = (id) => ({
    type: FETCH_USER_SEGMENT_STATUSES,
    payload: id,
});

export const fetchUserSegmentStatusesSuccess = (user_segment_statuses) => ({
    type: FETCH_USER_SEGMENT_STATUSES_SUCCESS,
    payload: user_segment_statuses,
});

export const fetchGenerateArticle = (segmentId) => ({
    type: FETCH_GENERATE_ARTICLE,
    payload: segmentId,
});

export const fetchReadingStatus = (segmentId) => ({
    type: FETCH_READING_STATUS,
    payload: {segmentId},
});

export const fetchReadingStatusSuccess = (userArticleList) => ({
    type: FETCH_READING_STATUS_SUCCESS,
    payload: userArticleList,
});

export const fetchSegmentCycle = (segmentId) => ({
    type: FETCH_SEGMENT_CYCLE,
    payload: segmentId,
});

export const fetchSegmentCycleSuccess = (segmentCycle) => ({
    type: FETCH_SEGMENT_CYCLE_SUCCESS,
    payload: segmentCycle,
});