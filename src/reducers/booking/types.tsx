import { Mentor } from "@customTypes/mentor";
import { ServiceMentoring, ServiceSession } from "@customTypes/order";

export type ActionType =
  | "SET_MENTOR"
  | "SET_SERVICE"
  | "SET_CALENDAR_WEEK_PREV"
  | "SLOTS_SELECT"
  | "SLOTS_ERROR"
  | "SET_EMAIL"
  | "SET_PHONE"
  | "SET_MESSAGE"
  | "SWITCH_CONSENTS"
  | "SWITCH_INVITE_TEAM"
  | "UPDATE_TEAM_MEMBERS"
  | "RESET_STATE"

export type BookingState = {
  mentor: null|Mentor
  service: null|ServiceMentoring|ServiceSession
  selectedDate: string
  calendarFirstDay: string
  customerEmail: string
  customerEmailError: string
  customerPhone: string
  customerPhoneError: string
  customerMessage: string
  customerMessageError: string
  inviteTeam: boolean
  teamMembers: { fullName: string, email: string }[]
  consents: boolean
  slots: { date: Date, id: number }[]
  slotsError: string,
  mentorshipId: string
  mentorId: string
};

export type BookingAction = 
{ type: 'SET_MENTOR', payload: Pick<BookingState, 'mentor'> } |
{ type: 'SET_SERVICE', payload: Pick<BookingState, 'service'> } |
{ type: 'SET_CALENDAR_WEEK_PREV', payload: Pick<BookingState, 'calendarFirstDay'> } |
{ type: 'SLOTS_SELECT', payload: Pick<BookingState, 'slots'> } |
{ type: 'SLOTS_ERROR', payload: Pick<BookingState, 'slotsError'> } |
{ type: 'SET_EMAIL', payload: Pick<BookingState, 'customerEmail'> | Pick<BookingState, 'customerEmailError'> } |
{ type: 'SET_PHONE', payload: Pick<BookingState, 'customerPhone'> | Pick<BookingState, 'customerPhoneError'> } |
{ type: 'SET_MESSAGE', payload: Pick<BookingState, 'customerMessage'> | Pick<BookingState, 'customerMessageError'> } |
{ type: 'SWITCH_CONSENTS', payload?: Pick<BookingState, 'consents'> }  |
{ type: 'SWITCH_INVITE_TEAM', payload?: Pick<BookingState, 'inviteTeam'> }  |
{ type: 'UPDATE_TEAM_MEMBERS', payload: Pick<BookingState, 'teamMembers'> } |
{ type: 'UPDATE_MENTORSHIP_ID', payload: Pick<BookingState, 'mentorshipId'> } |
{ type: 'UPDATE_MENTOR_ID', payload: Pick<BookingState, 'mentorId'> } |
{ type: 'RESET_STATE' }
