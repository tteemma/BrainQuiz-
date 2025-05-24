import { configureStore } from '@reduxjs/toolkit'
import quizReducer from './features/quiz.slice.ts'
import themeReducer from './features/theme.slice.ts'


export const store = configureStore({
	reducer: {
		quiz: quizReducer,
		theme: themeReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST'],
			},
		}),
})

store.subscribe(() => {
	localStorage.setItem('quizSettings', JSON.stringify(store.getState().quiz))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
