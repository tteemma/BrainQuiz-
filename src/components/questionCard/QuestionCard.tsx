import he from 'he'
import { useMemo } from 'react'

import style from './QuestionCard.module.scss'

interface QuestionCardProps {
	question: {
		category: string
		question: string
		correct_answer: string
		incorrect_answers: string[]
	}
	onAnswer: (question: boolean) => void
}

const QuestionCard = ({ question, onAnswer }: QuestionCardProps) => {
	const answers = useMemo(() => {
		return [...question.incorrect_answers, question.correct_answer].sort(
			() => Math.random() - 0.5
		)
	}, [question])

	if (!question) {
		return <div>Loading question...</div>
	}

	const handleAnswer = (answer: string) => {
		const isRightAnswer = answer === question.correct_answer
		onAnswer(isRightAnswer)
	}

	return (
		<div className={style.questionCardContainer}>
			<div className={style.questionText}>
				<h3>{he.decode(question.category)}</h3>
				<p>{he.decode(question.question)}</p>
			</div>

			<div className={style.answersButton}>
				{answers.map((answer, index) => (
					<button onClick={() => handleAnswer(answer)} key={index}>
						{he.decode(answer)}
					</button>
				))}
			</div>
		</div>
	)
}

export default QuestionCard
