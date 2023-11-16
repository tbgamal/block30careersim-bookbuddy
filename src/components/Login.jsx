/* TODO - add your code to create a functional React component that renders a login form */

import { useState, useEffect } from "react"
import axios from "axios"
import '../index.css'
import { useNavigate, Link } from "react-router-dom"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login'


function Login ( {token, setToken} ) {

  // const [token, setToken] = useState('')
  // const [user, setUser] = useState({})

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMsg, setSuccessMsg] = useState ('')
  const [errorMsg, setErrorMsg] = useState ('')
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      const response = await axios.post(API, {
        email, password
      })

      let successMessage = "Login successful!"


      console.log(response)
      setSuccessMsg(response.data.message)
      console.log(successMsg)
      setToken(response.data.token)
      console.log(token)

      if (successMsg == successMessage){
        navigate('/')
      }
    }
    catch(err){
      setErrorMsg('user cannot be found')
    }

    
  }
  return (
    <>
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
      <div className="link"><Link to="/register">Create an account here</Link></div>

      <h3 className="error-message">{errorMsg}</h3>
      </>
  )}


export default Login