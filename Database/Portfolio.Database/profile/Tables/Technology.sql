CREATE TABLE [profile].[Technology]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[Name]				NVARCHAR(200)		NOT NULL,
	[IconSource]		NVARCHAR(20)		NULL,
	[IconSlug]			NVARCHAR(100)		NULL,
	[IconIsMonochrome]	BIT					NULL,

	CONSTRAINT [UQ_Technology_Name] UNIQUE ([Name]),
	CONSTRAINT [CK_Technology_IconSource] CHECK ([IconSource] IN (N'Devicon', N'SimpleIcons')),
	CONSTRAINT [CK_Technology_Icon] CHECK (
		([IconSource] IS NULL AND [IconSlug] IS NULL AND [IconIsMonochrome] IS NULL)
		OR ([IconSource] IS NOT NULL AND [IconSlug] IS NOT NULL AND [IconIsMonochrome] IS NOT NULL))
)
