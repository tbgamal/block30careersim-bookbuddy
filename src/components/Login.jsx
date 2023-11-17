import { useState } from "react"
import axios from "axios"
import '../index.css'
import { useNavigate, Link } from "react-router-dom"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login'


function Login ( {token, setToken} ) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const [successMsg, setSuccessMsg] = useState ('')
  const [errorMsg, setErrorMsg] = useState ('')
  const navigate = useNavigate()


  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      const response = await axios.post(API, {
        email, password
      })

      let successMessage = "Login successful!"

      // setSuccessMsg(response.data.message)
      setToken(response.data.token)
      // console.log(token)

      if (response.data.message === successMessage){
        navigate('/')
        // login function works. But somehow I have to click the login button two times to redirect into home page
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