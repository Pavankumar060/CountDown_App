import React,{useState,useEffect} from "react";
const Countdown =()=>{

    const [days,setDays] =  useState(20);
    const [hours,setHours] = useState(0);
    const [minutes,setMinutes] =useState(0) ;
    const [seconds,setSeconds] =useState(0) ;
    const [milliseconds,setMilliseconds]=useState(0);
    const [isRunning,setIsRunning]=useState(null);

    const days_00 = localStorage.getItem("Days");
    const hours_00 = localStorage.getItem("Hours");
    const minutes_00 = localStorage.getItem("Minutes");
    const seconds_00 = localStorage.getItem("Seconds");
    
console.log(days_00, hours_00 , minutes_00 , seconds_00);

    useEffect(()=>{
        let interval;
        if(isRunning){
            interval = setInterval(()=>{
                if(milliseconds > 0){
                    setMilliseconds((milliseconds)=>milliseconds - 1); 
                }else if(seconds >0){
                    setSeconds((seconds)=>seconds-1);
                    setMilliseconds(99);
                }else if(minutes > 0){
                    setMinutes((minutes)=>minutes-1);
                    setSeconds(59);
                    setMilliseconds(99);
                }else if(hours >0){
                    setHours((hours)=>hours-1);
                    setMinutes(59);
                    setSeconds(59);
                    setMilliseconds(99);
                }else if (days >0){
                    setDays((days)=>days-1);
                    setHours(23);
                    setMinutes(59);
                    setSeconds(59);
                    setMilliseconds(99);
                }
                
            },10)
        }
        return()=> clearInterval(interval);
    },[milliseconds, seconds,minutes,hours,days,isRunning])

    useEffect(()=>{
        window.localStorage.setItem("Days",days);
        window.localStorage.setItem("Hours",hours);
        window.localStorage.setItem("Minutes",minutes);
        window.localStorage.setItem("Seconds",seconds);
    },[days,hours,minutes,seconds])

    // //button functions

    // //start
    const handleStart=()=>{
        setIsRunning(true);
    }
    //pause
    const handlePause=()=>{
        setIsRunning(false);
    }

    //stop
    const handleStop=()=>{
    setIsRunning(false);
    setDays(24);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
    localStorage.clear();
}


return(
        <>
        <div className="heading">
            <img src="https://icons.veryicon.com/png/o/miscellaneous/common-icons-20/countdown-6.png" alt="image" className="timer_img" />
            <h2>Countdown Timer</h2>
        </div>
        <br />
        <div className="main">
            <table className="content">
                <tbody>
                <tr>
                   
                    <th>{days}:</th>
                    <th>{hours}:</th>
                    <th>{minutes}:</th>
                    <th>{seconds}</th>
                    </tr>
                <tr>
                    <td>D</td>
                    <td>H</td>
                    <td>M</td>
                    <td>S</td>
                </tr>
                </tbody>
            </table>
            <div className="buttons">
                { isRunning ? (
                    <button className="btn btn-secondary" onClick={handlePause}> Pause</button>
                ):(
                <button className="btn btn-primary" onClick={handleStart}>Start</button>)}
                <button className="btn btn-danger" onClick={handleStop}> Stop</button>
            </div>
        </div>

    </>
    )
}

export default Countdown;