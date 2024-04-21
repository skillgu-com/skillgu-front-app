import React, {useContext} from "react";
import {createContext, useReducer} from "react";
import mentorRegisterInitialState from "../reducers/mentorRegister/constants";
import mentorRegisterReducer from "../reducers/mentorRegister/mentorRegisterReducer";
import {MentorRegisterReducerAction} from "../reducers/mentorRegister/types";
import RegisterMentorStep1 from "@newComponents/_registerMentor/RegisterMentorStep1/RegisterMentorStep1";
import RegisterMentorStep2 from "@newComponents/_registerMentor/RegisterMentorStep2/RegisterMentorStep2";
import RegisterMentorStep3 from "@newComponents/_registerMentor/RegisterMentorStep3/RegisterMentorStep3";
import RegisterMentorStep4 from "@newComponents/_registerMentor/RegisterMentorStep4/RegisterMentorStep4";
import RegisterMentorStep5 from "@newComponents/_registerMentor/RegisterMentorStep5/RegisterMentorStep5";
import AsideTileLayout from "@newComponents/AsideTileLayout/AsideTileLayout";
import RegisterMentorStepperNavigation
    from "@newComponents/_registerMentor/RegisterMentorStepperNavigation/RegisterMentorStepperNavigation";

type RegisterMentorContextType = {
    registerMentorState: typeof mentorRegisterInitialState;
    registerMentorDispatch: React.Dispatch<MentorRegisterReducerAction>;
}

const resolveStepView = (step: number) => {
    switch (step) {
        case 0:
            return <RegisterMentorStep1/>;
        case 1:
            return <RegisterMentorStep2/>;
        case 2:
            return <RegisterMentorStep3/>;
        case 3:
            return <RegisterMentorStep4/>;
        case 4:
            return <RegisterMentorStep5/>;
        default:
            return <RegisterMentorStep1/>;
    }
}

const RegisterMentorContext = createContext<RegisterMentorContextType>({ registerMentorState: mentorRegisterInitialState, registerMentorDispatch: () => null });

export const RegisterMentorProvider: React.FC = () => {
    const [registerMentorState, registerMentorDispatch] = useReducer(mentorRegisterReducer, mentorRegisterInitialState);

    return (
        <RegisterMentorContext.Provider value={{ registerMentorState, registerMentorDispatch }}>
                <AsideTileLayout asideContent={<RegisterMentorStepperNavigation/>}>
                    {resolveStepView(registerMentorState.step)}
                </AsideTileLayout>
        </RegisterMentorContext.Provider>
    );
};

const useRegisterMentorContext = () => useContext(RegisterMentorContext);

export default useRegisterMentorContext;
