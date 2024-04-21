import axios from 'axios';

export const fetchWordList = (segmentId) => {
    return axios.get(`/api/word/${segmentId}`);
}

export const fetchAnswerList = (segmentId, answerList) => {
    console.log(answerList, 'api');
    return axios.post(`/api/word/answer/${segmentId}`, {answerList: answerList});
}
