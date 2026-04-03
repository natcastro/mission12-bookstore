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
        fetch(`https://library-nat-bqhzdkbpa0g9hegy.westus2-01.azurewebsites.net/api/books/${id}`)
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
        Title: title,
        Author: author,
        Publisher: publisher,
        Isbn: isbn,
        Classification: classification,
        Category: classification,
        PageCount: pageCount,
        Price: price,
        }

        if (id) {
        fetch(`https://library-nat-bqhzdkbpa0g9hegy.westus2-01.azurewebsites.net/api/books/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        }).then((res) => {
            if (res.ok) {
                navigate('/adminbooks')
            } else {
                alert('Failed to update book')
            }
        }).catch((error) => console.log('Error updating book:', error))
        } else {
        fetch('https://library-nat-bqhzdkbpa0g9hegy.westus2-01.azurewebsites.net/api/books', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        }).then((res) => {
            if (res.ok) {
                navigate('/adminbooks')
            } else {
                alert('Failed to add book')
            }
        }).catch((error) => console.log('Error adding book:', error))
        }
    }

    return (
        <div className="container mt-4">
        <div className="bg-secondary text-white p-4 rounded mb-4">
            <h1 className="display-4">{id ? 'Edit Book' : 'Add Book'}</h1>
            <p className="lead">{id ? 'Update the book details.' : 'Enter the details for the new book.'}</p>
        </div>

        <div className="card shadow">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>

                        <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Author</label>
                        <input className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Publisher</label>
                        <input className="form-control" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
                        </div>

                        <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">ISBN</label>
                        <input className="form-control" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Classification</label>
                        <input className="form-control" value={classification} onChange={(e) => setClassification(e.target.value)} required />
                        </div>

                        <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Page Count</label>
                        <input
                            type="number"
                            className="form-control"
                            value={pageCount}
                            onChange={(e) => setPageCount(Number(e.target.value))}
                            required
                        />
                        </div>
                    </div>

                    <div className="mb-3">
                    <label className="form-label fw-bold">Price</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                    </div>

                    <div className="d-flex gap-2">
                        <button type="submit" className="btn btn-primary">
                        <i className="bi bi-check-circle"></i> Save
                        </button>

                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/adminbooks')}>
                        <i className="bi bi-x-circle"></i> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
    }

    export default BookForm