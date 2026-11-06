'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from 'react-redux'

import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { store } from '@/store/store'

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
				<AuthProvider>
					{children}
				</AuthProvider>
			</ReduxProvider>
		</QueryClientProvider>
	)
}
