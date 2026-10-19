-- Images of a project (its gallery): the address of each image on the file server and its alternative text per language.
CREATE TABLE [profile].[ProjectImage]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProjectId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]		INT					NOT NULL DEFAULT 0,
	[Url]		NVARCHAR(1000)		NOT NULL,

	CONSTRAINT [FK_ProjectImage_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectImage_ProjectId] ON [profile].[ProjectImage] ([ProjectId])
GO

CREATE TABLE [profile].[ProjectImageTranslation]
(
	[ProjectImageId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Alt]				NVARCHAR(300)		NOT NULL,

	CONSTRAINT [PK_ProjectImageTranslation] PRIMARY KEY ([ProjectImageId], [LanguageCode]),
	CONSTRAINT [FK_ProjectImageTranslation_ProjectImage] FOREIGN KEY ([ProjectImageId]) REFERENCES [profile].[ProjectImage] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectImageTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
GO

-- The gallery of the Portfolio project: three screenshots kept on the file server (files.wiktorwijata.com,
-- /opt/files/public/projects/portfolio/). A database without that project (or with images already) is left alone.
DECLARE @ProjectId UNIQUEIDENTIFIER = (SELECT [Id] FROM [profile].[Project] WHERE [Name] = N'Portfolio')

IF @ProjectId IS NULL OR EXISTS (SELECT 1 FROM [profile].[ProjectImage] WHERE [ProjectId] = @ProjectId)
	RETURN

DECLARE @Images TABLE ([ImageOrder] INT, [Url] NVARCHAR(1000), [AltPl] NVARCHAR(300), [AltEn] NVARCHAR(300), [ImageId] UNIQUEIDENTIFIER DEFAULT NEWID())
INSERT INTO @Images ([ImageOrder], [Url], [AltPl], [AltEn]) VALUES
	(1, N'https://files.wiktorwijata.com/projects/portfolio/desktop-about.webp',
		N'Strona „O mnie” w oknie w stylu IDE: explorer plików po lewej, treść strony po prawej',
		N'The About page in the IDE-style window: the file explorer on the left, the page on the right'),
	(2, N'https://files.wiktorwijata.com/projects/portfolio/desktop-experience.webp',
		N'Strona „Doświadczenie” z listą stanowisk i zakresem obowiązków',
		N'The Experience page with the list of positions and their responsibilities'),
	(3, N'https://files.wiktorwijata.com/projects/portfolio/mobile-about.webp',
		N'Portfolio na telefonie: nagłówek, treść strony i dolny pasek zakładek',
		N'The portfolio on a phone: the header, the page and the bottom tab bar')

INSERT INTO [profile].[ProjectImage] ([Id], [ProjectId], [Order], [Url])
SELECT [ImageId], @ProjectId, [ImageOrder], [Url] FROM @Images

INSERT INTO [profile].[ProjectImageTranslation] ([ProjectImageId], [LanguageCode], [Alt])
SELECT [ImageId], N'PL', [AltPl] FROM @Images
UNION ALL
SELECT [ImageId], N'EN', [AltEn] FROM @Images
