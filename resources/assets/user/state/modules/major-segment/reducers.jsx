const initialState = {
    major_segments: [],
    user_major_segment_statuses: [],
}

const majorSegmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_MAJOR_SEGMENT':
            return {
                ...state,
            }
        case 'FETCH_MAJOR_SEGMENT_SUCCESS':
            console.log(action, 'action')
            return {
                ...state,
                major_segments: action.payload.major_segments,
            }
        case 'FETCH_USER_MAJOR_SEGMENT_STATUSES':
            return {
                ...state,
            }
        case 'FETCH_USER_MAJOR_SEGMENT_STATUSES_SUCCESS':
            console.log(action, 'action')
            console.log(action.payload.user_major_segment_statuses, 'user_major_segment_statuses')
            return {
                ...state,
                user_major_segment_statuses: action.payload.user_major_segment_statuses,
            }
        default:
            return state;
    }
};

export default majorSegmentReducer;