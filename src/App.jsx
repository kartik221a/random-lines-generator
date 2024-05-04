import { useState, useEffect } from 'react'
import './App.css'
import pickupLineApi from './pickupLineApi.json'


function App() {
  /* advice api starts */
  const [advice, setAdvice] = useState("Get Advice!!!")
  const [changeContent, setChangeContent] = useState(false)
  useEffect(() => {
    if (changeContent) {
      fetch('https://api.adviceslip.com/advice')
        .then((res) => res.json())
        .then((data) => {
          let adv = data.slip.advice
          setAdvice(adv)
          setChangeContent(false)
        })
    }
  }, [changeContent])

  const buttonClicked = () => {
    setChangeContent(true);
  }
  /* advice api ends */

  

  /* pickup line api starts */
  const [pickup, setPickup] = useState("Get Pickup Line!!!")
  useEffect(() => {
    if (changeContent) {
      let pickupLines = pickupLineApi
      let num = Math.floor(Math.random() * 20) + 1;
      setPickup(pickupLines[num])
      setChangeContent(false)
    }
  }, [changeContent])
  /* pickup line api ends */

  
  /* jokes api starts */
  const [joke, setJoke] = useState("Get Joke!!!")
  useEffect(() => {
    if (changeContent) {
      fetch('https://v2.jokeapi.dev/joke/Programming,Dark,Spooky?blacklistFlags=political,explicit')
        .then((res) => res.json())
        .then((data) => {
          if(data.type == "single"){
            setJoke(data.joke)
          }
          else{
            setJoke(data.setup + `-----` + data.delivery)
          }
          setChangeContent(false)
        })
    }
  }, [changeContent])

  /* jokes api ends */




  return (
    <>
      <div className='container'>
        <div className='box'>
          <h1>{joke}</h1>
          <div className='button-container'>
            <button onClick={buttonClicked}>Click here to get advice!</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
