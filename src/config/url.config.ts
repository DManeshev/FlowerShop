export const ADMIN_PANEL_URL = '/dashboard'

export const getSiteUrl = () => process.env.APP_URL as string

export const getAdminUrl = (path = ''): string => `${ADMIN_PANEL_URL}${path}`

export const getAuthUrl = (path: string): string => `/auth${path}`

export const getProductUrl = (path: string): string => `/products${path}`

export const getOrderUrl = (path: string): string => `/orders${path}`
