import type { Book } from './Book'

// This defines one item in the shopping cart
export interface CartItem {
    book: Book
    quantity: number
}