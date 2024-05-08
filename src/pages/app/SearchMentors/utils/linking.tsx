import { Mentor } from "@customTypes/mentor";

export const buildMentorLink = (mentor: Mentor) : string => `/mentor/${mentor.id}`
