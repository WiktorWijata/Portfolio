CREATE TABLE [profile].[ExperienceTechnology]
(
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [PK_ExperienceTechnology] PRIMARY KEY ([ExperienceId], [TechnologyId]),
	CONSTRAINT [FK_ExperienceTechnology_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [profile].[Experience] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceTechnology_TechnologyId] ON [profile].[ExperienceTechnology] ([TechnologyId])
