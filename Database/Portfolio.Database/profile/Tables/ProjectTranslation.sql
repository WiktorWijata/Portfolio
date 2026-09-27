CREATE TABLE [profile].[ProjectTranslation]
(
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]	NVARCHAR(10)		NOT NULL,
	[Description]	NVARCHAR(2000)		NOT NULL,
	[Goal]			NVARCHAR(1000)		NULL,
	[Solution]		NVARCHAR(1000)		NULL,

	CONSTRAINT [PK_ProjectTranslation] PRIMARY KEY ([ProjectId], [LanguageCode]),
	CONSTRAINT [FK_ProjectTranslation_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
