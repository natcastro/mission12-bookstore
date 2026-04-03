    import { useEffect, useState } from 'react'
    import { useNavigate, useParams } from 'react-router-dom'

    // This page is used for both adding and editing books
    function BookForm() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn, setIsbn] = useState('')
    const [classification, setClassification] = useState('')
    const [pageCount, setPageCount] = useState(0)
    const [price, setPrice] = useState(0)

    // If there is an id, load the book for editing
    useEffect(() => {
        if (id) {
        fetch(`http://localhost:5037/api/books/${id}`)
            .then((res) => res.json())
            .then((data) => {
            setTitle(data.title)
            setAuthor(data.author)
            setPublisher(data.publisher)
            setIsbn(data.isbn)
            setClassification(data.classification)
            setPageCount(data.pageCount)
            setPrice(data.price)
            })
            .catch((error) => console.log('Error loading book:', error))
        }
    }, [id])

    // Save form data
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const bookData = {
        title,
        author,
        publisher,
        isbn,
        classification,
        pageCount,
        price,
        }

        if (id) {
        fetch(`http://localhost:5037/api/books/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        }).then(() => navigate('/adminbooks'))
        } else {
        fetch('http://localhost:5037/api/books', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        }).then(() => navigate('/adminbooks'))
        }
    }

    return (
        <div className="container mt-4">
        <h1 className="mb-3">{id ? 'Edit Book' : 'Add Book'}</h1>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="mb-3">
            <label className="form-label">Author</label>
            <input className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </div>

            <div className="mb-3">
            <label className="form-label">Publisher</label>
            <input className="form-control" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
            </div>

            <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input className="form-control" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
            </div>

            <div className="mb-3">
            <label className="form-label">Classification</label>
            <input className="form-control" value={classification} onChange={(e) => setClassification(e.target.value)} />
            </div>

            <div className="mb-3">
            <label className="form-label">Page Count</label>
            <input
                type="number"
                className="form-control"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Price</label>
            <input
                type="number"
                step="0.01"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            </div>

            <button type="submit" className="btn btn-primary me-2">
            Save
            </button>

            <button type="button" className="btn btn-secondary" onClick={() => navigate('/adminbooks')}>
            Cancel
            </button>
        </form>
        </div>
    )
    }

    export default BookForm