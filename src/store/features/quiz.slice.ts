import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface QuizHistory {
	date: string
	difficulty: string
	category: number
	score: number
	successRate: number
}

interface QuizState {
	difficulty: string
	category: number
	bestScore: number
	totalScore: number
	history: QuizHistory[]
}

const savedSettings = localStorage.getItem('quizSettings')
const parsedSettings = savedSettings ? JSON.parse(savedSettings) : null

const initialState: QuizState = {
	difficulty: '',
	category: 0,
	bestScore: parsedSettings?.bestScore || 0,
	totalScore: parsedSettings?.totalScore || 0,
	history: parsedSettings?.history || [],
}

const quizSlice = createSlice({
	name: 'quiz',
	initialState,
	reducers: {
		increaseBestScore(state, action: PayloadAction<number>) {
			state.bestScore = Math.max(action.payload, state.bestScore)
		},
		setTotalScore(state, action: PayloadAction<number>) {
			state.totalScore += action.payload
		},
		setQuizSettings(state, action: PayloadAction<QuizState>) {
			state.category = action.payload.category
			state.difficulty = action.payload.difficulty
		},
		addQuizHistory(state, action: PayloadAction<QuizHistory>) {
			state.history.push(action.payload)
		},
		resetProgress(state) {
			state.difficulty = ''
			state.category = 0
			state.bestScore = 0
			state.totalScore = 0
			state.history = []
		},
	},
})

export const {
	increaseBestScore,
	setQuizSettings,
	setTotalScore,
	addQuizHistory,
	resetProgress,
} = quizSlice.actions
export default quizSlice.reducer
