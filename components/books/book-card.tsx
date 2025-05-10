import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatCurrency, truncateText } from '@/lib/utils'
import { Book } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface BookCardProps {
	book: Book
}

export default function BookCard({ book }: BookCardProps) {
	const cardRef = useRef<HTMLDivElement>(null)
	const [rotation, setRotation] = useState({ x: 0, y: 0 })
	const [isHovered, setIsHovered] = useState(false)

	// Handle mouse movement for 3D effect
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return

		const card = cardRef.current
		const rect = card.getBoundingClientRect()

		// Calculate mouse position relative to card center
		const x = e.clientX - rect.left - rect.width / 2
		const y = e.clientY - rect.top - rect.height / 2

		// Convert to rotation angles (limited range for subtle effect)
		const rotateY = (x / (rect.width / 2)) * 5 // -5 to 5 degrees
		const rotateX = (y / (rect.height / 2)) * -5 // 5 to -5 degrees (inverted)

		setRotation({ x: rotateX, y: rotateY })
	}

	// Reset rotation when mouse leaves
	const handleMouseLeave = () => {
		setRotation({ x: 0, y: 0 })
		setIsHovered(false)
	}

	return (
		<div
			ref={cardRef}
			className='perspective-1000 w-full h-full'
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={handleMouseLeave}
		>
			<Card
				className={`
          relative overflow-hidden rounded-lg bg-white 
          transition-all duration-300 transform-gpu
          shadow-md hover:shadow-xl
          ${isHovered ? 'shadow-lg scale-105' : ''}
        `}
				style={{
					transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
					transformStyle: 'preserve-3d',
				}}
			>
				<Link href={`/books/${book.slug}`} className='block'>
					<div className='relative aspect-[3/4] overflow-hidden'>
						<div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10' />
						<Image
							src={book.coverImage?.url || '/images/placeholder.jpg'}
							alt={book.title}
							width={300}
							height={400}
							className={`
                h-full w-full object-cover 
                transition-all duration-500
                ${isHovered ? 'scale-110' : 'scale-100'}
              `}
						/>
					</div>

					<div className='p-4'>
						<div className='space-y-1 mb-3'>
							<h3 className='font-bold text-lg leading-tight'>{book.title}</h3>
							<p className='text-sm text-muted-foreground'>
								{book.author.name}
							</p>
						</div>

						<p className='text-sm text-muted-foreground mb-4'>
							{truncateText(book.description, 80)}
						</p>
					</div>
				</Link>

				<div className='absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-white to-transparent pt-8'>
					<div className='font-bold text-lg'>{formatCurrency(book.price)}</div>
					<Button
						size='sm'
						className={`
              bg-blue-600 hover:bg-blue-700 text-white font-medium
              transform transition-all duration-300
              ${isHovered ? 'scale-105 shadow-md' : ''}
            `}
						onClick={e => {
							e.preventDefault()
							// Add to cart logic here
						}}
					>
						Add to Cart
					</Button>
				</div>
			</Card>
		</div>
	)
}
