CREATE TABLE [content].[Education]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER NOT NULL,
	[StartDate]		DATE NOT NULL,
	[EndDate]		DATE NULL,
	[Institution]	NVARCHAR(255) NOT NULL,
	[Degree]		NVARCHAR(255) NOT NULL,
	[Field]			NVARCHAR(255) NULL,

	CONSTRAINT [FK_Education_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Education_ContentId] ON [content].[Education] ([ContentId])
