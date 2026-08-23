CREATE TABLE [content].[AboutMeDescription]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[AboutMeId]		UNIQUEIDENTIFIER	NOT NULL,
	[Description]	NVARCHAR(2000)		NOT NULL,
	[Order]			INT					NULL,

	CONSTRAINT [FK_AboutMeDescription_AboutMe] FOREIGN KEY ([AboutMeId]) REFERENCES [content].[AboutMe] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_AboutMeDescription_AboutMeId] ON [content].[AboutMeDescription] ([AboutMeId])
