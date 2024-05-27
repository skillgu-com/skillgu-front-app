import axios from "axios";

// TODO Parse it if needed
type RescheduleMentoringSessionParams = {
    id: string;
    body: {
        timeSlotId: number;
    }
}

const rescheduleMentoringSessionService = async ({id, body}: RescheduleMentoringSessionParams): Promise<number> => {
    // TODO API
    const {status} = await axios.patch(`/api/1.0/event/${id}`, body);
    return status;
};

export default rescheduleMentoringSessionService;