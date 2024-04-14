const initialState = {
    articleList: [],
}

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ARTICLE_LIST_SUCCESS':
            return {
                ...state,
                articleList: action.payload.articleList
            }
        default:
            return state;
    }
}
