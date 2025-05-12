import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Category } from '@/types'

interface CategoryFilterProps {
	categories: Category[]
	selectedCategory: string | null
	onCategoryChange: (categorySlug: string | null) => void
	className?: string
}

const CategoryFilter = ({
	categories,
	selectedCategory,
	onCategoryChange,
	className,
}: CategoryFilterProps) => {
	if (!categories || categories.length === 0) {
		return null
	}

	const handleCategoryClick = (categorySlug: string | null) => {
		// Prevent unnecessary re-renders if clicking the already selected category
		if (categorySlug !== selectedCategory) {
			onCategoryChange(categorySlug)
		}
	}

	return (
		<div className={cn('space-y-4', className)}>
			<h2 className='text-lg font-medium'>Categories</h2>
			<div className='flex flex-wrap gap-2'>
				<Button
					variant={selectedCategory === null ? 'default' : 'outline'}
					size='sm'
					onClick={() => handleCategoryClick(null)}
					aria-pressed={selectedCategory === null}
					className='transition-all'
				>
					All
				</Button>

				{categories.map(category => (
					<Button
						key={category.slug || category.id}
						variant={selectedCategory === category.slug ? 'default' : 'outline'}
						size='sm'
						onClick={() => handleCategoryClick(category.slug)}
						aria-pressed={selectedCategory === category.slug}
						className='transition-all'
					>
						{category.name}
					</Button>
				))}
			</div>
		</div>
	)
}

export default CategoryFilter
