import {FetchStudentMentorsInput, FetchStudentMentorsOutput,} from "./fetchStudentMentors.types";

export const fetchStudentMentors = async (
    props: FetchStudentMentorsInput
): Promise<FetchStudentMentorsOutput> => {
    const res = await fetch('/student-mentors.json')
    const data = await res.json()

    return {
        mentors: data.slice(0, props.take),
        total: data.length,
    };
};