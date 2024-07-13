const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const acceptMentorship = async (offerId: number) : Promise<boolean> => {
    await delay(1000);

    return true
}
