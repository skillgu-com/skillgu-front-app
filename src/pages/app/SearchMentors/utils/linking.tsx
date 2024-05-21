import { Mentor } from "@customTypes/mentor";

export const buildMentorLink = (mentor: Mentor) : string => `/mentor/${mentor.id}`
export const buildAfterRegisterLin = () : string => '/auth/login'
