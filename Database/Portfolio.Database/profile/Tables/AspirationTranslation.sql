CREATE TABLE [profile].[AspirationTranslation]
(
	[AspirationId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]	NVARCHAR(10)		NOT NULL,
	[Text]			NVARCHAR(500)		NOT NULL,

	CONSTRAINT [PK_AspirationTranslation] PRIMARY KEY ([AspirationId], [LanguageCode]),
	CONSTRAINT [FK_AspirationTranslation_Aspiration] FOREIGN KEY ([AspirationId]) REFERENCES [profile].[Aspiration] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_AspirationTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
