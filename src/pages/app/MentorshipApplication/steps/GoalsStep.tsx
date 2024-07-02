import React, { useCallback } from "react";
import styles from '../MentorshipApplication.module.scss'
import clx from 'classnames'
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { Link } from "react-router-dom";
import { ContentWrapper } from "../elements/ContentWrapper";

export const GoalsStep = () => {
    const { state, submitGoals } = useMentAppReducer()
    const { availableGoals, selectedGoals } = state

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.currentTarget as HTMLInputElement
        const { value, checked } = input
        if(checked){
            submitGoals([...selectedGoals, value], false)
        } else {
            submitGoals([...selectedGoals].filter(a => a !== value), false)
        }
    }, [selectedGoals, submitGoals])

    return (
        <ContentWrapper
            title={``} 
            subtitle={'Jakie są Twoje główne cele?'} 
            description={''} 
            submitText={'Dalej'}
            submitHandler={() => submitGoals(state.selectedGoals, true)}
            step={2}
            sidebar
        >
            <form>
                {availableGoals.map((a,i) => {
                    return (
                        <label style={{ display: 'block' }}>
                            <input value={a} onChange={handleChange} type="checkbox" checked={selectedGoals.includes(a)} />
                            <span>{a}</span>
                        </label>
                    )
                })}
            </form>
        </ContentWrapper>
    )
}
