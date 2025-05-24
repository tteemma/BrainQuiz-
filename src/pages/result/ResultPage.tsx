import {useLocation, useNavigate} from 'react-router-dom'
import style from './ResultPage.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector.ts";
import {useDispatch} from "react-redux";
import {increaseBestScore} from "../../store/features/quiz.slice.ts";

enum VariantsReload {
    HOME = 'HOME',
    TRY_ONE_MORE = 'TRY_ONE_MORE',
}


const ResultPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const score = Number(params.get('score')) || 0
    const rightAnswers = params.get('rightAnswers') || '0'

    const {difficulty, category} = useTypedSelector((state) => state.quiz)
    const dispatch = useDispatch()

    const successRate = ((Number(rightAnswers) / 10) * 100).toFixed(2)

    const handleNavigate = (page: VariantsReload) => {
        switch (page) {
            case 'HOME':
                navigate('/')
                break
            case 'TRY_ONE_MORE':
                navigate(`/quiz?difficulty=${difficulty}&category=${category}`)
                break
        }
    }

    const handleSaveBestResult = () => {
        dispatch(increaseBestScore(score))
    }

    return (
        <div className={style.resultPageContainer}>
            <div className={style.resultPageTotalScore}>Score: {score}</div>
            <div className={style.resultPageRightAnswers}>
                Right Answers: {rightAnswers}
            </div>
            <div className={style.resultPageScorePercent}>
                Success rate: {successRate}%
            </div>
            <div className={style.resultPageButtons}>
                <button onClick={() => handleNavigate(VariantsReload.TRY_ONE_MORE)}>
                    Try more
                </button>
                <button onClick={() => handleNavigate(VariantsReload.HOME)}>
                    Start new Quiz
                </button>
                <button onClick={handleSaveBestResult}>Save Result</button>
            </div>
        </div>
    )
}

export default ResultPage
