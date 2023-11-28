import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistStore
} from 'redux-persist'

import { toastSlice } from './toast/toast.slice'
import { userSlice } from './user/user.slice'
import { cartSlice } from './cart/cart.slice'

const isClient = typeof window !== 'undefined'

const rootReducer = combineReducers({
	cart: cartSlice.reducer,
	user: userSlice.reducer,
	toast: toastSlice.reducer,
})

let mainReducer = rootReducer

if (isClient) {
	const { persistReducer } = require('redux-persist')
	const storage = require('redux-persist/lib/storage').default

	const persistConfig = {
		key: 'flower-shop',
		storage,
		whitelist: ['cart']
	}

	mainReducer = persistReducer(persistConfig, rootReducer)
}

export const store = configureStore({
	reducer: mainReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof mainReducer>
