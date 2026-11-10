import Header from '@/components/layout/header/Header'
import Footer from '@/components/layout/footer/Footer'
import Navigation from '@/components/layout/navigation/Navigation'
import Checkout from '@/components/layout/checkout/Checkout'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="wrapper">
			<div className='desktop__view relative'>
				<Header />

				<Navigation />

				<main className='main'>
					{children}
				</main>

				<Footer />

				<Checkout />
			</div>
		</div>
	)
}