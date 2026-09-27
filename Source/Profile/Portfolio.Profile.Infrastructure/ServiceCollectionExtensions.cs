using Microsoft.Extensions.DependencyInjection;
using Portfolio.Profile.Contracts;
using Portfolio.Profile.Application;
using Portfolio.Profile.Application.QueryHandlers;
using Portfolio.Profile.Domain;
using Portfolio.Profile.Domain.Repositories;
using Portfolio.Profile.Persistence;
using Portfolio.Profile.Persistence.Repositories;

namespace Portfolio.Profile.Infrastructure;

public static class ServiceCollectionExtensions
{
    public static void AddProfile(this IServiceCollection services, string connectionString)
    {
        services.AddProfileMediatR<ProfileDbContext>(typeof(GetLanguagesQueryHandler).Assembly);
        services.AddEntityFramework(connectionString);
        services.AddScoped<IProfileRepository, ProfileRepository>();
        services.AddScoped<ICurrentTenant, CurrentTenant>();
        services.AddScoped<IIntroductionRepository, IntroductionRepository>();
        services.AddScoped<ITechnologyRepository, TechnologyRepository>();
        services.AddScoped<IEmployerRepository, EmployerRepository>();
        services.AddScoped<IServiceRepository, ServiceRepository>();
        services.AddScoped<ISpecializationRepository, SpecializationRepository>();
        services.AddScoped<IAspirationRepository, AspirationRepository>();
        services.AddScoped<ISkillRepository, SkillRepository>();
        services.AddScoped<ISkillCategoryRepository, SkillCategoryRepository>();
        services.AddScoped<IExperienceRepository, ExperienceRepository>();
        services.AddScoped<ICertificateRepository, CertificateRepository>();
        services.AddScoped<IProjectRepository, ProjectRepository>();
        services.AddScoped<IContactRepository, ContactRepository>();
        services.AddScoped<IBusinessRepository, BusinessRepository>();
        services.AddScoped<IProfileModule, ProfileModule>();
    }
}
