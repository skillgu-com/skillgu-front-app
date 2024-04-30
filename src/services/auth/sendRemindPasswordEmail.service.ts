import axios from "axios";

const sendRemindPasswordEmailService = async (email: string) => {
    // TODO MENTEE
    try {
        const {data} = await axios.post('/api/auth/mentor/remind-password', { email });
        return {success: !!data}
    } catch (e) {
        return {success: false}
    }
}

export default sendRemindPasswordEmailService;