import { useEffect, useState } from 'react'
import axios, { AxiosError } from 'axios'

interface IQuizData {
	category: string
	type: string
	difficulty: string
	question: string
	correct_answer: string
	incorrect_answers: string[]
}

const cache: Record<string, IQuizData[]> = {}

const API_URL = 'https://opentdb.com/api.php'

const useFetch = ({
	amount = 10,
	category,
	difficulty,
}: {
	amount?: number
	category: number
	difficulty: string
}) => {
	const [questions, setQuestions] = useState<IQuizData[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const cacheKey = `${amount}-${category}-${difficulty}`

		if (cache[cacheKey]) {
			setQuestions(cache[cacheKey])
			setLoading(false)
			return
		}

		if (!category || !difficulty) {
			setError('Category is required')
			setQuestions([])
			setLoading(false)
			return
		}

		setLoading(true)
		setError(null)
		const fetch = async () => {
			try {
				const responseData = await axios.get(API_URL, {
					params: {
						amount,
						category,
						difficulty,
						type: 'multiple',
					},
				})
				const results: IQuizData[] = responseData.data.results || []
				setQuestions(results)
				cache[cacheKey] = results
			} catch (error) {
				const err = error as AxiosError
				setError(err.message || 'Failed to fetch quiz data')
				setQuestions([])
			} finally {
				setLoading(false)
			}
		}

		const timeToFetch = setTimeout(() => {
			void fetch()
		}, 500)

		return () => {
			clearTimeout(timeToFetch)
		}
	}, [amount, category, difficulty])

	return { questions, loading, error }
}

export { useFetch }
