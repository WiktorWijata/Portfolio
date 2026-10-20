CREATE TABLE [profile].[Aspiration]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Aspiration_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Aspiration_ProfileId] ON [profile].[Aspiration] ([ProfileId])
