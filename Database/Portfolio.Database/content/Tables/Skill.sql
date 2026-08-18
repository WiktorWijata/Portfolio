CREATE TABLE [content].[Skill]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]			UNIQUEIDENTIFIER	NOT NULL,
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[Name]				NVARCHAR(200)		NOT NULL,
	[ImageUrl]			NVARCHAR(500)		NULL,

	CONSTRAINT [FK_Skill_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id]),
	CONSTRAINT [FK_Skill_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [content].[SkillCategory] ([Id])
)
