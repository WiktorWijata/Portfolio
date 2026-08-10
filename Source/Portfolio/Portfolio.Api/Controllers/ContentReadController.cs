using Microsoft.AspNetCore.Mvc;
using RescuePC.Portfolio.Api.Contracts;

namespace RescuePC.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContentReadController : ControllerBase
    {
        [HttpGet("content")]
        [ProducesResponseType(typeof(ContentDto), 200)]
        public IActionResult GetContent(string languageCode)
        {
            return this.Ok(new ContentDto());
        }
    }
}
