import { FETCH_WORD_LIST_SUCCESS, INCREMENT_WORD_COUNT, ADD_ANSWER_LIST } from "./types";

const initialState = {
    wordList: [],
    wordCount: 0,
    answerList: []
}

const wordReducer = ((state = initialState, action) => {
    switch (action.type) {
        case FETCH_WORD_LIST_SUCCESS:
            return {
                ...state,
                wordList: action.payload.wordList,
            }
        case INCREMENT_WORD_COUNT:
            return {
                ...state,
                wordCount: state.wordCount + 1,
            }
        case ADD_ANSWER_LIST:
            console.log(action.payload, 'reducer');
            return {
                ...state,
                answerList: [...state.answerList, action.payload]
            }
        default:
            return state;
    }
});

export default wordReducer;