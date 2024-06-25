import React from "react";
import clx from 'classnames'
import styles from '../MentorOfferDetails.module.scss'
import { ServiceMentoring } from "@customTypes/order";
import { OfferStatus } from "@services/offer/offer.service";

export type OfferDetails = {
    rejectionFeedback: string
    handleSendFeedback: (feedback: string) => Promise<void>
  };

export const Rejected = ({ rejectionFeedback, handleSendFeedback } : OfferDetails) => { 

    return (
        <div>
            Odmówiłeś

            {rejectionFeedback ? (
                <p>Twoje uzasadnienie: {rejectionFeedback}</p>
            ) : (
                <div>
                    <p>przeslij feedback</p>
                    <input />
                </div>
            )}
        </div>
    )
}
