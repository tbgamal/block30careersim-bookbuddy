/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/'

function SingleBook ({ token, setToken, available, setAvailable, returned, setReturned }) {

  const [ book, setBook ] = useState ({})
  const { id } = useParams ()

  useEffect(() => {
    fetchSingleBook()
  }, [])

  async function fetchSingleBook () {

    try {
      const { data: json } = await axios.get (`${API}/books/${id}`)
      console.log(json)
      setAvailable(json.book.available)
      setBook(json.book)
      

    }
    catch(err){
      console.error(err.message)
    }
  }

  async function reserve () {

    try {
      const response = await fetch (`${API}books/${id}`, {
        method: "PATCH",
        headers:{
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({
          available: false
        })        
      })
      let json = await response.json()
      console.log(token)
      setAvailable(json.book.available)
    }
    catch(err) {
      console.error(err)
    }

  }
  
  return(
    <>
      {
        book.id ?
        <div className="details">
          <h2>{book.title}</h2>
          <h3>by {book.author}</h3>
          <div className="single-book-container">
            <img src={book.coverimage} />
            <article>{book.description}</article>
          </div>
          {token ? (
            available ? (
              <button onClick={reserve}>Checkout</button>
            ) : (
              <button className="na-button">Not Available</button>
            )
          ) : (
          <button>Register to Checkout</button>
        )}
        </div>
        :
        <h2>No book was found with id: "{id}". Try again.</h2>
      }
    </>
  )
}

export default SingleBook