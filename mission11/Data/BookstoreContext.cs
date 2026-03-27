using Microsoft.EntityFrameworkCore;
using mission11.Models;

namespace mission11.Data;

// Connects the app to the database
public class BookstoreContext : DbContext
{
    public BookstoreContext(DbContextOptions<BookstoreContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
}