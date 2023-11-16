/* TODO - add your code to create a functional React component that renders a registration form */

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import '../index.css'

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register'


function Register ({ token, setToken }) {

  // const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      let response = await fetch(API, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname, lastname, email, password
        })
      })
  
      let json = await response.json()
      let successMessage = "Registration successful!"
      let failedMessage = "A user with that email already exists"

      setSuccessMsg(json.message)
      console.log(successMsg)

      if(successMsg === successMessage){
        navigate('/account')
      }
      else {
        // setErrorMsg("Registration failed")
      }
  
      // console.log(json)
      setToken(json.token)
    }
    catch (err){
      console.error(`error message: ${err}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>First Name:
          <input value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        </label>
        <label>Last Name:
          <input value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
        </label>
        <label>Email:
          <input  value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <button>Sign Up</button>
      </form>

      {/* <div className="error-message">{errorMsg}</div> */}

      {/* <h1>Welcome {firstname} {lastname}. Please login with the following email in the future {email}</h1> */}
    </>
  )
  }

  

    
      // <>
      //   <form onSubmit={handleSubmit}>
      //     <label>First Name:
      //       <input value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
      //     </label>
      //     <label>Last Name:
      //       <input value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
      //     </label>
      //     <label>Email:
      //       <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
      //     </label>
      //     <label>
      //       Password:
      //       <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
      //     </label>
      //     <button>Sign Up</button>
      //   </form>
      // </>


export default Register