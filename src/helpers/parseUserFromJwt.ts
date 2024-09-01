export const parseUserFromJwt = (token: string) => {
    console.log('czy to jest token?', token)

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        const payload = JSON.parse(jsonPayload);

        return {
            id: payload.userId,
            email: payload.sub,
            role: payload.role ? payload.role[0] : undefined,
            username: payload.username,
            stripeIntegrationStatus: payload.stripeIntegrationStatus,
        };
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
};
