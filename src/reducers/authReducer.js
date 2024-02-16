
const initialState = {
    isAuthenticated: false,
    user: {
        id: null,
        email: null,
        role: null,
        userID: null,
        firstName: null,
        lastName: null,
        age: null,
        user_role: null | null,
        agreement: true,
        description: null,
        location: null | null,
        linkedInURL:  null,
        youtubeURL: null,
        instagramURL:  null,
        facebookURL: null,
        websiteURL: null,
        youtube:  null,
        timeZone: null,
        jobPosition: null,
        // skill: []
    },
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
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
        case 'FETCH_ALL_USER_DATA':
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...state.user,
                    firstName: action?.payload.firstName,
                    lastName: action?.payload.lastName,
                    // jobPosition: action?.payload.jobPosition,
                    // linkedInURL: action?.payload.linkedInURL,
                    // youtubeURL: action?.payload.youtubeURL,
                    // instagramURL: action?.payload.instagramURL,
                    // facebookURL: action?.payload.facebookURL,
                    // websiteURL: action?.payload.websiteURL,
                    // description:action?.payload.description,
                    // skill: action?.payload.skill
                },
            };
        default:
            return state;
    }
};


export default authReducer;