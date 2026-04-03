import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import CartPage from './components/CartPage'
import AdminBooks from './components/AdminBooks'
import BookForm from './components/BookForm'

// Main app with routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminBooks />} />
        <Route path="/addbook" element={<BookForm />} />
        <Route path="/editbook/:id" element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App