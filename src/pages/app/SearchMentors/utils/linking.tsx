import { Mentor } from "@customTypes/mentor";

export const buildMentorLink = (mentor: Mentor) : string => `/user-profile/${mentor.id}`
