const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const rejectMentorship = async (offerId: number) : Promise<boolean> => {
    await delay(1000);

    return true
}
