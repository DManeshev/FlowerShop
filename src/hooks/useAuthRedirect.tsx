import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { replace } = useRouter()
	const pathname = usePathname()

	useEffect(() => {
		if (user) {
			replace(pathname)
		}
	}, [user, pathname])
}
