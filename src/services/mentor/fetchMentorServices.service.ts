import { Input, OutputFailed, OutputSuccess } from './fetchMentorServices.types'

export const fetchMentorServices = async (input: Input) : Promise<OutputSuccess|OutputFailed> => {
    try {
        const resp = await fetch('/mentor-services.json')
        const respData = await resp.json()
        return {
            success: true,
            session: respData.session,
            mentoring: respData.mentoring,
        }
    } catch (e) {
        return { success: false, error: 'Error' }
    }
} 
