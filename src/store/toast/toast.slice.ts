import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface IToast {
	isShow: boolean
	message: string | null
	type: 'truth' | 'error' | null
}

const initialState: IToast = {
    isShow: false,
	message: null,
	type: null
}

export const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
        setToast(state, action: PayloadAction<IToast>) {
            return action.payload
        }
    }
});
