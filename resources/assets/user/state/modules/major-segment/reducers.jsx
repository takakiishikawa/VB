const initialState = {
    major_segments: [],
}

const majorSegmentReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_MAJOR_SEGMENT':
            return {
                ...state,
            }
        case 'FETCH_MAJOR_SEGMENT_SUCCESS':
            console.log(action.payload.major_segments, 'action');
            return {
                ...state,
                major_segments: action.payload.major_segments,
            }
        default:
            return state;
    }
};

export default majorSegmentReducer;