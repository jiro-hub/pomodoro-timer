using Microsoft.AspNetCore.Mvc;
using Pomodoro.Model;
using PomodoroApp.Api.Data;

namespace PomodoroApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PomodoroController : ControllerBase
    {
        private readonly PomodoroDbContext _context;

        public PomodoroController(PomodoroDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetSessions()
        {
            return Ok(_context.PomodoroSessions.ToList());
        }

        [HttpPost]
        public IActionResult AddSession([FromBody] PomodoroSession session)
        {
            _context.PomodoroSessions.Add(session);
            _context.SaveChanges();
            return Ok(session);
        }
    }
}
