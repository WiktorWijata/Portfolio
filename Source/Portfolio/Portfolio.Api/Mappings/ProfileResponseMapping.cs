using Portfolio.Profile.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Contracts.Models;

namespace RescuePC.Portfolio.Api.Mappings;

public static class ProfileResponseMapping
{
    extension(ProfileDto profile)
    {
        public ProfileResponse ToResponse()
        {
            if (profile == null)
            {
                return null;
            }

            return new ProfileResponse
            {
                Language = new Language
                    {
                        Code = profile.Language.Code,
                        Name = profile.Language.Name
                    },
                Hero = new Hero
                    {
                        Motto = profile.Hero.Motto,
                        ImageUrl = profile.Hero.ImageUrl,
                        AboutMe = new AboutMe
                            {
                                Title = profile.Hero.AboutMe?.Title,
                                Greeting = profile.Hero.AboutMe?.Header,
                                Description = profile.Hero.AboutMe?.Description
                            }
                    },
                SkillsCategories = profile.SkillsCategories?.Select(sc => new SkillCategory
                {
                    Name = sc.Name,
                    Skills = sc.Skills?.Select(s => new Skill
                    {
                        Name = s.Name,
                        ImageUrl = s.ImageUrl
                    }).ToArray()
                }).ToArray(),
                Projects = profile.Projects?.Select(p => new Project
                {
                    Title = p.Title,
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    CodeUrl = p.CodeUrl,
                    DemoUrl = p.DemoUrl,
                    Technologies = p.Technologies
                }).ToArray(),
                Experiences = profile.Experiences?.Select(e => new Experience
                {
                    Company = e.Company,
                    Position = e.Position,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    Description = e.Description,
                    Achivements = e.Achievements,
                    Technologies = e.Technologies
                }).ToArray(),
                Educations = profile.Educations?.Select(e => new Education
                {
                    Institution = e.Institution,
                    Degree = e.Degree,
                    Field = e.Field,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate
                }).ToArray(),
                Facts = profile.Facts?.Select(f => new Fact
                {
                    Title = f.Title,
                    Description = f.Description,
                    ImageUrl = f.ImageUrl
                }).ToArray(),
                Contacts = profile.Contacts?.Select(c => new Contact
                {
                    Type = c.Type,
                    Value = c.Value,
                    IsExternal = c.IsExternal
                }).ToArray()
            };
        }
    }
}
