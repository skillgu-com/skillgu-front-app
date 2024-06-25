import React from 'react'
import clx from 'classnames'
import styles from '../CreateMentoringOffer.module.scss'
import { useCreateOfferReducer } from 'src/reducers/createOffer'

export const Determine = () => {
    const co = useCreateOfferReducer()
    
    console.log("Determine state", co.createOfferState)

    return (
        <div>
            <h1>Determine Step</h1>
            <button onClick={() => co.submitDetermine(1)}>1 Plan</button>
            <button onClick={() => co.submitDetermine(2)}>2 Plany</button>
            <button onClick={() => co.submitDetermine(3)}>3 Plany</button>
            <button onClick={() => co.prevStep()}>BACK</button>
        </div>
    )
}
