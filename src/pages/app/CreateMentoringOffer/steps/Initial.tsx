import React from 'react'
import clx from 'classnames'
import styles from '../CreateMentoringOffer.module.scss'
import { useCreateOfferReducer } from 'src/reducers/createOffer'

export const Initial = () => {
    const co = useCreateOfferReducer()
    
    console.log("Initial state", co.createOfferState)

    return (
        <div>
            <h1>Initial Step</h1>
            <button onClick={co.submitInitial}>Next</button>
        </div>
    )
}
