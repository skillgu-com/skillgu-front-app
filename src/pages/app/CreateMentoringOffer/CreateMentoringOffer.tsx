import React from 'react'
import clx from 'classnames'
import styles from '../CreateMentoringOffer.module.scss'
import { useCreateOfferReducer } from 'src/reducers/createOffer'
import { Initial, Build, Determine, Summary } from './steps'

export const CreateMentoringOffer = () => {
    const co = useCreateOfferReducer()
    
    console.log("Build state", co.createOfferState)

    return (
        <div>
            <h2>Step: {co.createOfferState.step}</h2>
            {co.createOfferState.step === 'initial' ? (<Initial />) : null}
            {co.createOfferState.step === 'determine' ? (<Determine />) : null}
            {co.createOfferState.step === 'build' ? (<Build />) : null}
            {co.createOfferState.step === 'summary' ? (<Summary />) : null}
        </div>
    )
}
