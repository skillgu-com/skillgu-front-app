export type ChatContact = {
    id: number, 
    fullName: string, 
    lastMessage: string,
    avatarUrl: string,
    unreadMessages: number,
}

export type ChatMessage = {
    id: number,
    from: string,
    date: string,
    text: string, 
}
