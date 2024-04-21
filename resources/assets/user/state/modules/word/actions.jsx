import {FETCH_WORD_LIST, FETCH_WORD_LIST_SUCCESS, INCREMENT_WORD_COUNT, ADD_ANSWER_LIST} from "./types";

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