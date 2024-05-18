import React, {FC} from "react";
import {DateHeaderProps} from "react-big-calendar";

type Props = DateHeaderProps

const CalendarDateHeader: FC<Props> = ({ label }) => {

    return <div>{label}</div>
}

export default CalendarDateHeader