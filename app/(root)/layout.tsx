import Navbar from '@/components/shared/navbar'
import { ChildProps } from '@/types'

const Layout = ({ children }: ChildProps) => {
	return (
		<>
			<Navbar />
			<main className='container mx-auto'>{children}</main>
		</>
	)
}

export default Layout
