import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Link, Routes, Route } from 'react-router-dom'
import Navigations from './components/Navigations'
import Account from './components/Account'
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import SingleBook from './components/SingleBook'

function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <Navigations token={token} setToken= {setToken}/>

      <Routes>
        <Route path ='/' element={<Books />} />
        <Route path ='/account' element={<Account />} />
        <Route path ='/login' element={<Login token={token} setToken= {setToken}/>} />
        <Route path ='/register' element={<Register token={token} setToken= {setToken}/>} />
        <Route path ='/details/:id' element={<SingleBook />} />
      </Routes>
    </>
  )
}

export default App
