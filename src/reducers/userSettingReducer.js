const initialState = {
    userSettingStep: {
        profileImage: '',
        category: '',
        hobby: '',
        firstName: '',
        lastName: '',
        id: '',
        oldEmail: '',
        newEmail: '',
        jobPosition: '',
        location: '',
        descriptionAboutMe: '',
        phone: '',
        facebookURL: '',
        instagramURL: '',
        twitterURL: '',
        linkedInURL: '',
        youtubeURL: '',
        timeZone: '',
        skill:''
    }
}

const userSettingReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'STEP_FIRST_USER_SETTING':
            return {
                ...state,
                userSettingStep: {
                    profileImage: action.payload.profileImage,
                    category: action.payload.category,
                    hobby: action.payload.hobby,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    id: action.payload.id,
                    oldEmail: action.payload.oldEmail,
                    newEmail: action.payload.newEmail,
                    jobPosition: action.payload.jobPosition,
                    location: action.payload.location,
                    descriptionAboutMe: action.payload.descriptionAboutMe,
                    phone: action.payload.phone,
                    facebookURL: action.payload.facebookURL,
                    instagramURL: action.payload.instagramURL,
                    twitterURL: action.payload.twitterURL,
                    linkedInURL: action.payload.linkedInURL,
                    youtubeURL: action.payload.youtubeURL,
                    timeZone: action.payload.timeZone,
                    skill: action.payload.skill
                },
            };

        default:
            return state;
    }
};


export default userSettingReducer;
