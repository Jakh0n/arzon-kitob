'use client'

import { Book, Category } from '@/types'
import { useEffect, useState } from 'react'
import BookCard from './book-card'
import CategoryFilter from './category-filter'

interface BookListProps {
	books: Book[]
	categories?: Category[]
}

export default function BookList({ books, categories = [] }: BookListProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
	const [filteredBooks, setFilteredBooks] = useState<Book[]>(books)

	useEffect(() => {
		// Filter books based on selected category
		if (selectedCategory) {
			const filtered = books.filter(book =>
				book.categories.some(category => category.slug === selectedCategory)
			)
			setFilteredBooks(filtered)
		} else {
			setFilteredBooks(books)
		}
	}, [selectedCategory, books])

	const handleCategoryChange = (categorySlug: string | null) => {
		setSelectedCategory(categorySlug)
	}

	return (
		<div className='space-y-6'>
			{categories.length > 0 && (
				<CategoryFilter
					categories={categories}
					selectedCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
				/>
			)}

			{filteredBooks.length === 0 ? (
				<div className='text-center py-12'>
					<p className='text-muted-foreground'>
						No books found for this category.
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{filteredBooks.map(book => (
						<BookCard key={book.id} book={book} />
					))}
				</div>
			)}
		</div>
	)
}
