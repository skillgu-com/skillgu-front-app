
const initialState = {
    isAuthenticated: false,
    user: {
        id: null,
        email: null,
        role: null,
    },
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log(state);
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    id: action.payload.id, // Add new property id
                    email: action.payload.email, //  Add new property email
                    role: action.payload.role, // Add new property role
                },

            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...state.user,
                    id: action.payload.id,
                },
            };
        case 'LOGIN-GOOGLE_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    id: action.payload.id, // Add new property id
                    email: action.payload.email, //  Add new property email
                    role: action.payload.role, // Add new property role
                },
            };
        default:
            return state;
    }
};


export default authReducer;