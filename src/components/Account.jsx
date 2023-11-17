import { useEffect } from "react"

let API = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/'

function Account ({ 
  token, user, setUser, resBooks, setResBooks 
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
      setUser(json)
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
    fetchReservations()
  }

  if (token) {
  return (
    <>
      <h2>Welcome {user.firstname} {user.lastname}</h2>
      <h3>{user.email}</h3>
      <h3>Your Book List</h3>
      <ul className="books-container">
      {
        resBooks.length ?
        resBooks.map(book => {
          return (
            <li key={book.id}>
              <h3>{book.title} by {book.author}</h3>
              <img src={book.coverimage} />
              <button onClick={() => returnBook(book.id)}>Return Book</button>
            </li>
          )
        })
        :
        <h3 className="no-books-message">No books borrowed</h3>
      }
      </ul>
    </>
  )}
  else return <h1>please login</h1>
}

export default Account