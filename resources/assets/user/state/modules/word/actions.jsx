import {
    FETCH_WORD_LIST,
    FETCH_WORD_LIST_SUCCESS,
    INCREMENT_WORD_COUNT,
    ADD_ANSWER_LIST,
    FETCH_ANSWER_LIST,
    RESET_ANSWER_LIST,
    RESET_WORD_COUNT
} from "./types";


export const fetchWordList = (segmentId) => ({
    type: FETCH_WORD_LIST,
    payload: segmentId,
});

export const fetchWordListSuccess = (wordList) => ({
    type: FETCH_WORD_LIST_SUCCESS,
    payload: wordList,
});

export const incrementWordCount = () => ({
    type: INCREMENT_WORD_COUNT, 
});

export const addAnswerList = (answerList) => ({
    type: ADD_ANSWER_LIST,
    payload: answerList,
});

export const fetchAnswerList = (segmentId) => ({
    type: FETCH_ANSWER_LIST,
    payload: segmentId,
});

export const resetAnswerList = () => ({
    type: RESET_ANSWER_LIST,
});

export const resetWordCount = () => ({
    type: RESET_WORD_COUNT,
});