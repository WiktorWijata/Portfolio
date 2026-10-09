CREATE TABLE [profile].[ServiceTranslation]
(
	[ServiceId]		UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]	NVARCHAR(10)		NOT NULL,
	[Title]			NVARCHAR(200)		NOT NULL,
	[Description]	NVARCHAR(1000)		NOT NULL,

	CONSTRAINT [PK_ServiceTranslation] PRIMARY KEY ([ServiceId], [LanguageCode]),
	CONSTRAINT [FK_ServiceTranslation_Service] FOREIGN KEY ([ServiceId]) REFERENCES [profile].[Service] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ServiceTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
