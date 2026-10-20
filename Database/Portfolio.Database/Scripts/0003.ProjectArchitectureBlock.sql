CREATE TABLE [profile].[ProjectArchitectureBlock]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[ParentBlockId]	UNIQUEIDENTIFIER	NULL,
	[Order]			INT					NOT NULL DEFAULT 0,
	[Path]			NVARCHAR(500)		NULL,

	CONSTRAINT [FK_ProjectArchitectureBlock_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectArchitectureBlock_Parent] FOREIGN KEY ([ParentBlockId]) REFERENCES [profile].[ProjectArchitectureBlock] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectArchitectureBlock_ProjectId] ON [profile].[ProjectArchitectureBlock] ([ProjectId])
GO

CREATE NONCLUSTERED INDEX [IX_ProjectArchitectureBlock_ParentBlockId] ON [profile].[ProjectArchitectureBlock] ([ParentBlockId])
GO

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
GO

ALTER TABLE [profile].[ProjectTranslation] ADD
	[ArchitectureCaption]		NVARCHAR(500)	NULL,
	[ArchitectureDiagramLabel]	NVARCHAR(1000)	NULL
