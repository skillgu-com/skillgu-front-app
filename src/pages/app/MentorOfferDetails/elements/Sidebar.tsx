import React from "react";
import clx from 'classnames'
import styles from '../MentorOfferDetails.module.scss'
import { ServiceMentoring } from "@customTypes/order";

type Props = {
    service: ServiceMentoring
}

export const Sidebar = ({ service } : Props) => {  
    return (
        <div>
            Wybrany Plan: {service.title}
        </div>
    )
}
