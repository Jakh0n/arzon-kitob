import BookList from '@/components/books/book-list'
import { getAllBooks, getAllCategories } from '@/lib/hygraph'

export const revalidate = 2 // har 2 sekundda yangilanadi

export const metadata = {
	title: 'All Books - BookStore',
	description: 'Browse our collection of books and find your next great read.',
}

export default async function BooksPage() {
	const books = await getAllBooks()
	const categories = await getAllCategories()

	return (
		<div className='container py-12'>
			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>All Books</h1>
					<p className='text-muted-foreground'>
						Browse our collection of books and find your next great read.
					</p>
				</div>
				<BookList books={books} categories={categories} />
			</div>
		</div>
	)
}
