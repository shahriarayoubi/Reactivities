using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityQuery : IRequest<Activity?>
{
    public required Guid Id { get; set; }
}

public class GetActivityQueryHandler : IRequestHandler<GetActivityQuery, Activity?>
{
    private readonly AppDbContext _context;

    public GetActivityQueryHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Activity?> Handle(GetActivityQuery request, CancellationToken cancellationToken)
    {
        return await _context.Activities
            .FirstOrDefaultAsync(x => x.id == request.Id, cancellationToken);
    }
}
