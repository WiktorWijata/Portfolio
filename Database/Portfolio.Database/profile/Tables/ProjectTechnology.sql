CREATE TABLE [profile].[ProjectTechnology]
(
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [PK_ProjectTechnology] PRIMARY KEY ([ProjectId], [TechnologyId]),
	CONSTRAINT [FK_ProjectTechnology_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectTechnology_TechnologyId] ON [profile].[ProjectTechnology] ([TechnologyId])
