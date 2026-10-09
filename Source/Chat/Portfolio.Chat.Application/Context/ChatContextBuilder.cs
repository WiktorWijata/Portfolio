using System.Text;
using RescuePC.Portfolio.BuildingBlocks.Application;

namespace Portfolio.Chat.Application.Context;

/// <summary>
/// Builds the assistant's context by running every tool that needs no arguments and putting its result in front of
/// the model. This is how the assistant gets "everything" before it can call tools itself on demand.
/// </summary>
public sealed class ChatContextBuilder : IChatContextBuilder
{
    private readonly IChatToolRegistry _registry;
    private readonly IChatToolRunner _runner;
    private readonly ICallerContext _callerContext;

    public ChatContextBuilder(IChatToolRegistry registry, IChatToolRunner runner, ICallerContext callerContext)
    {
        _registry = registry;
        _runner = runner;
        _callerContext = callerContext;
    }

    public async Task<ChatContextDefinition> BuildAsync(CancellationToken cancellationToken = default)
    {
        var languageCode = _callerContext.LanguageCode;
        var behavior = ChatBehaviors.For(languageCode);

        var data = new StringBuilder(behavior.DataIntro);

        // Tools that need an argument cannot be answered in advance; the model will call those itself.
        foreach (var tool in _registry.Tools.Where(t => t.Parameters.All(p => !p.Required)).OrderBy(t => t.Name, StringComparer.Ordinal))
        {
            var json = await _runner.ExecuteAsync(tool.Name, argumentsJson: null, cancellationToken);

            // Explicit "\n": AppendLine would use the platform's newline and make the context differ between Windows and Linux.
            data.Append("\n\n## ").Append(tool.Description).Append('\n').Append(json);
        }

        return new ChatContextDefinition
        {
            LanguageCode = languageCode,
            Name = behavior.Name,
            SystemRole = behavior.SystemRole,
            DomainContext = data.ToString().TrimEnd(),
            DecisionPolicy = behavior.DecisionPolicy,
            OperatingRules = string.Join("\n", behavior.OperatingRules.Select(rule => $"- {rule}")),
            OutputFormat = behavior.OutputFormat,
            Examples = behavior.Examples,
        };
    }
}
