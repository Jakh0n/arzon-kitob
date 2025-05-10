import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getAllCategories } from '@/lib/hygraph'
import Link from 'next/link'

export const metadata = {
	title: 'Categories - BookStore',
	description: 'Browse books by category.',
}

export default async function CategoriesPage() {
	const categories = await getAllCategories()

	return (
		<div className='container py-12'>
			<div className='space-y-6'>
				<div>
					<h1 className='text-3xl font-bold tracking-tight'>Categories</h1>
					<p className='text-muted-foreground'>Browse books by category</p>
				</div>

				<div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{categories.map(category => (
						<Link
							key={category.id}
							href={`/categories/${category.slug}`}
							className='block'
						>
							<Card className='h-full transition-shadow hover:shadow-md'>
								<CardHeader>
									<CardTitle>{category.name}</CardTitle>
									<CardDescription>
										Browse {category.name} books
									</CardDescription>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
