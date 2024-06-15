export type ChatContact = {
    id: number, 
    fullName: string, 
    lastMessage: string,
    lastMessageDate: string,
    avatarUrl: string,
    unreadMessages: number,
}

export type ChatMessage = {
    id: number,
    fromId: number,
    date: string,
    text: string, 
}
