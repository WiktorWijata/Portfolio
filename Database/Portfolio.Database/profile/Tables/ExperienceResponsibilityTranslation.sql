CREATE TABLE [profile].[ExperienceResponsibilityTranslation]
(
	[ExperienceResponsibilityId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]					NVARCHAR(10)		NOT NULL,
	[Description]					NVARCHAR(1000)		NOT NULL,

	CONSTRAINT [PK_ExperienceResponsibilityTranslation] PRIMARY KEY ([ExperienceResponsibilityId], [LanguageCode]),
	CONSTRAINT [FK_ExperienceResponsibilityTranslation_ExperienceResponsibility] FOREIGN KEY ([ExperienceResponsibilityId]) REFERENCES [profile].[ExperienceResponsibility] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceResponsibilityTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
