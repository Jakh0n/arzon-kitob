'use client'

import { getAllCategories } from '@/lib/hygraph'
import { Category } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from './logo'
import ModeToggle from './mode-toggle'

const Navbar = () => {
	const [categories, setCategories] = useState<Category[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await getAllCategories()
				setCategories(categoriesData)
			} catch (error) {
				console.error('Error fetching categories:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCategories()
	}, [])
	return (
		<div className='h-[10vh] fixed inset-0 z-50 backdrop-blur-lg bg-white/30 dark:bg-blue-950/30 border-b border-gray-200 dark:border-gray-800 flex items-center'>
			<div className='container mx-auto flex justify-between items-center'>
				<Logo />
				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-4 md:gap-6'>
						<Link
							href='/'
							className='text-sm font-medium transition-colors hover:text-primary'
						>
							Home
						</Link>
						<Link
							href='/books'
							className='text-sm font-medium transition-colors hover:text-primary'
						>
							All Books
						</Link>
						{!isLoading &&
							categories.slice(0, 3).map(category => (
								<Link
									key={category.id}
									href={`/categories/${category.slug}`}
									className='hidden md:block text-sm font-medium transition-colors hover:text-primary'
								>
									{category.name}
								</Link>
							))}
						{categories.length > 3 && (
							<Link
								href='/categories'
								className='text-sm font-medium transition-colors hover:text-primary'
							>
								More Categories
							</Link>
						)}
					</div>
					<ModeToggle />
				</div>
			</div>
		</div>
	)
}

export default Navbar
