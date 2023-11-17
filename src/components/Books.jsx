import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/'

function Books () {

  const [ books, setBooks ] = useState ([])
  const [ search, setSearch ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks () {
    try {
      const { data: response }  = await axios.get (`${API}/books`)
      setBooks (response.books)

    }
    catch (err){
      console.error (err.message)
    }
  }

  fetchBooks()
  return (
    <>
    <form className="search-bar">
     <input type="text" placeholder='search books' onChange={(e) =>setSearch(e.target.value)} />
    </form>
      <ul className="books-container">
        {
          books.length ?
          books
            .filter((book) => {
              return search.toLowerCase() ===''
              ? book
              : book.title.toLowerCase().includes(search)
            })
            .map(book => {
            return (
              <li key={book.id} onClick={() => navigate(`/details/${book.id}`)}>
                <h3>{book.title}</h3>
                <img src={book.coverimage} />
              </li>
            )
          })
            :
            <h2>Loading...</h2>
        }
      </ul>
      
    </>
    
  )
}

export default Books