using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class UpdateActivityCommand : IRequest<Activity>
{
    public Guid Id { get; set; }
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public DateTime Date { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

public class UpdateActivityCommandHandler : IRequestHandler<UpdateActivityCommand, Activity>
{
    private readonly AppDbContext _context;

    public UpdateActivityCommandHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Activity> Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities.FirstOrDefaultAsync(x => x.id == request.Id, cancellationToken);

        if (activity == null)
        {
            throw new KeyNotFoundException($"Activity with id {request.Id} was not found");
        }

        // Manually update the properties to ensure EF tracks changes
        activity.Title = request.Title;
        activity.Description = request.Description;
        activity.Category = request.Category;
        activity.Date = request.Date;
        activity.City = request.City;
        activity.Venue = request.Venue;
        activity.Latitude = request.Latitude;
        activity.Longitude = request.Longitude;

        await _context.SaveChangesAsync(cancellationToken);

        return activity;
    }
}
