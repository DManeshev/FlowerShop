import { createSlice } from '@reduxjs/toolkit'

import { getLocalStorage } from '@/utils/local-storage'
import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'

const initialState: IInitialState = {
	user: getLocalStorage('user'),
	isLoading: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			// register
			.addCase(register.pending, state => {
				state.isLoading = true
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(register.rejected, state => {
				state.isLoading = false
			})
			// login
			.addCase(login.pending, state => {
				state.isLoading = true
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
			.addCase(login.rejected, state => {
				state.isLoading = false
			})
			// logout
			.addCase(logout.fulfilled, state => {
				state.isLoading = false
				state.user = null
			})
			// checkAuth
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.user = action.payload.user
			})
	}
})
