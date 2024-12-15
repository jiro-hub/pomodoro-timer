namespace Pomodoro.Model
{
    public class PomodoroSession
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public required string SessionType { get; set; } // "Work" or "Break"
    }

}
