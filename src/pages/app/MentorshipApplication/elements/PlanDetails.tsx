import React from "react";
import styles from '../MentorshipApplication.module.scss'
import clx from 'classnames'
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { UserIdentity } from "src/components/_base/UserIdentity";

export const PlanDetails = () => {
    const { state } = useMentAppReducer()
    const { mentor, selectedPlan } = state 
    
    return selectedPlan && mentor ? (
        <div className={styles.PlanDetails}>
            PLAN Details
            <UserIdentity 
                avatarSize={40}
                title={mentor?.fullName}
                avatarUrl={mentor?.avatarUrl}
                subtitle={`${mentor.profession} w ${mentor.company}`}
            />
            <p>rate: {mentor.rate}</p>
            <p>{selectedPlan.plan}</p>
            <p>{selectedPlan.monthlyPrice / 100} zł miesięcznie</p>
            <p>Plan obejmuje</p>
            <ul>
                {selectedPlan.included.map((a, i) => (
                    <li key={a+'-'+i}>{a}</li>
                ))}
            </ul>
        </div>
    ) : null
}
