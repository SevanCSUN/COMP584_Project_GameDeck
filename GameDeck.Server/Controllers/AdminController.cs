using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using GameDeck.Server.DTOs;
using System.IdentityModel.Tokens.Jwt;
using GameDeckModel;

namespace GameDeck.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController(UserManager<GameDeckUsers> userManager, JwtHandler jwtHandler) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            GameDeckUsers? gameDeckUser = await userManager.FindByNameAsync(loginRequest.Username);

            if (gameDeckUser == null)
            {
                return Unauthorized("Invalid username");
            }

            bool loginStatus = await userManager.CheckPasswordAsync(gameDeckUser, loginRequest.Password);
            if (!loginStatus)
            {
                return Unauthorized("Invalid password");
            }

            JwtSecurityToken token = await jwtHandler.GenerateTokenAsync(gameDeckUser);

            string stringToken = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new LoginResponse
            {
                Success = true,
                Message = "Login successful",
                Token = stringToken
            });

        }
    }
}

