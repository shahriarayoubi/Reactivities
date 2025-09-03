using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class HealthController : BaseApiController
{
    [HttpGet]
    public IActionResult GetHealth()
    {
        return Ok(new { 
            status = "Healthy", 
            timestamp = DateTime.UtcNow,
            version = "1.0.0"
        });
    }
}
