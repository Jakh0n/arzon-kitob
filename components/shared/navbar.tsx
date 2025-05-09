import { navLinks } from '@/constants'
import Link from 'next/link'
import { Button } from '../ui/button'
import Logo from './logo'
import ModeToggle from './mode-toggle'

const Navbar = () => {
	return (
		<div className='h-[10vh] fixed inset-0 z-50 backdrop-blur-lg bg-white/30 dark:bg-blue-950/30 border-b border-gray-200 dark:border-gray-800 flex items-center'>
			<div className='container mx-auto flex justify-between items-center'>
				<Logo />
				<div className='flex items-center gap-2'>
					{navLinks.map(link => (
						<Button variant={'ghost'} size={'sm'} key={link.label}>
							<Link href={link.href} key={link.label}>
								<div className='flex items-center gap-1'>
									<link.icon className='w-4 h-4 ' />
									<h1 className='text-md font-medium  hover:underline hover:underline-offset-4 transition-all duration-400'>
										{link.label}
									</h1>
								</div>
							</Link>
						</Button>
					))}
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}

export default Navbar
