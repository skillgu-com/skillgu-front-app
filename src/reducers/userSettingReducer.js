const initialState = {
    userSettingStep: {
        profileImage: '',
        industry: '',
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
    }
}

const userSettingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STEP_FIRST_USER_SETTING':
            // console.log(action)
            return {
                ...state,
                userSettingStep: {
                    profileImage: action.payload.profileImage,
                    industry: action.payload.industry,
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
                    timeZone: action.payload.timeZone
                },
            };

        default:
            return state;
    }
};


export default userSettingReducer;
