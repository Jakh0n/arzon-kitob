import Link from 'next/link'

const Logo = () => {
	return (
		<>
			<div className='flex items-center'>
				<Link href='/'>
					<h1 className='text-2xl font-bold font-spaceGrotesk'>
						Arzon<span className='text-blue-500 '>Kitob</span>
					</h1>
				</Link>
			</div>
		</>
	)
}

export default Logo
