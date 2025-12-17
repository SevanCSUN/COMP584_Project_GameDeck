using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameDeckModel;

namespace GameDeck.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameConsoleController(GameDeckContext context) : ControllerBase
    {

        // GET: api/GameConsole
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GameConsole>>> GetConsoles()
        {
            return await context.GameConsoles.OrderBy(c => c.Name).ToListAsync();
        }

        // GET: api/Console/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameConsole>> GetConsole(int id)
        {
            var gameConsole = await context.GameConsoles.FindAsync(id);
            
            if (gameConsole == null)
            {
                return NotFound();
            }

            return gameConsole;
        }

        // POST: api/Console
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GameConsole>> PostConsole(GameConsole console)
        {
            context.GameConsoles.Add(console);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetConsole", new { id = console.Id }, console);
        }

        // PUT: api/Console/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsole(int id, GameConsole gameConsole)
        {
            if (id != gameConsole.Id)
            {
                return BadRequest();
            }

            context.Entry(gameConsole).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Console/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsole(int id)
        {
            var console = await context.GameConsoles.FindAsync(id);
            if (console == null)
            {
                return NotFound();
            }

            context.GameConsoles.Remove(console);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConsoleExists(int id)
        {
            return context.GameConsoles.Any(e => e.Id == id);
        }
    }
}

