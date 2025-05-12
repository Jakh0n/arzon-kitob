import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'

const Layout = ({ children }: ChildProps) => {
	return (
		<div className='relative flex min-h-screen flex-col'>
			<Navbar />
			<main className='flex-1 mt-24'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
