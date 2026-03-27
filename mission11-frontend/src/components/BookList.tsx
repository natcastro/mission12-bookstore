import { useEffect, useState } from 'react'
import type { Book } from '../types/Book'
import type { CartItem } from '../types/CartItem'
import { useNavigate } from 'react-router-dom'

// This component shows books with pagination, sorting, category filtering, and cart summary
function BookList() {
  console.log('BookList component rendering')

  // Stores the books from the API
  const [books, setBooks] = useState<Book[]>([])

  // Stores all available categories
  const [categories, setCategories] = useState<string[]>([])

  // Stores items added to the cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const savedCart = sessionStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from sessionStorage:', error)
      return []
    }
  })

  // Current page number
  const [pageNum, setPageNum] = useState(1)

  // How many books per page
  const [pageSize, setPageSize] = useState(5)

  // Total number of books after filtering
  const [totalNumBooks, setTotalNumBooks] = useState(0)

  // Sorting order for title
  const [sortOrder, setSortOrder] = useState('asc')

  // Category selected by the user
  const [selectedCategory, setSelectedCategory] = useState('All')

  const navigate = useNavigate()

  // Load categories one time when the page starts
  useEffect(() => {
    console.log('Loading categories...')
    fetch('http://localhost:5037/api/books/categories')
      .then((res) => res.json())
      .then((data) => {
        console.log('Categories loaded:', data)
        setCategories(['All', ...data])
      })
      .catch((error) => console.log('Error loading categories:', error))
  }, [])

  // Load books every time page number, page size, sort order, or category changes
  useEffect(() => {
    console.log('Loading books with params:', { pageNum, pageSize, sortOrder, selectedCategory })
    fetch(
      `http://localhost:5037/api/books?pageNum=${pageNum}&pageSize=${pageSize}&sortOrder=${sortOrder}&category=${selectedCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Books loaded:', data)
        setBooks(data.books ?? data.Books)
        setTotalNumBooks(data.totalNumBooks ?? data.TotalNumBooks)
      })
      .catch((error) => console.log('Error loading books:', error))
  }, [pageNum, pageSize, sortOrder, selectedCategory])

  // Save cart every time it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Adds a book to the cart
  function addToCart(book: Book) {
    const existingItem = cart.find((item) => item.book.bookId === book.bookId)

    let updatedCart: CartItem[]

    if (existingItem) {
      // If the book is already in the cart, increase quantity
      updatedCart = cart.map((item) =>
        item.book.bookId === book.bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      // If the book is not in the cart yet, add it with quantity 1
      updatedCart = [...cart, { book, quantity: 1 }]
    }

    setCart(updatedCart)
  }

  // Total number of items in the cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Total price of all books in the cart
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  )

  // Calculate total pages based on filtered results
  const totalPages = Math.ceil(totalNumBooks / pageSize)

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Online Bookstore</h1>
      <p className="mb-4">This page shows books from the bookstore database.</p>

      {/* Small cart summary at the top of the page */}
      <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>
            <strong>Cart Summary:</strong> {cartItemCount} item(s) | Total: $
            {cartTotal.toFixed(2)}
          </div>

          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate('/cart')}
          >
            View Cart
          </button>
        </div>

      {/* Controls for page size, sorting, and category filter */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label className="form-label">Results per page</label>
          <select
            className="form-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPageNum(1) // go back to page 1 when page size changes
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Sort by title</label>
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value)
              setPageNum(1) // reset page when sort changes
            }}
          >
            <option value="asc">A to Z</option>
            <option value="desc">Z to A</option>
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setPageNum(1) // reset page when category changes
            }}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table of books */}
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Add</th>
          </tr>
        </thead>

        <tbody>
          {books.map((b) => (
            <tr key={b.bookId}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => addToCart(b)}
                >
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      <div className="d-flex gap-2 align-items-center">
        <button
          className="btn btn-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        <span>
          Page {pageNum} of {totalPages || 1}
        </span>

        <button
          className="btn btn-primary"
          disabled={pageNum === totalPages || totalPages === 0}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default BookList