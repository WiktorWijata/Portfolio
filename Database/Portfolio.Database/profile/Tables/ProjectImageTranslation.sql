CREATE TABLE [profile].[ProjectImageTranslation]
(
	[ProjectImageId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Alt]				NVARCHAR(300)		NOT NULL,

	CONSTRAINT [PK_ProjectImageTranslation] PRIMARY KEY ([ProjectImageId], [LanguageCode]),
	CONSTRAINT [FK_ProjectImageTranslation_ProjectImage] FOREIGN KEY ([ProjectImageId]) REFERENCES [profile].[ProjectImage] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectImageTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
