const initialState = {
    username: null,
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FETCH_USER':
            return {...state};
        case 'FETCH_USER_SUCCESS':
            return {...state, user: action.payload};
        default:
            return state;
    }
};

export default userReducer;
