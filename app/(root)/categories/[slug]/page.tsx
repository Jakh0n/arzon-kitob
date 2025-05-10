import BookList from '@/components/books/book-list'
import { getAllCategories, getCategoryBySlug } from '@/lib/hygraph'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: CategoryPageProps) {
	const category = await getCategoryBySlug(params.slug)

	if (!category) {
		return {
			title: 'Category Not Found',
		}
	}

	return {
		title: `${category.name} Books - BookStore`,
		description: `Browse our collection of ${category.name} books.`,
	}
}

export async function generateStaticParams() {
	const categories = await getAllCategories()

	return categories.map(category => ({
		slug: category.slug,
	}))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const category = await getCategoryBySlug(params.slug)

	if (!category) {
		notFound()
	}

	return (
		<div className='container py-12'>
			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>
						{category.name} Books
					</h1>
					<p className='text-muted-foreground'>
						Browse our collection of {category.name.toLowerCase()} books
					</p>
				</div>

				<BookList books={category.books} />
			</div>
		</div>
	)
}
