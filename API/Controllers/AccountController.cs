

using API.DTOs;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController(SignInManager<User> signInManager) : BaseApiController
    {
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterDto registerDto)
        {
            var user = new User
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName
            };

            var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                return Ok(new
                {
                    Message = "User registered successfully",
                    User = new
                    {
                        registerDto.DisplayName,
                        registerDto.Email
                    }
                });
            }

            return BadRequest(new
            {
                Message = "User registration failed",
                Errors = result.Errors
            });
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return NoContent();
        }

        [AllowAnonymous] 
        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            if (User.Identity?.IsAuthenticated != true)
                return NoContent();

            var user = await signInManager.UserManager.GetUserAsync(User);
            
            if (user == null)
                return NoContent();

            return Ok(new {
                DisplayName = user.DisplayName,
                Email = user.Email,
                Id = user.Id,
                ImageUrl = user.ImageUrl ?? ""
            });
        }
    }
}
