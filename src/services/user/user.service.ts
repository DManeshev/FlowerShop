import { instance } from "@/api/api.interceptor"
import { getUserUrl } from "@/config/url.config"
import { IUser } from "@/types/user.interface"
import { TypeUserData } from "./user.types"


export const UserService = {
    async getProfile() {
        return instance<IUser>({
            url: getUserUrl('/profile'),
            method: 'GET'
        })
    },

    async updateProfile(data: TypeUserData) {
        return instance<IUser>({
            url: getUserUrl('/profile'),
            method: 'PUT',
            data
        })
    },
}