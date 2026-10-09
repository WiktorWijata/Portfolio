using System.Text.Json;

namespace Portfolio.Chat.Application.Context;

/// <summary>Reads the behavior of the assistant for a language from the embedded JSON files.</summary>
public static class ChatBehaviors
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public static ChatBehavior For(string languageCode)
    {
        var resource = $"Portfolio.Chat.Application.Resources.behavior.{languageCode.ToLowerInvariant()}.json";

        using var stream = typeof(ChatBehaviors).Assembly.GetManifestResourceStream(resource)
            ?? throw new InvalidOperationException($"There is no assistant behavior for language '{languageCode}' (missing resource {resource}).");

        return JsonSerializer.Deserialize<ChatBehavior>(stream, JsonOptions)
            ?? throw new InvalidOperationException($"The assistant behavior resource {resource} is empty.");
    }
}
