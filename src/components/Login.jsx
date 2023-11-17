import { useState } from "react"
import axios from "axios"
import '../index.css'
import { useNavigate, Link } from "react-router-dom"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login'


function Login ( {setToken} ) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState ('')
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      const response = await axios.post(API, {
        email, password
      })

      let successMessage = "Login successful!"

      setToken(response.data.token)

      if (response.data.message === successMessage){
        navigate('/')
      }
    }
    catch(err){
      setErrorMsg('user cannot be found')
    }
  }

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleSubmit}>
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

      <div className="error-message">{errorMsg}</div>
    </div>
  )}


export default Login