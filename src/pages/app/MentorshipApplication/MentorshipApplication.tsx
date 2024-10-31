import React, { useEffect, useRef } from "react";
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { DetailsStep, GoalsStep, PlanStep, SummaryStep } from "./steps";
import getAvailableTimezone from "@services/timezone/getAvailableTimezone.service";
import { getMentorshipDetails } from "@services/mentorship/getMentorshipDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "src/hooks/useCurrentUser";
import paths from "../../../paths";

export const MentorshipApplicationPage = () => {
    const { state, ...actions } = useMentAppReducer()
    const init = useRef<boolean>(false)
    const { id } = useParams();
    const user = useCurrentUser()
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            const currentUrl = window.location.href;
            const sp = new URLSearchParams({ redirect_to: currentUrl });
            navigate(`${paths.login}?${sp.toString()}`);
        }
    }, [user, navigate])

    useEffect(() => {
        const fetchInitialData = async () => {
            Promise.all([
                await getAvailableTimezone().then((options) => {
                    actions.updateAvailableTimezones(options.map(o => o.label))
                }),
                await getMentorshipDetails(Number(id)).then(({ availableGoals, mentor, plan }) => {
                    actions.updateMentor(mentor)
                    actions.updatePlan(plan)
                    actions.updateAvailableGoals(availableGoals)
                }),
            ])          
        }
        if(id && !init.current){
            init.current = true
            fetchInitialData()
        }
    }, [actions, id])
    
    if(state.step === 'plan') {
        return <PlanStep />
    }

    if(state.step === 'goals') {
        return <GoalsStep />
    }
    
    if(state.step === 'details') {
        return <DetailsStep />
    }
    
    if(state.step === 'summary') {
        return <SummaryStep />
    }

    return null
}
