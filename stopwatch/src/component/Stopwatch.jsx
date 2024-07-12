import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds} : ${milliseconds}`;
  }

  return (
    <>
      <div className="bg-clip-border rounded-xl bg-gradient-to-tr from-gray-700 to-gray-800 text-white shadow-gray-900/20 shadow-md w-full max-w-[20rem] p-8">
        <div className=" pb-8 m-0 mb-8 overflow-hidden text-center text-white-700 bg-transparent border-b rounded-none shadow-none bg-clip-border border-white/10">
          <div className=" text-3xl font-bold  ">{formatTime()}</div>
          <div className="mt-5">
            <button
              onClick={start}
              className="bg-green-400 hover:bg-green-500 text-black font-bold py-2 px-4 rounded"
            >
              Start
            </button>
            <button
              onClick={stop}
              className="bg-red-400 hover:bg-red-500 text-black font-bold py-2 px-4 rounded"
            >
              Stop
            </button>
            <button
              onClick={reset}
              className="bg-blue-400 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stopwatch;
