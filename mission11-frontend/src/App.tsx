import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import CartPage from './components/CartPage'

// Main app with routes for shopping page and cart page
function App() {
  console.log('App component rendering')
  return (
    <div>
      <h1>App is working!</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App