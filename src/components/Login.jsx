/* TODO - add your code to create a functional React component that renders a login form */

import { useState, useEffect } from "react"
import axios from "axios"
import '../index.css'

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login'

function Login ( {token, setToken} ) {

  // const [token, setToken] = useState('')
  // const [user, setUser] = useState({})

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post(API, {
        email, password
      })

      console.log(response)
      setToken(response.data.token)
      console.log(token)
    }
    catch(err){
      console.error(err)
    }
  }
  


  return (
    <form onSubmit={handleSubmit}>
        <label>Email:
          <input  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <button>Sign In</button>
      </form>

  )
}

export default Login