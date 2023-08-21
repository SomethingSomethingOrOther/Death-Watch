import {useState,useEffect, useRef} from 'react'
import './App.css';

function App() {
  const [inputAge,setInputAge] = useState(25)
  const [inputRestingHeartRate,setInputRestingHeartRate] = useState(75)
  const [heartBeats,setHeartBeats] = useState(0)
  const [intervalHeartBeats,setIntervalHeartBeats] = useState(0)
  const [error,setError] =useState("")
  
 

  
    
    const calculateHeartBeatsLeft=()=>{
      const averageLifeSpan=80
        const yearsLeft= averageLifeSpan - inputAge
         let heartBeatsLeft=inputRestingHeartRate * 60 * 24 * 365 * yearsLeft
          if (!isNaN(inputRestingHeartRate)){
            setHeartBeats({heartBeatsLeft:heartBeatsLeft.toLocaleString(),yearsLeft:yearsLeft})
            setIntervalHeartBeats(heartBeatsLeft)
        }else{
          setError("Age must be less than 80 yrs.")
        }
    }

      useEffect(()=>{
       const interval= setInterval(()=>{
          setIntervalHeartBeats(prev => prev - 1.5)
        },1000)
        setHeartBeats(interval)
      },[])

    const handleReset=()=>{
      setInputRestingHeartRate(75)
      setHeartBeats(0)
      setInputAge(25)
      setIntervalHeartBeats(0)
    }

   const handleInputRestingHeartRate=(e)=>{
      const value=e.target.value
      if (value >=0 && value<=80){
        setInputAge(e.target.value)
     }
   }

  return (
    <div className="App" >
      <header className="App-header">
        <h1>
          Death Watch
        </h1>
      </header>
      <main>
        <div>
          <label>
           <p> Your Age:</p>
          <input max="120" value={inputAge} onChange={handleInputRestingHeartRate}type="number" name="age" />
            <div>{error}</div>
          </label>
        </div>
        <div>
          <label>
            <p>Resting Heart Rate:</p>
           <input onChange={(e)=>setInputRestingHeartRate(e.target.value)} 
          value={inputRestingHeartRate} 
          type="number" name="heartrate" max="120"/>
        </label>
          
        </div>
        <div>
          <h2>*Assumptions</h2>
        <p> *60 -80 resting heart rate (beats per minute) </p>
        <p>*Healthy Adult</p>
        <p></p>
        </div>
        <div>
          <button style={{padding:"1rem 2rem",backgroundColor:"purple",color:"orange",fontFamily:"proza libra",borderRadius:"3rem",border:'none',margin:"0.5rem",cursor:"pointer",fontSize:"1.4rem"}}onClick={handleReset}>Reset</button>
          <button style={{padding:"1rem 2rem",backgroundColor:"purple",color:"orange",fontFamily:"proza libra",borderRadius:"3rem",border:'none',margin:"0.5rem",cursor:"pointer",fontSize:"1.4rem"}}onClick={calculateHeartBeatsLeft}>Calculate</button>
        </div>
        <div >
          <p>{heartBeats.yearsLeft ? <>Years Left:</>:""} {""}{heartBeats.yearsLeft}</p>
         <p > <b style={{fontSize:"3rem"}}>{heartBeats.heartBeatsLeft }</b> {''}
         {heartBeats.heartBeatsLeft ? <>heart beats remaining...</>:""}</p>
          </div>
           <div>
               <p>{intervalHeartBeats >0 ? <>You've got {intervalHeartBeats} heart beats left...
               Will you descend into MEDIOCRITY...
                     <button style={{cursor:"pointer",borderRadius:"3rem",padding:"1rem 2rem",border:"none",backgroundColor:"purple",color:"orange"}}>Who cares</button> {""}
               <span><button style={{cursor:"pointer",borderRadius:"3rem",padding:"1rem 2rem",border:"none",backgroundColor:"purple",color:"orange"}}>Yeah, why not</button></span> {''} 
               <span><button style={{cursor:"pointer",borderRadius:"3rem",padding:"1rem 2rem",border:"none",backgroundColor:"purple",color:"orange"}}>Hell No!</button></span></>:""
               }</p>
               <div style={{display:"none"}}></div>
           </div>
           
      </main>
    </div>
  );
}

export default App;
