import React, {FC} from "react";
import {Calendar as BigCalendar, dateFnsLocalizer, type CalendarProps} from 'react-big-calendar';
import {format, parse, startOfWeek, getDay} from 'date-fns';
import {pl} from 'date-fns/locale';
import {StyledCalendarWrapper} from "./Calendar.styles";
import CalendarToolbar from "./_components/CalendarToolbar/CalendarToolbar";
import CalendarHeader from "./_components/CalendarHeader/CalendarHeader";
import CalendarDateHeader from "./_components/CalendarDateHeader/CalendarDateHeader";
import CalendarEvent from "./_components/CalendarEvent/CalendarEvent";

const locales = {
    'pl-PL': pl,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), {weekStartsOn: 1}),
    getDay,
    locales
});

type Props = {
    calendarProps: Pick<CalendarProps, 'events' | 'onNavigate'>
}

const CELL_SIZE = 160

const now = new Date();
const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0, 0);

const event = { start, end, title: 'test', allDay: false, metadata: {eventInDayNumber: 0} }
const event2 = { start, end, title: 'test', allDay: false, metadata: {eventInDayNumber: 1} }
const event3 = { start, end, title: 'test', allDay: false, metadata: {eventInDayNumber: 2, eventInDayCount: 7} }

const Calendar: FC<Props> = ({calendarProps}) => {

    return (
        <StyledCalendarWrapper cellSize={CELL_SIZE}>
            <BigCalendar
                localizer={localizer}
                defaultView='month'
                views={['month']}
                components={{
                    toolbar: CalendarToolbar,
                    header: CalendarHeader,
                    month: {dateHeader: CalendarDateHeader},
                    // @ts-ignore
                    eventWrapper: CalendarEvent,
                }}
                 // In RBC show more logic is messy, so I need to achieve it in other way
                messages={{showMore: () => ''}}
                {...calendarProps}
                events={[event, event2, event3]}
            />
        </StyledCalendarWrapper>
    )
}

export default Calendar;