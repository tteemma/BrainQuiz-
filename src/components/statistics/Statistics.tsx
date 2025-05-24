import style from './Statistics.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";

const Statistics = () => {
	const {bestScore} = useTypedSelector(state => state.quiz)

	return (
		<div className={style.statisticContainer}>
			<div className={style.statisticData}>Best score: {bestScore}</div>
		</div>
	)
}

export default Statistics
