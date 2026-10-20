CREATE TABLE [profile].[Contact]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER NOT NULL,
	[Type]			NVARCHAR(50) NOT NULL,
	[Value]			NVARCHAR(500) NOT NULL,

	CONSTRAINT [FK_Contact_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Contact_ProfileId] ON [profile].[Contact] ([ProfileId])
