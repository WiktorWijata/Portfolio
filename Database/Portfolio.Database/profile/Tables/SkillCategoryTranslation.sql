CREATE TABLE [profile].[SkillCategoryTranslation]
(
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Name]				NVARCHAR(200)		NOT NULL,

	CONSTRAINT [PK_SkillCategoryTranslation] PRIMARY KEY ([SkillCategoryId], [LanguageCode]),
	CONSTRAINT [FK_SkillCategoryTranslation_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [profile].[SkillCategory] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_SkillCategoryTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
