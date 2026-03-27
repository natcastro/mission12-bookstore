// This defines what a Book object looks like coming from the API
export interface Book {
    bookId: number
    title: string
    author: string
    publisher: string
    isbn: string
    classification: string
    pageCount: number
    price: number
  }