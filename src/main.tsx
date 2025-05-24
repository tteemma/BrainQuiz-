import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home/HomePage.tsx'
import QuizPage from './pages/quizPage/QuizPage.tsx'
import ResultPage from './pages/result/ResultPage.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import StatsPage from './pages/statsPage/StatsPage.tsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/quiz',
		element: <QuizPage />,
	},
	{
		path: '/result',
		element: <ResultPage />,
	},
	{
		path: '/statistic',
		element: <StatsPage />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
)
