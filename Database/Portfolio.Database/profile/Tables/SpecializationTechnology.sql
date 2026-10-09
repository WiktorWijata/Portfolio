CREATE TABLE [profile].[SpecializationTechnology]
(
	[SpecializationId]	UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]		UNIQUEIDENTIFIER	NOT NULL,
	[Order]				INT					NOT NULL DEFAULT 0,

	CONSTRAINT [PK_SpecializationTechnology] PRIMARY KEY ([SpecializationId], [TechnologyId]),
	CONSTRAINT [FK_SpecializationTechnology_Specialization] FOREIGN KEY ([SpecializationId]) REFERENCES [profile].[Specialization] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_SpecializationTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_SpecializationTechnology_TechnologyId] ON [profile].[SpecializationTechnology] ([TechnologyId])
