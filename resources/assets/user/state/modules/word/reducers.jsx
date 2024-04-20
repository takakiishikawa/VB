import { FETCH_WORD_LIST_SUCCESS } from './types';

const initialState = {
    wordList: [],
}

const wordReducer = ((state = initialState, action) => {
    switch (action.type) {
        case FETCH_WORD_LIST_SUCCESS:
            return {
                ...state,
                wordList: action.payload.wordList,
            }

        default:
            return state;
    }
});

export default wordReducer;