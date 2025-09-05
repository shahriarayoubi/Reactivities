using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await mediator.Send(new GetActivitiesQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid id)
    {
        var activity = await mediator.Send(new GetActivityQuery { Id = id });

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(CreateActivityCommand command)
    {
        var createdActivity = await mediator.Send(command);
        return CreatedAtAction(nameof(GetActivity), new { id = createdActivity.id }, createdActivity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(Guid id, UpdateActivityCommand command)
    {
        command.Id = id; // Set the ID from the route parameter
        
        try
        {
            var updatedActivity = await mediator.Send(command);
            return Ok(updatedActivity);
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        try
        {
            await mediator.Send(new DeleteActivityCommand { Id = id });
            return NoContent();
        }
        catch (KeyNotFoundException)
        {
            return NotFound();
        }
    }
}
