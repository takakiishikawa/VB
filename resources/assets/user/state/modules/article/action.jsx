import {FETCH_ARTICLE_LIST} from './types';
import {FETCH_ARTICLE_LIST_SUCCESS} from './types';

export const fetchArticleList = () => ({
    type: FETCH_ARTICLE_LIST,
});

export const fetchArticleListSuccess = (articleList) => ({
    type: FETCH_ARTICLE_LIST_SUCCESS,
    payload: articleList
});

