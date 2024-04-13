import { Mentor } from "../types";

export const buildMentorLink = (mentor: Mentor) : string => `/mentor/${mentor.id}`
