using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(string id)
    {
        var activity = await context.Activities.FindAsync(id);

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }

    [HttpPost]
    public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
    {
        context.Activities.Add(activity);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetActivity), new { id = activity.id }, activity);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateActivity(string id, Activity activity)
    {
        if (id != activity.id)
        {
            return BadRequest();
        }

        context.Entry(activity).State = EntityState.Modified;

        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ActivityExists(id))
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteActivity(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null)
        {
            return NotFound();
        }

        context.Activities.Remove(activity);
        await context.SaveChangesAsync();

        return NoContent();
    }

    private bool ActivityExists(string id)
    {
        return context.Activities.Any(e => e.id == id);
    }
}
