import axios from "axios";


const cancelMentoringSessionById = async ({ id, reason }: { id: string, reason: string }): Promise<number> => {
    // TODO API
    const {status} = await axios.delete(`/api/1.0/event/${id}`, {data: {reason}});
    return status;
};

export default cancelMentoringSessionById;