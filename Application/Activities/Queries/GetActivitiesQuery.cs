using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivitiesQuery : IRequest<List<Activity>>
{
}

public class GetActivitiesQueryHandler : IRequestHandler<GetActivitiesQuery, List<Activity>>
{
    private readonly AppDbContext _context;

    public GetActivitiesQueryHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Activity>> Handle(GetActivitiesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Activities.ToListAsync(cancellationToken);
    }
}
