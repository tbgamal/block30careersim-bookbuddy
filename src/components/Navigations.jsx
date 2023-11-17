import bookLogo from '../assets/books.png'
import { Link } from 'react-router-dom'

function Navigations ({ token, setToken }) {

  return (
    <nav>
      <h1><img id='logo-image' src={bookLogo}/>Book Buddy</h1>
      <ul className='nav-menu'>
        <li><Link to="/">Home</Link></li>
        {token ? <li><Link to="/account">MyAccount</Link></li> : <div></div> }
        {token ? <li onClick={()=>setToken(null)}><Link>Logout</Link></li> : <div></div>}
        {token ? <div></div> : <li><Link to="/login">Login</Link></li>}
        {token ? <div></div> : <li><Link to="/register">Sign up</Link></li>}
      </ul>
    </nav>
  )
}

export default Navigations