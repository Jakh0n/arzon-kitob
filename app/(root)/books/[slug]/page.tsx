import { Button } from '@/components/ui/button'
import { getAllBooks, getBookBySlug } from '@/lib/hygraph'
import { formatCurrency, formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface BookPageProps {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: BookPageProps) {
	const book = await getBookBySlug(params.slug)

	if (!book) {
		return {
			title: 'Book Not Found',
		}
	}

	return {
		title: `${book.title} - BookStore`,
		description: book.description,
	}
}

export async function generateStaticParams() {
	const books = await getAllBooks()

	return books.map(book => ({
		slug: book.slug,
	}))
}

export default async function BookPage({ params }: BookPageProps) {
	const book = await getBookBySlug(params.slug)

	if (!book) {
		notFound()
	}

	return (
		<div className='container py-12'>
			<div className='grid gap-6 lg:grid-cols-2'>
				<div className='flex items-center justify-center lg:justify-end'>
					<div className='relative h-[500px] w-[350px] overflow-hidden rounded-lg shadow-lg'>
						<Image
							src={book.coverImage?.url || '/images/placeholder.jpg'}
							alt={book.title}
							fill
							className='object-cover'
							priority
						/>
					</div>
				</div>
				<div className='flex flex-col justify-center space-y-6'>
					<div className='space-y-2'>
						<h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>
							{book.title}
						</h1>
						<p className='text-xl text-muted-foreground'>
							By {book.author.name}
						</p>
					</div>

					<div className='flex items-center gap-2'>
						{book.categories.map(category => (
							<Link
								key={category.id}
								href={`/categories/${category.slug}`}
								className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-secondary'
							>
								{category.name}
							</Link>
						))}
					</div>

					<p className='text-muted-foreground'>{book.description}</p>

					<div className='flex flex-col gap-2'>
						<div className='flex items-center gap-2'>
							<span className='font-semibold'>Price:</span>
							<span>{formatCurrency(book.price)}</span>
						</div>
						<div className='flex items-center gap-2'>
							<span className='font-semibold'>Published:</span>
							<span>{formatDate(book.publishedAt)}</span>
						</div>
					</div>

					<div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3'>
						<Button size='lg'>Add to Cart</Button>
						<Button size='lg' variant='outline'>
							Add to Wishlist
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
