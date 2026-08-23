CREATE TABLE [content].[Content]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[LanguageCode]	NVARCHAR(10) NOT NULL,

	CONSTRAINT [FK_Content_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [content].[Language] ([Code])
)
GO

CREATE NONCLUSTERED INDEX [IX_Content_LanguageCode] ON [content].[Content] ([LanguageCode])
