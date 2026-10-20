using Portfolio.Profile.Contracts.Models;
using MediatR;

namespace Portfolio.Profile.Application.Queries;

public class GetProjectsQuery : IRequest<IEnumerable<ProjectDto>>
{ }
