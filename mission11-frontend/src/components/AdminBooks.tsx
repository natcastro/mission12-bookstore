    import { useEffect, useState } from 'react'
    import { Link } from 'react-router-dom'
    import type { Book } from '../types/Book'

    // This page shows all books for admin actions
    function AdminBooks() {
    // Stores all books
    const [books, setBooks] = useState<Book[]>([])

    // Load all books from the API
    function loadBooks() {
        fetch('https://library-nat-bqhzdkbpa0g9hegy.westus2-01.azurewebsites.net/api/books/all')
        .then((res) => res.json())
        .then((data) => setBooks(data))
        .catch((error) => console.log('Error loading admin books:', error))
    }

    // Load books when page starts
    useEffect(() => {
        loadBooks()
    }, [])

    // Delete a book, then refresh the table
    function deleteBook(id: number) {
        fetch(`https://library-nat-bqhzdkbpa0g9hegy.westus2-01.azurewebsites.net/api/books/${id}`, {
        method: 'DELETE',
        }).then(() => loadBooks())
    }

    return (
        <div className="container mt-4">
        <h1 className="mb-3">Admin Books</h1>

        <Link to="/addbook" className="btn btn-success mb-3">
            Add New Book
        </Link>

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
                <th>Actions</th>
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
                    <Link to={`/editbook/${b.bookId}`} className="btn btn-primary btn-sm me-2">
                    Edit
                    </Link>

                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBook(b.bookId)}
                    >
                    Delete
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
    }

    export default AdminBooks