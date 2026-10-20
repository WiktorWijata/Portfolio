CREATE TABLE [profile].[ProjectArchitectureNoteTranslation]
(
	[ProjectArchitectureNoteId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]				NVARCHAR(10)		NOT NULL,
	[Title]						NVARCHAR(200)		NOT NULL,
	[Text]						NVARCHAR(2000)		NOT NULL,

	CONSTRAINT [PK_ProjectArchitectureNoteTranslation] PRIMARY KEY ([ProjectArchitectureNoteId], [LanguageCode]),
	CONSTRAINT [FK_ProjectArchitectureNoteTranslation_ProjectArchitectureNote] FOREIGN KEY ([ProjectArchitectureNoteId]) REFERENCES [profile].[ProjectArchitectureNote] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectArchitectureNoteTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
