import style from './DifficultySelector.module.scss'
import cn from 'clsx'

interface IProps {
	difficulties: string[]
	onSelect?: (difficult: string) => void
	selected: string | null
}

const DifficultySelector = ({ difficulties, onSelect, selected }: IProps) => {
	return (
		<div className={style.difficultySelectorContainer}>
			{difficulties.map(d => (
				<button
					className={cn(style.categoryButton, {
						[style.selected]: selected === d,
					})}
					onClick={() => onSelect?.(d)}
					key={d}
				>
					{d.charAt(0).toUpperCase()}
					{d.slice(1)}
				</button>
			))}
		</div>
	)
}

export default DifficultySelector
