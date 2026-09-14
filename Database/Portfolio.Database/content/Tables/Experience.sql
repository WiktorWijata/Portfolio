CREATE TABLE [content].[Experience]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER	NOT NULL,
	[Company]		NVARCHAR(255)		NOT NULL,
	[Position]		NVARCHAR(255)		NOT NULL,
	[StartDate]		DATE				NOT NULL,
	[EndDate]		DATE				NULL,
	[Description]	NVARCHAR(MAX)		NULL,

	CONSTRAINT [FK_Experience_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Experience_ContentId] ON [content].[Experience] ([ContentId])
