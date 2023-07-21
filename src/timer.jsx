/* eslint-disable no-tabs */
import React, { useEffect, useRef, useState } from 'react'
import '../styles/timer.css'

export default function Timer () {
  const [timer, setTimer] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [ultimateTime, setUltimateTime] = useState('00:00')

  useEffect(() => {
    let intervalID
    if (timer === true) {
      intervalID = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1)
      }, 1000)
    }

    return () => {
      clearInterval(intervalID)
    }
  }, [timer])

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0)
      setMinutes(prevMinutes => prevMinutes + 1)
    }
  }, [seconds])

  function handleStart () {
    setTimer(true)
  }

  function handleStop () {
    setTimer(false)
  }

  const lastTime = useRef()

  function handleRestart () {
    setUltimateTime(lastTime.current.textContent)
    setSeconds(0)
    setMinutes(0)
    setTimer(false)
  }

  return (
	<div>
		<div className='timer-container'>
    <button className='start' onClick={handleStart}>Start</button>
    <div>
			<div className='timer-count' ref={lastTime}>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>
			<button onClick={handleRestart}>Restart</button>
		</div>
    <button className='stop' onClick={handleStop}>Stop</button>
  </div>
	<div>Ultimate time: {ultimateTime}</div>
	</div>
  )
}
