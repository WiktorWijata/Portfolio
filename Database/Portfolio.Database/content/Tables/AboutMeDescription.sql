CREATE TABLE [content].[AboutMeDescription]
(
	[AboutMeId]		UNIQUEIDENTIFIER NOT NULL,
	[Description]	NVARCHAR(2000) NOT NULL,

	CONSTRAINT [FK_AboutMeDescription_AboutMe] FOREIGN KEY ([AboutMeId]) REFERENCES [content].[AboutMe] ([Id])
)
