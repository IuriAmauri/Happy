using api.Dtos;
using api.Entities;
using AutoMapper;

namespace api.Profiles
{
    public class HappyProfile : Profile
    {
        public HappyProfile()
        {
            CreateMap<Orphanage, OrphanageDto>().ReverseMap();
            CreateMap<OrphanageImage, OrphanageImageDto>().ReverseMap();
        }
    }
}