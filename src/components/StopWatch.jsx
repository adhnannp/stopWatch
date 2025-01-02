import React,{useRef,useState,useEffect} from 'react'
import '../assets/stopWatch.css'



function StopWatch(){
    const [isRunning,setIsRuning] = useState(false)
    const [elapsedTime,setElapsedTime] = useState(0)
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(()=>{
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now()- startTimeRef.current)
            },10)
        }

        return ()=>{
            clearInterval(intervalIdRef.current)
        }
    },[isRunning])

    function start(){
        setIsRuning(true)
        startTimeRef.current = Date.now() - elapsedTime
    }
    function stop(){
        setIsRuning(false)
    }
    function reset(){
        setElapsedTime(0)
        setIsRuning(false)
    }
    function formatTime(){
        let hours = Math.floor(elapsedTime/(1000*60*60))
        let minutes = Math.floor(elapsedTime/(1000*60) %60)
        let seconds = Math.floor(elapsedTime/(1000) %60)
        let milliSeconds = Math.floor((elapsedTime%1000)/10)

        hours = String(hours).padStart(2,'0')
        minutes = String(minutes).padStart(2,'0')
        seconds = String(seconds).padStart(2,'0')
        milliSeconds = String(milliSeconds).padStart(2,'0')

        return `${hours}:${minutes}:${seconds}:${milliSeconds}`
    }

    return(
        <div className='stopWatch'>
            <div className='displayTime'>{formatTime()}</div>
            <div className='controls'>
                <button onClick={start} className='start-time'>start</button>
                <button onClick={stop} className='stop-time'>stop</button>
                <button onClick={reset} className='reset-time'>reset</button>
            </div>
        </div>
    )
}


export default StopWatch;