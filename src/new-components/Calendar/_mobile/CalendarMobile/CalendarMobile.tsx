import React, {FC, useMemo} from 'react';
import {MeetingInCalendar} from "../../../../pages/app/CalendarView/CalendarView";
import CalendarToolbar from "@newComponents/Calendar/_components/CalendarToolbar/CalendarToolbar";
import {NavigateAction} from "react-big-calendar";
import {getDaysInMonth} from "date-fns";

type Props = {
    events: MeetingInCalendar[],
    moveSelectedRange: (direction: NavigateAction) => void,
    selectedRange: { from: Date, to: Date },
}

const CalendarMobile: FC<Props> = ({selectedRange, moveSelectedRange}) => {

    const daysToDisplay = useMemo(() => {
        const days = [];
        const daysCount = getDaysInMonth(selectedRange.from);

        for (let i = 1; i <= daysCount; i++) {
            days.push(new Date(selectedRange.from.getFullYear(), selectedRange.from.getMonth(), i));
        }

        return days;

    }, [selectedRange]);


    return <div>
        <CalendarToolbar
            onNavigate={moveSelectedRange}
            date={selectedRange.from}
        />
        <div>
            {daysToDisplay.map((date) => <div key={date.toString()}>{date.toDateString()}</div>)}
        </div>
    </div>
};

export default CalendarMobile