CREATE TABLE [content].[Fact]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER	NOT NULL,
	[Title]			NVARCHAR(200)		NOT NULL,
	[Description]	NVARCHAR(MAX)		NOT NULL,
	[Icon]			NVARCHAR(255)		NULL,

	CONSTRAINT [FK_Fact_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Fact_ContentId] ON [content].[Fact] ([ContentId])
