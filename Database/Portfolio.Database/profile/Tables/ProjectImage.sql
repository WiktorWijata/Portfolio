CREATE TABLE [profile].[ProjectImage]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProjectId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]		INT					NOT NULL DEFAULT 0,
	[Url]		NVARCHAR(1000)		NOT NULL,

	CONSTRAINT [FK_ProjectImage_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectImage_ProjectId] ON [profile].[ProjectImage] ([ProjectId])
