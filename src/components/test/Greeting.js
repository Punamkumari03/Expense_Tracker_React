import React from 'react'
import { useState } from 'react'

const Greeting = () => {
const[changedtext,setChangedText] = useState(false)
const changeTextHandler =() =>{
  setChangedText(true)
}
  return (
    <div>
      <h2>Hello World</h2>
     {!changedtext && <p>It's good to see you</p>}
     {changedtext && <p>changed!</p>}
      <button onClick={changeTextHandler}>Change text</button>
    </div>
  )
}

export default Greeting
