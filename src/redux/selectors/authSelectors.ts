export const getRole = (state: any) => state.auth.user?.role
export const getEmail = (state: any) => state.auth.user?.email
export const getUser = (state: any) => state.auth.user
export const getUserStripeIntegrationStatus = (state: any) => state.auth.user?.stripeIntegrationStatus