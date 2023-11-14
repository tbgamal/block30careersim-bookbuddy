import bookLogo from '../assets/books.png'
import { Link } from 'react-router-dom'

function Navigations () {
  return (
    <nav>
      <h1><img id='logo-image' src={bookLogo}/></h1>
      <h1>Book Buddy</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/account">MyAccount</Link></li>
        <li><Link to="/">Logout</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Sign up</Link></li>
      </ul>
    </nav>
  )
}

export default Navigations