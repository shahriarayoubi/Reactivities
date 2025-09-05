using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivityCommand : IRequest<Unit>
{
    public Guid Id { get; set; }
}

public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommand, Unit>
{
    private readonly AppDbContext _context;

    public DeleteActivityCommandHandler(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = await _context.Activities.FindAsync(request.Id);

        if (activity == null)
        {
            throw new KeyNotFoundException($"Activity with id {request.Id} was not found");
        }

        _context.Activities.Remove(activity);
        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}
