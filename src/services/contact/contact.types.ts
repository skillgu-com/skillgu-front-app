export type ContactServiceInput = {
    email: string
    message: string
}

export type ContactServiceOutput = {
    success: false
    errorMessage: string
}|{
    success: true
    successMessage: string
}
