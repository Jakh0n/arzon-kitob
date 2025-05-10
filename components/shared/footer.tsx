import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='w-full border-t bg-background py-6 '>
			<div className='container flex flex-col items-center justify-between gap-4 md:flex-row '>
				<div className='flex flex-col items-center gap-4 md:items-start'>
					<Link href='/' className='flex items-center text-xl font-bold'>
						<span className='text-primary mr-2'>Book</span>
						<span>Store</span>
					</Link>
					<p className='text-sm text-muted-foreground text-center md:text-left'>
						&copy; {new Date().getFullYear()} BookStore. All rights reserved.
					</p>
				</div>
				<div className='flex flex-col md:flex-row gap-4 md:gap-6'>
					<Link
						href='/about'
						className='text-sm underline-offset-4 hover:underline'
					>
						About
					</Link>
					<Link
						href='/contact'
						className='text-sm underline-offset-4 hover:underline'
					>
						Contact
					</Link>
					<Link
						href='/privacy'
						className='text-sm underline-offset-4 hover:underline'
					>
						Privacy Policy
					</Link>
					<Link
						href='/terms'
						className='text-sm underline-offset-4 hover:underline'
					>
						Terms of Service
					</Link>
				</div>
			</div>
		</footer>
	)
}
