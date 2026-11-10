import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = { ...NO_INDEX_PAGE }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return <div className="wrapper dashboard">{children}</div>
}