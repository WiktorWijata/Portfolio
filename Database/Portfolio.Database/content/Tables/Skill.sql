CREATE TABLE [content].[Skill]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]			UNIQUEIDENTIFIER	NOT NULL,
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[Name]				NVARCHAR(200)		NOT NULL,
	[ImageUrl]			NVARCHAR(500)		NULL,
	[Order]				INT					NULL,

	CONSTRAINT [FK_Skill_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id]),
	CONSTRAINT [FK_Skill_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [content].[SkillCategory] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Skill_ContentId] ON [content].[Skill] ([ContentId])
GO

CREATE NONCLUSTERED INDEX [IX_Skill_SkillCategoryId] ON [content].[Skill] ([SkillCategoryId])
