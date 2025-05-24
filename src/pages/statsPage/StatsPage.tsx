import { HomeOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import style from './StatsPage.module.scss'
import { useNavigate } from 'react-router-dom'

import { Card, Collapse } from 'antd'
import { categories } from '../home/HomePage'
import { resetProgress } from '../../store/features/quiz.slice'
import { useDispatch } from 'react-redux'

const StatsPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { totalScore, bestScore, history } = useTypedSelector(
		state => state.quiz
	)

	const handleHome = () => {
		navigate('/')
	}

	const handleRestProgress = () => {
		dispatch(resetProgress())
	}

	return (
		<div className={style.statsPageContainer}>
			<div className={style.statsPageContent}>
				<HomeOutlined className={style.homeOutlined} onClick={handleHome} />
				<button onClick={handleRestProgress}>Reset Score</button>
				<div className={style.finishedQuiz}>
					You finished {history.length} quiz
				</div>
				<div className={style.bestScore}>Your best score: {bestScore}</div>
				<div className={style.totalScore}>Your total score: {totalScore}</div>
				{history.length > 0 ? (
					<Collapse
						accordion
						className={style.historyCollapse}
						items={[
							{
								key: '1',
								label: `History (${history.length} quizzes)`,
								children: (
									<>
										{history.map((quiz, index) => (
											<Card
												className={style.historyCard}
												key={quiz.date}
												title={`Quiz ${index + 1} - ${new Date(
													quiz.date
												).toLocaleDateString()}`}
											>
												<p>
													Category:{' '}
													{categories.find(c => c.id === quiz.category)?.name ||
														'Unknown'}
												</p>
												<p>Difficult: {quiz.difficulty}</p>
												<p>Score: {quiz.score}</p>
												<p>Success Rate: {quiz.successRate}%</p>
											</Card>
										))}
									</>
								),
							},
						]}
					/>
				) : (
					<h2>No data yet</h2>
				)}
			</div>
		</div>
	)
}

export default StatsPage
