import {useEffect, useRef, useState} from "react";


const useTimer = (initialValue: number, onTimeUp: () => void, resetTrigger: number) => {
    const [time, setTime] = useState<number>(initialValue)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        setTime(initialValue)
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        timerRef.current = setInterval(() => {
            setTime(prev => {
                    if (prev < 1) {
                        if (timerRef.current) {
                            clearInterval(timerRef.current);
                        }
                        onTimeUp()
                        return 0
                    }
                    return prev - 1
                }
            )
        }, 1000)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [resetTrigger, initialValue])

    return time
}

export {useTimer}