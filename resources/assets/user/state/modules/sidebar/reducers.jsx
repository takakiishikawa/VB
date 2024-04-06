import { FETCH_SIDEBAR_STATE } from "./types";

const initialState = {
    major_segment: null,
}

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SIDEBAR_STATE:
            return {
                ...state,
                major_segment: action.payload,
            }
        default:
            return state;
    }
}

export default sidebarReducer;