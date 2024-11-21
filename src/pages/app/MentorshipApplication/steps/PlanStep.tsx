import React from "react";
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { ContentWrapper } from "../elements/ContentWrapper";
import { PlanDetails } from "../elements";
import styles from './../MentorshipApplication.module.scss'

export const PlanStep = () => {
    const { state, ...actions } = useMentAppReducer()

    return (
        <ContentWrapper
            title={`Zapraszam na mój mentoring`}
            subtitle={''} 
            description={'Informacje, które wypełnisz, zostaną przesłane do mentora, aby ten mógł lepiej przygotować się do Waszych spotkań.'} 
            submitText={'Zaczynajmy'}
            submitHandler={actions.submitPlan}
            step={1}
        >
            <PlanDetails className={styles.planDetails}/>            
        </ContentWrapper>
    )
}
