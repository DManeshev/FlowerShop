export interface IUser {
    id: number
    createdAt: string | Date
    updatedAt: string | Date
    email: string
    name: string
    password: string
    avatarPath: string
    phone: string
    isAdmin: boolean
}