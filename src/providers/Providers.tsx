'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { YMaps } from '@pbe/react-yandex-maps'

import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { persistor, store } from '@/store/store'

import { PropsWithChildren } from 'react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReduxProvider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AuthProvider>
						<YMaps>
							{children}
						</YMaps>
					</AuthProvider>
				</PersistGate>
			</ReduxProvider>
		</QueryClientProvider>
	)
}
