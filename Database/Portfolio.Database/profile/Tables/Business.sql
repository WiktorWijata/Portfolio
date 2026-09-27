CREATE TABLE [profile].[Business]
(
	[Id]					UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]				UNIQUEIDENTIFIER	NOT NULL,
	[Name]					NVARCHAR(255)		NOT NULL,
	[TaxNumber]				NVARCHAR(50)		NULL,
	[RegistrationNumber]	NVARCHAR(50)		NULL,
	[Street]				NVARCHAR(255)		NOT NULL,
	[PostalCode]			NVARCHAR(20)		NOT NULL,
	[City]					NVARCHAR(100)		NOT NULL,
	[Region]				NVARCHAR(100)		NULL,

	CONSTRAINT [FK_Business_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_Business_ProfileId] ON [profile].[Business] ([ProfileId])
