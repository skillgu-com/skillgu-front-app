import React from "react";
import styles from '../MentorshipApplication.module.scss'
import clx from 'classnames'
import { useMentAppReducer } from "src/reducers/mentorship-application";
import { Link } from "react-router-dom";
import { ContentWrapper } from "../elements/ContentWrapper";

export const DetailsStep = () => {
    const { state, submitDetails } = useMentAppReducer()
    const { availableTimezones, timezone, location, description, questions } = state
    
    return (
        <ContentWrapper
        title={``} 
        subtitle={'Dowiedzmy się więcej o Tobie'} 
        description={''} 
        submitText={'Zakończ'}
        submitHandler={() => submitDetails({
            timezone: state.timezone,
            location: state.location,
            description: state.description,
            questions: state.questions,
        }, true)}
        step={3}
        sidebar
    >
        <form>
            <fieldset>
                <legend>timezone</legend>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const sel = e.currentTarget as HTMLSelectElement
                    const { value } = sel
                    submitDetails({
                        location,
                        timezone: value,
                        questions,
                        description,
                    }, false)
                }}>
                    {availableTimezones.map(t => (
                        <option key={t}>{t}</option>
                    ))}
                </select>
            </fieldset>
            <fieldset>
                <legend>miejsce</legend>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const sel = e.currentTarget as HTMLSelectElement
                    const { value } = sel
                    submitDetails({
                        location: value,
                        timezone,
                        questions,
                        description,
                    }, false)
                }}>
                    <option>Online</option>
                    <option>U mentora</option>
                    <option>U studenta</option>
                    <option>inne</option>
                </select>
            </fieldset>
            <fieldset>
                <legend>Opowiedz trochę o sobie</legend>
                <textarea name={'description'} value={description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const txt = e.currentTarget as HTMLTextAreaElement
                    const { value } = txt
                    submitDetails({
                        location,
                        timezone,
                        questions,
                        description: value,
                    }, false)
                }}></textarea>
            </fieldset>
            <fieldset>
                <legend>Czy masz jakieś pytania do mentora?</legend>
                <textarea name={'questions'} value={questions} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const txt = e.currentTarget as HTMLTextAreaElement
                    const { value } = txt
                    submitDetails({
                        location,
                        timezone,
                        questions: value,
                        description,
                    }, false)
                }}></textarea>
            </fieldset>
        </form>
    </ContentWrapper>
    )
}
