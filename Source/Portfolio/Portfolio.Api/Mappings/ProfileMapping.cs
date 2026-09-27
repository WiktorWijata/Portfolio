using Portfolio.Profile.Contracts.Models;
using RescuePC.Portfolio.Api.Contracts.Models;

namespace RescuePC.Portfolio.Api.Mappings;

public static class ProfileMapping
{
    extension(IntroductionDto introduction)
    {
        public Introduction ToResponse()
        {
            return new Introduction
            {
                Title = introduction.Title,
                Motto = introduction.Motto,
                Description = introduction.Description
            };
        }
    }

    extension(ServiceDto service)
    {
        public Service ToResponse()
        {
            return new Service
            {
                IconSlug = service.IconSlug,
                Title = service.Title,
                Description = service.Description
            };
        }
    }

    extension(TechnologyDto technology)
    {
        public Technology ToResponse()
        {
            return new Technology
            {
                Name = technology.Name,
                IconSource = technology.IconSource,
                IconSlug = technology.IconSlug,
                IconIsMonochrome = technology.IconIsMonochrome
            };
        }
    }

    extension(SpecializationDto specialization)
    {
        public Specialization ToResponse()
        {
            return new Specialization
            {
                Tag = specialization.Tag,
                Title = specialization.Title,
                Subtitle = specialization.Subtitle,
                Technologies = specialization.Technologies.Select(t => t.ToResponse()).ToArray()
            };
        }
    }

    extension(AspirationDto aspiration)
    {
        public Aspiration ToResponse()
        {
            return new Aspiration
            {
                Text = aspiration.Text
            };
        }
    }

    extension(SkillCategoryDto skillCategory)
    {
        public SkillCategory ToResponse()
        {
            return new SkillCategory
            {
                Name = skillCategory.Name,
                Technologies = skillCategory.Technologies.Select(t => t.ToResponse()).ToArray()
            };
        }
    }

    extension(ExperienceAreaDto area)
    {
        public ExperienceArea ToResponse()
        {
            return new ExperienceArea
            {
                Title = area.Title,
                Responsibilities = area.Responsibilities
            };
        }
    }

    extension(ExperienceDto experience)
    {
        public Experience ToResponse()
        {
            return new Experience
            {
                Employer = experience.Employer,
                Position = experience.Position,
                StartDate = experience.StartDate,
                EndDate = experience.EndDate,
                Areas = experience.Areas.Select(a => a.ToResponse()).ToArray(),
                Technologies = experience.Technologies.Select(t => t.ToResponse()).ToArray()
            };
        }
    }

    extension(CertificateDto certificate)
    {
        public Certificate ToResponse()
        {
            return new Certificate
            {
                Name = certificate.Name,
                Issuer = certificate.Issuer,
                IssuedOn = certificate.IssuedOn,
                Code = certificate.Code
            };
        }
    }

    extension(ProjectDto project)
    {
        public Project ToResponse()
        {
            return new Project
            {
                Name = project.Name,
                Description = project.Description,
                Goal = project.Goal,
                Solution = project.Solution,
                CodeUrl = project.CodeUrl,
                Technologies = project.Technologies.Select(t => t.ToResponse()).ToArray()
            };
        }
    }

    extension(ContactDto contact)
    {
        public Contact ToResponse()
        {
            return new Contact
            {
                Type = contact.Type,
                Value = contact.Value
            };
        }
    }

    extension(BusinessDto business)
    {
        public Business ToResponse()
        {
            return new Business
            {
                Name = business.Name,
                TaxNumber = business.TaxNumber,
                RegistrationNumber = business.RegistrationNumber,
                Street = business.Street,
                PostalCode = business.PostalCode,
                City = business.City,
                Region = business.Region
            };
        }
    }
}
