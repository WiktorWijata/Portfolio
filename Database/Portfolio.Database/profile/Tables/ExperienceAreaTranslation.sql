CREATE TABLE [profile].[ExperienceAreaTranslation]
(
	[ExperienceAreaId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Title]				NVARCHAR(200)		NOT NULL,

	CONSTRAINT [PK_ExperienceAreaTranslation] PRIMARY KEY ([ExperienceAreaId], [LanguageCode]),
	CONSTRAINT [FK_ExperienceAreaTranslation_ExperienceArea] FOREIGN KEY ([ExperienceAreaId]) REFERENCES [profile].[ExperienceArea] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceAreaTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
