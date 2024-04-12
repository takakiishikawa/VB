const initialState = {
    segments: [],
    user_segment_statuses: [],
    userArticleList: []
}

const segmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_SEGMENTS':
            return {
                ...state,
            }
        case 'FETCH_SEGMENTS_SUCCESS':
            return {
                ...state,
                segments: action.payload.segments,
            }
        case 'FETCH_USER_SEGMENT_STATUSES':
            return {
                ...state,
            }
        case 'FETCH_USER_SEGMENT_STATUSES_SUCCESS':
            return {
                ...state,
                user_segment_statuses: action.payload.user_segment_statuses,
            }
        case 'FETCH_READING_STATUS_SUCCESS':
            return {
                ...state,
                userArticleList: action.payload.userArticleList,
            }
        default:
            return state;
    }
}

export default segmentReducer;