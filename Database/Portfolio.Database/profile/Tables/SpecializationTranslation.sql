CREATE TABLE [profile].[SpecializationTranslation]
(
	[SpecializationId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Tag]				NVARCHAR(20)		NOT NULL,
	[Title]				NVARCHAR(200)		NOT NULL,
	[Subtitle]			NVARCHAR(500)		NOT NULL,

	CONSTRAINT [PK_SpecializationTranslation] PRIMARY KEY ([SpecializationId], [LanguageCode]),
	CONSTRAINT [FK_SpecializationTranslation_Specialization] FOREIGN KEY ([SpecializationId]) REFERENCES [profile].[Specialization] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_SpecializationTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
