using System.Text;
using IntegratorAI.Api.Contracts.Context;
using IntegratorAI.Api.Contracts.Context.Models;
using MediatR;
using Portfolio.Chat.Application.Queries;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application.QueryHandlers;

/// <summary>
/// Builds the assistant's context by running every tool that needs no arguments and putting its result in front of
/// the model. This is how the assistant gets "everything" before it can call tools itself on demand.
/// </summary>
public class BuildChatContextQueryHandler : IRequestHandler<BuildChatContextQuery, ContextRequest>
{
    private readonly IChatToolRegistry _registry;
    private readonly IChatToolRunner _runner;
    private readonly ICallerContext _callerContext;

    public BuildChatContextQueryHandler(IChatToolRegistry registry, IChatToolRunner runner, ICallerContext callerContext)
    {
        _registry = registry;
        _runner = runner;
        _callerContext = callerContext;
    }

    public async Task<ContextRequest> Handle(BuildChatContextQuery request, CancellationToken cancellationToken)
    {
        var languageCode = _callerContext.LanguageCode;
        var instructions = ChatInstructions.For(languageCode);

        var data = new StringBuilder(instructions.DataIntro);

        // Tools that need an argument cannot be answered in advance; the model will call those itself.
        foreach (var tool in _registry.Tools.Where(t => !t.NeedsArguments).OrderBy(t => t.Name, StringComparer.Ordinal))
        {
            var json = await _runner.ExecuteAsync(tool.Name, argumentsJson: null, cancellationToken);

            // Explicit "\n": AppendLine would use the platform's newline and make the context differ between Windows and Linux.
            data.Append("\n\n## ").Append(instructions.DescribeTool(tool.Name, languageCode)).Append('\n').Append(json);
        }

        return new ContextRequest
        {
            Name = instructions.Name,
            SystemRole = instructions.SystemRole,
            DomainContext = data.ToString().TrimEnd(),
            DecisionPolicy = instructions.DecisionPolicy,
            OperatingRules = string.Join("\n", instructions.OperatingRules.Select(rule => $"- {rule}")),
            OutputFormat = instructions.OutputFormat,
            Examples = instructions.Examples,

            // Every tool is declared, so IntegratorAI knows what the assistant can ask for. The data of the tools without
            // arguments is also in the context above until IntegratorAI can call tools. IntegratorAI does not accept
            // null for the lists of a tool.
            Tools = _registry.Tools
                .OrderBy(t => t.Name, StringComparer.Ordinal)
                .Select(t => new Tool
                {
                    Name = t.Name,
                    Description = instructions.DescribeTool(t.Name, languageCode),
                    Parameters = t.Parameters.Select(p => new ToolParameter { Name = p.Name, Type = p.Type, Description = p.Description }).ToArray(),
                    Guardrails = [],
                })
                .ToArray(),
        };
    }
}
