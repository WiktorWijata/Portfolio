using Portfolio.Content.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts;
using RescuePC.Portfolio.Api.Contracts.Models;

namespace RescuePC.Portfolio.Api.Mappings;

public static class ContentResponseMapping
{
    extension(ContentDto content)
    {
        public ContentResponse ToResponse()
        {
            if (content == null)
            {
                return null;
            }

            return new ContentResponse
            {
                Language = content.Language == null
                    ? null
                    : new Language
                    {
                        Code = content.Language.Code,
                        Name = content.Language.Name
                    },
                Hero = content.Hero == null
                    ? null
                    : new Hero
                    {
                        Motto = content.Hero.Motto,
                        AboutMe = content.Hero.AboutMe == null
                            ? null
                            : new AboutMe
                            {
                                Title = content.Hero.AboutMe.Title,
                                Greeting = content.Hero.AboutMe.Header,
                                Description = content.Hero.AboutMe.Description
                            }
                    },
                SkillsCategories = content.SkillsCategories?.Select(sc => new SkillCategory
                {
                    Name = sc.Name,
                    Skills = sc.Skills?.Select(s => new Skill
                    {
                        Name = s.Name,
                        ImageUrl = s.ImageUrl
                    }).ToArray()
                }).ToArray(),
                Projects = content.Projects?.Select(p => new Project
                {
                    Title = p.Title,
                    Description = p.Description,
                    ImageUrl = p.ImageUrl,
                    CodeUrl = p.CodeUrl,
                    DemoUrl = p.DemoUrl,
                    Technologies = p.Technologies
                }).ToArray(),
                Experiences = content.Experiences?.Select(e => new Experience
                {
                    Company = e.Company,
                    Position = e.Position,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate,
                    Description = e.Description,
                    Achivements = e.Achievements,
                    Technologies = e.Technologies
                }).ToArray(),
                Educations = content.Educations?.Select(e => new Education
                {
                    Institution = e.Institution,
                    Degree = e.Degree,
                    Field = e.Field,
                    StartDate = e.StartDate,
                    EndDate = e.EndDate
                }).ToArray(),
                Facts = content.Facts?.Select(f => new Fact
                {
                    Title = f.Title,
                    Description = f.Description,
                    Icon = f.Icon
                }).ToArray(),
                Contacts = content.Contacts?.Select(c => new Contact
                {
                    Type = c.Type,
                    Value = c.Value,
                    IsExternal = c.IsExternal
                }).ToArray()
            };
        }
    }
}
