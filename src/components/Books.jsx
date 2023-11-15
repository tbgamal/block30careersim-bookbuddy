/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/'

function Books () {

  const [ books, setBooks ] = useState ([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks () {
    try {
      const { data: response}  = await axios.get (`${API}/books`)
      setBooks (response.books)

    }
    catch (err){
      console.error (err.message)
    }
  }

  fetchBooks()
  return (
    <>
      <ul className="books-container">
        {
          books.length ?
          books.map(book => {
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