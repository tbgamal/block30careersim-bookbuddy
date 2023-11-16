/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/'

function Account ({ 
  token, setToken, user, setUser, available, setAvailable, returned, setReturned, resBooks, setResBooks 
}) {

  useEffect(() => {
    if (token){
      fetchUser();
      fetchReservations()
    }
  }, [token])
  
  async function fetchUser() {
    let response = await fetch (`${API}users/me`, 
      {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      })

      let json = await response.json()
      console.log('Authentication', json)
      setUser(json)
      console.log(user.books)
  }

  async function fetchReservations () {
    let response = await fetch (`${API}reservations`, 
    {
      method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : `Bearer ${token}`
        }
    })
    let json = await response.json() 
    setResBooks(json.reservation)
    console.log(resBooks)
  }

  async function returnBook(id) {
    let response = await fetch (`${API}reservations/${ id }`, {
      method: "DELETE",
      headers:{
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      },
    })
    let json = await response.json()
    console.log(json)
    fetchReservations()
  }

  if (token) {
  return (
    <>
      <h1>Welcome {user.firstname} {user.lastname}</h1>
      <h2>{user.email}</h2>
      <br />
      <ul>
      {
        resBooks.length ?
        resBooks.map(book => {
          return (
            <li key={book.id}>
              <h3>{book.title} by {book.author}</h3>
              <button onClick={() => returnBook(book.id)}>Return Book</button>
            </li>
          )
        })
        :
        <h3>No books borrowed</h3>
      }
      </ul>
    </>
  )}
  else return <h1>please login</h1>
}

export default Account