import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CartItem } from '../types/CartItem'

// This page shows all items currently in the cart
function CartPage() {
  // Stores cart items
  const [cart] = useState<CartItem[]>(() => {
    try {
      const savedCart = sessionStorage.getItem('cart')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from sessionStorage:', error)
      return []
    }
  })

  // Lets me move between pages
    const navigate = useNavigate()

    // Total cost of everything in the cart
    const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0)

    // Go back to shopping page
    function continueShopping() {
        navigate('/')
    }

    return (
        <div className="container mt-4">
        <h1 className="mb-3">Your Cart</h1>
        <p className="mb-4">These are the books you added during this session.</p>

        <table className="table table-striped table-bordered">
            <thead className="table-dark">
            <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
            </thead>

            <tbody>
            {cart.map((item) => (
                <tr key={item.book.bookId}>
                <td>{item.book.title}</td>
                <td>${item.book.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.book.price * item.quantity).toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <h4 className="mb-3">Total: ${total.toFixed(2)}</h4>

        <button className="btn btn-primary" onClick={continueShopping}>
            Continue Shopping
        </button>
        </div>
    )
    }

export default CartPage