import { JSX } from 'react'
import style from './CategorySelector.module.scss'
import cn from 'clsx'
import { FaAtom, FaLandmark, FaFilm } from 'react-icons/fa'

interface Category {
	id: number
	name: string
}

interface CategorySelector {
	categories: Category[]
	onSelect?: (id: number) => void
	selected: number | null
}

const icons: Record<string, JSX.Element> = {
	'General Knowledge': <FaAtom />,
	History: <FaLandmark />,
	Film: <FaFilm />,
}

const CategorySelector = ({
	categories,
	onSelect,
	selected,
}: CategorySelector) => {
	return (
		<div className={style.categorySelectorContainer}>
			{categories.map(category => (
				<div key={category.id}>
					<button
						className={cn(style.categoryButton, {
							[style.selected]: selected === category.id,
						})}
						onClick={() => {
							onSelect?.(category.id)
						}}
					>
						{icons[category.name]}
						{category.name.charAt(0).toUpperCase()}
						{category.name.slice(1)}
					</button>
				</div>
			))}
		</div>
	)
}

export default CategorySelector
