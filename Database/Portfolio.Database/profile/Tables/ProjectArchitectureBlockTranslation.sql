CREATE TABLE [profile].[ProjectArchitectureBlockTranslation]
(
	[ProjectArchitectureBlockId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]					NVARCHAR(10)		NOT NULL,
	[Title]							NVARCHAR(200)		NOT NULL,
	[Note]							NVARCHAR(500)		NULL,
	[LinkLabel]						NVARCHAR(200)		NULL,
	[ConnectionLabel]				NVARCHAR(200)		NULL,

	CONSTRAINT [PK_ProjectArchitectureBlockTranslation] PRIMARY KEY ([ProjectArchitectureBlockId], [LanguageCode]),
	CONSTRAINT [FK_ProjectArchitectureBlockTranslation_ProjectArchitectureBlock] FOREIGN KEY ([ProjectArchitectureBlockId]) REFERENCES [profile].[ProjectArchitectureBlock] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectArchitectureBlockTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
