import { instance } from "@/api/api.interceptor"
import { IUser } from "@/types/user.interface"
import { TypeUserData } from "./user.types"

const URL = '/users' as const 

export const UserService = {
    async getProfile() {
        return instance<IUser>({
            url: `${URL}/profile`,
            method: 'GET'
        })
    },

    async updateProfile(data: TypeUserData) {
        return instance<IUser>({
            url: `${URL}/profile`,
            method: 'PUT',
            data
        })
    },
}