CREATE TABLE [content].[ExperienceTechnology]
(
	[ExperienceId]	UNIQUEIDENTIFIER NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER NOT NULL,

	CONSTRAINT [PK_ExperienceTechnology] PRIMARY KEY ([ExperienceId], [TechnologyId]),
	CONSTRAINT [FK_ExperienceTechnology_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [content].[Experience] ([Id]),
	CONSTRAINT [FK_ExperienceTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [content].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceTechnology_TechnologyId] ON [content].[ExperienceTechnology] ([TechnologyId])
