import { axiosClassic } from '@/api/api.interceptor'
import { REFRESH_TOKEN } from '@/constants/token.constants'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'
import Cookies from 'js-cookie'
import { saveToStorage } from './auth.helper'

import { getAuthUrl } from '@/config/url.config'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await axiosClassic<IAuthResponse>({
			url: getAuthUrl(`/${type}`),
			method: 'POST',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			getAuthUrl('/login/access-token'),
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}
