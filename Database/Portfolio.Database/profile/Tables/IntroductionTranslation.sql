CREATE TABLE [profile].[IntroductionTranslation]
(
	[IntroductionId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Title]				NVARCHAR(200)		NOT NULL,
	[Motto]				NVARCHAR(500)		NOT NULL,
	[Description]		NVARCHAR(2000)		NOT NULL,

	CONSTRAINT [PK_IntroductionTranslation] PRIMARY KEY ([IntroductionId], [LanguageCode]),
	CONSTRAINT [FK_IntroductionTranslation_Introduction] FOREIGN KEY ([IntroductionId]) REFERENCES [profile].[Introduction] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_IntroductionTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
