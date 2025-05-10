import { Button } from '@/components/ui/button'
import { Category } from '@/types'

interface CategoryFilterProps {
	categories: Category[]
	selectedCategory: string | null
	onCategoryChange: (categorySlug: string | null) => void
}

export default function CategoryFilter({
	categories,
	selectedCategory,
	onCategoryChange,
}: CategoryFilterProps) {
	return (
		<div className='space-y-4'>
			<h2 className='text-lg font-medium'>Categories</h2>
			<div className='flex flex-wrap gap-2'>
				<Button
					variant={selectedCategory === null ? 'default' : 'outline'}
					size='sm'
					onClick={() => onCategoryChange(null)}
				>
					All
				</Button>
				{categories.map(category => (
					<Button
						key={category.id}
						variant={selectedCategory === category.slug ? 'default' : 'outline'}
						size='sm'
						onClick={() => onCategoryChange(category.slug)}
					>
						{category.name}
					</Button>
				))}
			</div>
		</div>
	)
}
