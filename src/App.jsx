import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigations from './components/Navigations'
import Account from './components/Account'
import Books from './components/Books'
import Login from './components/Login'
import Register from './components/Register'
import SingleBook from './components/SingleBook'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState ({})
  const [available, setAvailable] = useState (true)
  const [resBooks, setResBooks] = useState([])
  const [search, setSearch] = useState ('')
  

  return (
    <div className='app'>
      <Navigations token={token} setToken= {setToken}/>

      <Routes>
        <Route path ='/' element={<Books />} />
        <Route path ='/account' element={
          <Account 
            token={token} 
            user={user} setUser={setUser}
            resBooks={resBooks} setResBooks={setResBooks}/>
        } />
        <Route path ='/login' element={<Login setToken= {setToken}/>} />
        <Route path ='/register' element={<Register setToken= {setToken}/>} />
        <Route path ='/details/:id' element={
          <SingleBook token={token} available={available} setAvailable={setAvailable}/>
        } />
      </Routes>
    </div>
  )
}

export default App
