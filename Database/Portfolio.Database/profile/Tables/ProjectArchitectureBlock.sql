CREATE TABLE [profile].[ProjectArchitectureBlock]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[ParentBlockId]	UNIQUEIDENTIFIER	NULL,
	[Order]			INT					NOT NULL DEFAULT 0,
	[Path]			NVARCHAR(500)		NULL,

	CONSTRAINT [FK_ProjectArchitectureBlock_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectArchitectureBlock_Parent] FOREIGN KEY ([ParentBlockId]) REFERENCES [profile].[ProjectArchitectureBlock] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectArchitectureBlock_ProjectId] ON [profile].[ProjectArchitectureBlock] ([ProjectId])
GO

CREATE NONCLUSTERED INDEX [IX_ProjectArchitectureBlock_ParentBlockId] ON [profile].[ProjectArchitectureBlock] ([ParentBlockId])
