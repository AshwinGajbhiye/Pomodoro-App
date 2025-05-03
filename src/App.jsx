import clock from './assets/c.png'
import clock2 from './assets/clock2.png'
import { useState,useRef , useEffect} from 'react'

function App() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isRunning , setIsRunning] = useState(false);
  const [secondsLeft , setSecondsLeft] = useState(0);
  const [isPaused , setIsPaused] = useState(false);
  const [isReset , setIsReset] = useState(false);
  const timeRef = useRef(null);

  const parseTime = (input) => {
    const [minutes , second] = input.split(':').map(Number);
    return (minutes || 0) * 60 + (second || 0);
  }

  const formatTime = (totalSeconds) => {
    const min = String(Math.floor(totalSeconds / 60)).padStart(2 , '0');
    const sec = String(totalSeconds % 60).padStart(2 , '0');
    return `${min}:${sec}`;
  }

  useEffect(()=>{
    if(!isRunning || isPaused || secondsLeft <= 0) return;

      const interval = setInterval(()=>{
        setSecondsLeft((prev) => prev - 1);
      },1000)

    return () => clearInterval(interval);
  },[isRunning , secondsLeft , isPaused]);

  const startTimer = () => {
    const inputVal = timeRef.current.value;
    const total = parseTime(inputVal);
    if(isNaN(total) || total <= 0) return;
    setSecondsLeft(total);
    setIsRunning(true);
  }

  const stopTimer = ()=>{
    setIsPaused(true);
  }

  const resumeTimer = () => {
    setIsPaused(false);
  }

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSecondsLeft(0);
  }

  return (
    <>
      <div className="relative bg-[url('./assets/background.jpeg')] h-screen bg-cover bg-center flex justify-center">
        {!isExpanded ? (
          <div className="absolute top-5 left-5">
            <img src={clock2} alt="clock" className='object-contain h-52 w-52' onClick={() => setIsExpanded(true)} />

          </div>
        ) : (
            <div className='absolute inset-0 items-center flex justify-center'>
              <div className='h-[400px] w-[270px] backdrop-blur-xl shadow-xl rounded-2xl flex flex-col items-center justify-center space-y-8 p-6'>
                <img src={clock} alt="clock" className='object-contain h-40 w-40' onClick={() => setIsExpanded(false)} />
                {!isRunning ? (
                  <input ref={timeRef} type="text" placeholder='Enter Time' className='w-full text-white px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300' />
                ):(
                  <div className='text-white text-5xl font-bold'>
                    {formatTime(secondsLeft)}
                  </div>
                )}

                {!isRunning ? (
                  <button className='text-black h-10 w-30 bg-amber-500 rounded-full space-y-4' onClick={startTimer}>Start</button>
                ):(
                  <div className='flex flex-row space-x-4'>
                    {!isPaused && (
                      <button className='text-black h-10 w-30 bg-red-500 rounded-full space-y-4' onClick={stopTimer}>Stop</button>
                    )}
                    
                    {isPaused &&(
                      <>
                        <button className='text-black h-10 w-30 bg-red-500 rounded-full space-y-4' onClick={resetTimer}>Reset</button> 
                        <button className='text-black h-10 w-30 bg-green-500 rounded-full' onClick={resumeTimer}>Resume</button>
                      </>
                    )}


                  </div>
                  
                )}
              </div>
            </div>
        )}

      </div>


    </>
  )
}

export default App
