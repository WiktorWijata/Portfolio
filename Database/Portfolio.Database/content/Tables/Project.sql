CREATE TABLE [content].[Project]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER	NOT NULL,
	[Title]			NVARCHAR(200)		NOT NULL,
	[Description]	NVARCHAR(MAX)		NOT NULL,
	[ImageUrl]		NVARCHAR(1000)		NULL,
	[CodeUrl]		NVARCHAR(1000)		NULL,
	[DemoUrl]		NVARCHAR(1000)		NULL,
	[Order]			INT					NULL,

	CONSTRAINT [FK_Project_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Project_ContentId] ON [content].[Project] ([ContentId])
