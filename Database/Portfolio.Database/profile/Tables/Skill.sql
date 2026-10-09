CREATE TABLE [profile].[Skill]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]			UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]		UNIQUEIDENTIFIER	NOT NULL,
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]				INT					NOT NULL DEFAULT 0,

	CONSTRAINT [UQ_Skill_Profile_Technology] UNIQUE ([ProfileId], [TechnologyId]),
	CONSTRAINT [FK_Skill_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id]),
	CONSTRAINT [FK_Skill_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id]),
	CONSTRAINT [FK_Skill_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [profile].[SkillCategory] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Skill_TechnologyId] ON [profile].[Skill] ([TechnologyId])
GO

CREATE NONCLUSTERED INDEX [IX_Skill_SkillCategoryId] ON [profile].[Skill] ([SkillCategoryId])
