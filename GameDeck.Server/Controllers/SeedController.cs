using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GameDeckModel;

namespace GameDeck.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController(
        RoleManager<IdentityRole> roleManager,
        UserManager<GameDeckUsers> userManager,
        IConfiguration configuration
        ) : ControllerBase
    {
        [HttpPost("Users")]
        public async Task<ActionResult> PostUsers()
        {
            string administrator = "administrator";
            string registeredUser = "registeredUser";

            if (!await roleManager.RoleExistsAsync(administrator))
            {
                await roleManager.CreateAsync(new IdentityRole(administrator));
            }

            if (!await roleManager.RoleExistsAsync(registeredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(registeredUser));
            }

            // Create admin user if not exists
            GameDeckUsers? existingAdmin = await userManager.FindByNameAsync("admin");
            if (existingAdmin == null)
            {
                GameDeckUsers adminUser = new()
                {
                    UserName = "admin",
                    Email = "admin@example.com",
                    EmailConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                await userManager.CreateAsync(adminUser, configuration["DefaultPasswords:admin"]!);
                await userManager.AddToRoleAsync(adminUser, administrator);
            }

            // Create regular user if not exists
            GameDeckUsers? existingUser = await userManager.FindByNameAsync("user");
            if (existingUser == null)
            {
                GameDeckUsers regularUser = new()
                {
                    UserName = "user",
                    Email = "user@example.com",
                    EmailConfirmed = true,
                    LockoutEnabled = false,
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                await userManager.CreateAsync(regularUser, configuration["DefaultPasswords:user"]!);
                await userManager.AddToRoleAsync(regularUser, registeredUser);
            }

            return Ok();
        }
    }
}


