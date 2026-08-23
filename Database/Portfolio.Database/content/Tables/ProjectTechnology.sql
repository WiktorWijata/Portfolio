CREATE TABLE [content].[ProjectTechnology]
(
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NULL,

	CONSTRAINT [PK_ProjectTechnology] PRIMARY KEY ([ProjectId], [TechnologyId]),
	CONSTRAINT [FK_ProjectTechnology_Project] FOREIGN KEY ([ProjectId]) REFERENCES [content].[Project] ([Id]),
	CONSTRAINT [FK_ProjectTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [content].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectTechnology_TechnologyId] ON [content].[ProjectTechnology] ([TechnologyId])
