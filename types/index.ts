export interface ChildProps {
	children: React.ReactNode
}
export interface Book {
	id: string
	title: string
	slug: string
	description: string
	price: number
	coverImage: {
		url: string
	}
	author: {
		name: string
	}
	categories: Category[]
	publishedAt: string
}

export interface Category {
	id: string
	name: string
	slug: string
}

export interface HygraphResponse<T> {
	data: T
}

export interface BooksQueryResponse {
	books: Book[]
}

export interface BookQueryResponse {
	book: Book
}

export interface CategoriesQueryResponse {
	categories: Category[]
}

export interface CategoryQueryResponse {
	category: Category & {
		books: Book[]
	}
}
