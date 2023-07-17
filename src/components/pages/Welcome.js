import React from 'react'
import './Welcome.css'
import {Link} from 'react-router-dom'

const Welcome = () => {
  return (
    <div className='welcome'>
    <p>Welcome to Expense Tracker !!!</p>
    <button>Your profile is incomplete
    <Link to="updateprofile"> Complete now </Link></button>

    <hr/>
    </div>
  )
}

export default Welcome
