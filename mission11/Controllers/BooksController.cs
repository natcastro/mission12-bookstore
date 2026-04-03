using mission11.Data;
using mission11.Models;
using Microsoft.AspNetCore.Mvc;

namespace mission11.Controllers;

// Handles API requests for books
[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BooksController(BookstoreContext temp)
    {
        _context = temp;
    }

    // GET api/books?pageNum=1&pageSize=5&sortOrder=asc&category=All
    [HttpGet]
    public IActionResult GetBooks(int pageNum = 1, int pageSize = 5, string sortOrder = "asc", string category = "All")
    {
        var query = _context.Books.AsQueryable();

        if (category != "All")
        {
            query = query.Where(b => b.Classification == category);
        }

        if (sortOrder.ToLower() == "desc")
        {
            query = query.OrderByDescending(b => b.Title);
        }
        else
        {
            query = query.OrderBy(b => b.Title);
        }

        var totalNumBooks = query.Count();

        var books = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new
        {
            Books = books,
            TotalNumBooks = totalNumBooks
        });
    }

    // GET api/books/categories
    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        var categories = _context.Books
            .Select(b => b.Classification)
            .Distinct()
            .OrderBy(c => c)
            .ToList();

        return Ok(categories);
    }

    // GET api/books/all
    [HttpGet("all")]
    public IActionResult GetAllBooks()
    {
        var books = _context.Books
            .OrderBy(b => b.Title)
            .ToList();

        return Ok(books);
    }

    // GET api/books/5
    [HttpGet("{id}")]
    public IActionResult GetBook(int id)
    {
        var book = _context.Books.Find(id);

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }

    // POST api/books
    [HttpPost]
    public IActionResult AddBook([FromBody] Book newBook)
    {
        _context.Books.Add(newBook);
        _context.SaveChanges();

        return Ok(newBook);
    }

    // PUT api/books/5
    [HttpPut("{id}")]
    public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
    {
        var existingBook = _context.Books.Find(id);

        if (existingBook == null)
        {
            return NotFound();
        }

        existingBook.Title = updatedBook.Title;
        existingBook.Author = updatedBook.Author;
        existingBook.Publisher = updatedBook.Publisher;
        existingBook.Isbn = updatedBook.Isbn;
        existingBook.Classification = updatedBook.Classification;
        existingBook.PageCount = updatedBook.PageCount;
        existingBook.Price = updatedBook.Price;

        _context.SaveChanges();

        return Ok(existingBook);
    }

    // DELETE api/books/5
    [HttpDelete("{id}")]
    public IActionResult DeleteBook(int id)
    {
        var book = _context.Books.Find(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        _context.SaveChanges();

        return NoContent();
    }
}