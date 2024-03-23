const initialState = {
    username: null,
}

const userReducer = (state = initialState, action) => {
    console.log(action, state, 'reducer')
    switch(action.type) {
        case 'FETCH_USER':
            return {...state};
        case 'FETCH_USER_SUCCESS':
            return {...state, username: action.payload.username};
        default:
            return state;
    }
};

export default userReducer;
