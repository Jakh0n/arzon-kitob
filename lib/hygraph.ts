import {
	Book,
	BookQueryResponse,
	BooksQueryResponse,
	CategoriesQueryResponse,
	Category,
	CategoryQueryResponse,
} from '@/types'
import { GraphQLClient } from 'graphql-request'

// Replace with your actual Hygraph API endpoint
const endpoint =
	process.env.HYGRAPH_ENDPOINT ||
	'https://us-west-2.cdn.hygraph.com/content/cmaf1bg0n01dg07w1rzx5zceu/master'

// Initialize the GraphQL client
const client = new GraphQLClient(endpoint)

// Queries
export const getAllBooks = async (): Promise<Book[]> => {
	const query = `
    query GetAllBooks {
      books {
        id
        title
        slug
        description
        price
        coverImage {
          url
        }
        author {
          name
        }
        categories {
          id
          name
          slug
        }
        publishedAt
      }
    }
  `

	try {
		const response = await client.request<BooksQueryResponse>(query)
		return response.books
	} catch (error) {
		console.error('Error fetching books:', error)
		return []
	}
}

export const getBookBySlug = async (slug: string): Promise<Book | null> => {
	const query = `
    query GetBookBySlug($slug: String!) {
      book(where: { slug: $slug }) {
        id
        title
        slug
        description
        price
        coverImage {
          url
        }
        author {
          name
        }
        categories {
          id
          name
          slug
        }
        publishedAt
      }
    }
  `

	try {
		const response = await client.request<BookQueryResponse>(query, { slug })
		return response.book
	} catch (error) {
		console.error(`Error fetching book with slug ${slug}:`, error)
		return null
	}
}

export const getAllCategories = async (): Promise<Category[]> => {
	const query = `
    query GetAllCategories {
      categories {
        id
        name
        slug
      }
    }
  `

	try {
		const response = await client.request<CategoriesQueryResponse>(query)
		return response.categories
	} catch (error) {
		console.error('Error fetching categories:', error)
		return []
	}
}

export const getCategoryBySlug = async (
	slug: string
): Promise<(Category & { books: Book[] }) | null> => {
	const query = `
    query GetCategoryBySlug($slug: String!) {
      category(where: { slug: $slug }) {
        id
        name
        slug
        books {
          id
          title
          slug
          description
          price
          coverImage {
            url
          }
          author {
            name
          }
          publishedAt
        }
      }
    }
  `

	try {
		const response = await client.request<CategoryQueryResponse>(query, {
			slug,
		})
		return response.category
	} catch (error) {
		console.error(`Error fetching category with slug ${slug}:`, error)
		return null
	}
}
