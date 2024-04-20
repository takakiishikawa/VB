import {FETCH_WORD_LIST, FETCH_WORD_LIST_SUCCESS} from "./types";

export const fetchWordList = (segmentId) => ({
    type: FETCH_WORD_LIST,
    payload: segmentId,
});

export const fetchWordListSuccess = (wordList) => ({
    type: FETCH_WORD_LIST_SUCCESS,
    payload: wordList,
});
