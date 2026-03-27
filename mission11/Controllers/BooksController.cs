using mission11.Data;
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

        // Filter by category if the user selected one
        if (category != "All")
        {
            query = query.Where(b => b.Classification == category);
        }

        // Sort books by title
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
}