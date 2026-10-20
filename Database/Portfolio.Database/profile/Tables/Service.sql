CREATE TABLE [profile].[Service]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[IconSlug]		NVARCHAR(100)		NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Service_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Service_ProfileId] ON [profile].[Service] ([ProfileId])
