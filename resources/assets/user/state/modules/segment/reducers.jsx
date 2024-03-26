const initialState = {
    segments: [],
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
        default:
            return state;
    }
}

export default segmentReducer;