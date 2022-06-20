const initialState = {
    favorites: [],
    loading: true,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return {
                ...state,
                favorites: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};