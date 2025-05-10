import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className='container flex h-[calc(100vh-200px)] flex-col items-center justify-center'>
			<div className='space-y-6 text-center'>
				<h1 className='text-4xl font-bold tracking-tighter sm:text-5xl'>
					404 - Page Not Found
				</h1>
				<p className='text-muted-foreground md:text-xl'>
					We couldn&apos;t find the page you were looking for.
				</p>
				<Button size='lg' asChild>
					<Link href='/'>Return Home</Link>
				</Button>
			</div>
		</div>
	)
}
