CREATE TABLE [profile].[ProjectArchitectureNote]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProjectId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]		INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_ProjectArchitectureNote_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectArchitectureNote_ProjectId] ON [profile].[ProjectArchitectureNote] ([ProjectId])
