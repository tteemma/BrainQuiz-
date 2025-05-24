import style from './HomePage.module.scss'
import CategorySelector from '../../components/selectors/categorySelector/CategorySelector.tsx'
import DifficultySelector from '../../components/selectors/difficultySelector/DifficultySelector.tsx'
import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {setQuizSettings} from '../../store/features/quiz.slice.ts'
import {useTypedSelector} from '../../hooks/useTypedSelector.ts'
import {SunFilled, TrophyFilled} from '@ant-design/icons'
import {Tooltip} from 'antd'
import {setTheme, ThemeType} from "../../store/features/theme.slice.ts";
import {useEffect} from "react";

export const categories = [
    {id: 9, name: 'General Knowledge'},
    {id: 23, name: 'History'},
    {id: 11, name: 'Film'},
]
const difficulties = ['easy', 'medium', 'hard']

const HomePage: React.FC = () => {
    const [warning, setWarning] = React.useState<boolean>(false)
    const navigate = useNavigate()

    const {difficulty, category, bestScore, totalScore, history} =
        useTypedSelector(state => state.quiz)
    const {theme} = useTypedSelector(state => state.theme)
    const dispatch = useDispatch()

	useEffect(() => {
		document.body.className = theme
	},[theme])

    const handleStartQuiz = () => {
        if (category && difficulty) {
            navigate(`/quiz`)
        } else {
            setWarning(true)
            setTimeout(() => {
                setWarning(false)
            }, 2000)
        }
    }

	const toggleTheme = () => {
		void (
			theme === ThemeType.DARK ? dispatch(setTheme(ThemeType.LIGHT)) : dispatch(setTheme(ThemeType.DARK))
		)
	}

    const navToStats = () => {
        navigate('/statistic')
    }

    return (
        <div className={style.homePageContainer}>
            <div className={style.homePageContent}>
                <div className={style.brainQuizContent}>
                    <h1>BRAIN QUEST</h1>
                    <Tooltip title='Статистика'>
                        <TrophyFilled
                            className={style.brainQuizStats}
                            onClick={navToStats}
                        />
                    </Tooltip>
                    <SunFilled className={style.brainQuizTheme} onClick={toggleTheme} />
                </div>
                <CategorySelector
                    categories={categories}
                    onSelect={id =>
                        dispatch(
                            setQuizSettings({
                                category: id,
                                difficulty,
                                bestScore,
                                totalScore,
                                history,
                            })
                        )
                    }
                    selected={category}
                />
                <h2>Difficulty</h2>
                <DifficultySelector
                    difficulties={difficulties}
                    onSelect={difficult =>
                        dispatch(
                            setQuizSettings({
                                category,
                                difficulty: difficult,
                                bestScore,
                                totalScore,
                                history,
                            })
                        )
                    }
                    selected={difficulty}
                />
                <button className={style.startButton} onClick={handleStartQuiz}>
                    Start Quiz
                </button>
                {warning && <span className={style.warningText}>Select all items</span>}
            </div>
        </div>
    )
}

export default HomePage
