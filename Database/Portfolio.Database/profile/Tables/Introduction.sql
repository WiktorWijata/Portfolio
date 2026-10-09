CREATE TABLE [profile].[Introduction]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,

	CONSTRAINT [FK_Introduction_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_Introduction_ProfileId] ON [profile].[Introduction] ([ProfileId])
