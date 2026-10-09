CREATE TABLE [profile].[Project]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Name]			NVARCHAR(200)		NOT NULL,
	[CodeUrl]		NVARCHAR(1000)		NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Project_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Project_ProfileId] ON [profile].[Project] ([ProfileId])
