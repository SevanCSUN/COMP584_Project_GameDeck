using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GameDeck.Server.DTOs;
using GameDeckModel;

namespace GameDeck.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController(GameDeckContext context) : ControllerBase
    {

        // GET: api/Game
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameDto>>> GetGames([FromQuery] int? platformId = null)
        {
            var query = context.Games.AsQueryable();
            
            if (platformId.HasValue)
            {
                query = query.Where(g => g.PlatformId == platformId.Value);
            }

            return await query
                .OrderBy(g => g.Title)
                .Select(g => new GameDto
                {
                    id = g.Id,
                    platformId = g.PlatformId,
                    platformName = g.Platform.Name,
                    title = g.Title,
                    releaseDate = g.ReleaseDate,
                    genre = g.Genre,
                    developer = g.Developer,
                    description = g.Description,
                    numPlayers = g.NumPlayers
                })
                .ToListAsync();
        }

        // GET: api/Game/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameDto>> GetGame(int id)
        {
            var game = await context.Games
                .Where(g => g.Id == id)
                .Select(g => new GameDto
                {
                    id = g.Id,
                    platformId = g.PlatformId,
                    platformName = g.Platform.Name,
                    title = g.Title,
                    releaseDate = g.ReleaseDate,
                    genre = g.Genre,
                    developer = g.Developer,
                    description = g.Description,
                    numPlayers = g.NumPlayers
                })
                .FirstOrDefaultAsync();
            
            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        // POST: api/Game
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(Game game)
        {
            // Verify that the PlatformId exists
            if (!await context.GameConsoles.AnyAsync(c => c.Id == game.PlatformId))
            {
                return BadRequest("Invalid PlatformId. The specified console does not exist.");
            }

            context.Games.Add(game);
            await context.SaveChangesAsync();

            return CreatedAtAction("GetGame", new { id = game.Id }, game);
        }

        // PUT: api/Game/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(int id, Game game)
        {
            if (id != game.Id)
            {
                return BadRequest();
            }

            // Verify that the PlatformId exists
            if (!await context.GameConsoles.AnyAsync(c => c.Id == game.PlatformId))
            {
                return BadRequest("Invalid PlatformId. The specified console does not exist.");
            }

            context.Entry(game).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            var game = await context.Games.FindAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            context.Games.Remove(game);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool GameExists(int id)
        {
            return context.Games.Any(e => e.Id == id);
        }
    }
}

