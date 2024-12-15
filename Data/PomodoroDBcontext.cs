using Microsoft.EntityFrameworkCore;
using Pomodoro.Model;

namespace PomodoroApp.Api.Data
{
    public class PomodoroDbContext : DbContext
    {
        public PomodoroDbContext(DbContextOptions<PomodoroDbContext> options)
            : base(options)
        {
        }

        public DbSet<PomodoroSession> PomodoroSessions { get; set; }
    }
}
