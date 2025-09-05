using Application.Activities.Commands;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Map from CreateActivityCommand to Activity
        CreateMap<CreateActivityCommand, Activity>()
            .ForMember(dest => dest.id, opt => opt.Ignore()) // id will be generated in handler
            .ForMember(dest => dest.IsCancelled, opt => opt.MapFrom(src => false)); // default to false

        // Map from UpdateActivityCommand to Activity
        CreateMap<UpdateActivityCommand, Activity>()
            .ForMember(dest => dest.id, opt => opt.Ignore()) // don't override existing id
            .ForMember(dest => dest.IsCancelled, opt => opt.Ignore()); // don't override existing IsCancelled value
    }
}
