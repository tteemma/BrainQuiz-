import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch.ts'
import QuestionCard from '../../components/questionCard/QuestionCard.tsx'
import { useCallback, useEffect, useState } from 'react'
import { useTimer } from '../../hooks/useTimer.ts'
import style from './QuizPage.module.scss'
import { useTypedSelector } from '../../hooks/useTypedSelector.ts'
import {
	addQuizHistory,
	setTotalScore,
} from '../../store/features/quiz.slice.ts'
import * as React from 'react'
import { useDispatch } from 'react-redux'

const TIME_TO_ANSWER_SECOND = 15

const pointsByDifficulty: Record<string, number> = {
	easy: 1,
	medium: 2,
	hard: 3,
}

const QuizPage: React.FC = () => {
	const navigate = useNavigate()

	const { difficulty, category } = useTypedSelector(state => state.quiz)
	const dispatch = useDispatch()

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
	const [hasAnswered, setHasAnswered] = useState<boolean>(false)
	const [score, setScore] = useState<number>(0)
	const [rightAnswers, setRightAnswers] = useState<number>(0)

	const { questions, loading, error } = useFetch({
		amount: 10,
		category: category,
		difficulty: difficulty,
	})

	const handleCurrentQuestion = useCallback(() => {
		setHasAnswered(false)
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(prev => prev + 1)
		} else {
			const successRate = ((rightAnswers / 10) * 100).toFixed(2)
			dispatch(
				addQuizHistory({
					date: new Date().toISOString(),
					difficulty,
					category,
					score,
					successRate: Number(successRate),
				})
			)
			dispatch(setTotalScore(score))
			navigate(`/result?rightAnswers=${rightAnswers}&score=${score}`)
		}
	}, [currentQuestionIndex, questions.length, navigate])

	const time = useTimer(
		TIME_TO_ANSWER_SECOND,
		() => {
			if (!hasAnswered) setHasAnswered(true)
		},
		currentQuestionIndex
	)

	useEffect(() => {
		if (hasAnswered) {
			handleCurrentQuestion()
		}
	}, [hasAnswered, handleCurrentQuestion])

	if (loading) {
		return (
			<div className={style.loadingContainer}>
				<div className={style.spinner}>Loading...</div>
			</div>
		)
	}
	if (error) return <div>Error: {error}</div>

	return (
		<div className={style.quizPageContainer}>
			<div className={style.quizPageContent}>
				<h1 onClick={() => navigate('/')}>Quiz</h1>
				<div className={style.currQuestion}>
					Current question: {currentQuestionIndex + 1} of {questions.length}
				</div>
			</div>
			<div className={style.utils}>
				<span>Score: {score}</span>
				<div>Time:{time}</div>
			</div>

			{questions.length > 0 && (
				<QuestionCard
					question={questions[currentQuestionIndex]}
					onAnswer={(isCorrect: boolean) => {
						if (isCorrect) {
							setScore(prev => prev + pointsByDifficulty[difficulty] || 0)
							setRightAnswers(prev => prev + 1)
						}
						setHasAnswered(true)
						handleCurrentQuestion()
					}}
				/>
			)}
		</div>
	)
}

export default QuizPage
