import BookList from '@/components/books/book-list'
import { getAllBooks, getAllCategories } from '@/lib/hygraph'
import BookHero from './_components/book-hero'
const HomePage = async () => {
	const books = await getAllBooks()
	const categories = await getAllCategories()
	console.log(books.length)

	// Get a featured book (first book or any logic to determine a featured one)
	const featuredBook = books[0]

	// Get the remaining books for the grid
	const remainingBooks = books.slice(0)

	return (
		<div className='flex flex-col gap-12 py-6'>
			<section className='px-4 md:px-6 container '>
				{featuredBook && <BookHero featuredBook={featuredBook} />}
			</section>

			<section className='container space-y-6'>
				<div className='flex items-center justify-between'>
					<h2 className='text-2xl font-bold tracking-tight'>Featured Books</h2>
				</div>
				<BookList books={books} categories={categories} />
			</section>
		</div>
	)
}

export default HomePage
