import axios from "axios";

const cancelMentoringSessionById = async ({ id, reason }: { id: string, reason: string }): Promise<number> => {
    try {
        const { status } = await axios.delete(`/api/1.0/calendar/events/${id}`, { data: { reason } });
        return status;
    } catch (error) {
        console.error('Wystąpił błąd podczas usuwania spotkania:', error);
        throw error; // Rzucenie błędu, aby `onError` w `useMutation` obsłużył ten wyjątek
    }
};

export default cancelMentoringSessionById;