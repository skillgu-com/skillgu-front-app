export type ServiceType = 'session'|'mentoring'

export type ServiceSession = {
    id: string
    title: string
    descriptionHtml: string
    price: number
    durationMinutes: number
}

export type ServiceMentoring = {
    id: string
    title: string
    subtitle: string
    price: number
    variant: ''|'pro'
    descriptionRows: string[]
}
