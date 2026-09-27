CREATE TABLE [profile].[Certificate]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Name]			NVARCHAR(255)		NOT NULL,
	[Issuer]		NVARCHAR(255)		NOT NULL,
	[IssuedOn]		DATE				NOT NULL,
	[Code]			NVARCHAR(100)		NULL,

	CONSTRAINT [FK_Certificate_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Certificate_ProfileId] ON [profile].[Certificate] ([ProfileId])
