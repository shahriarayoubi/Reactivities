using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivityCommand : IRequest<Activity>
{
    public required string Title { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public DateTime Date { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

public class CreateActivityCommandHandler : IRequestHandler<CreateActivityCommand, Activity>
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public CreateActivityCommandHandler(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<Activity> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
    {
        // Use AutoMapper to map from command to entity
        var activity = _mapper.Map<Activity>(request);
        
        // Generate a new ID
        activity.id = Guid.NewGuid();

        _context.Activities.Add(activity);

        await _context.SaveChangesAsync(cancellationToken);

        return activity;
    }
}
