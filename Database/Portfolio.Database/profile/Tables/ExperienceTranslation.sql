CREATE TABLE [profile].[ExperienceTranslation]
(
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]	NVARCHAR(10)		NOT NULL,
	[Position]		NVARCHAR(255)		NOT NULL,

	CONSTRAINT [PK_ExperienceTranslation] PRIMARY KEY ([ExperienceId], [LanguageCode]),
	CONSTRAINT [FK_ExperienceTranslation_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [profile].[Experience] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
