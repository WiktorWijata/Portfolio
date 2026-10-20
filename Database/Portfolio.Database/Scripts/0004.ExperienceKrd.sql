-- Adds the current job (Krajowy Rejestr Długów, from 2026-04-24): its employer, position, areas of
-- responsibility with their descriptions, and technologies. Four technologies are new (Argo CD, TeamCity,
-- Octopus Deploy, GitHub Copilot CLI), which also get a place on the Stack page; the rest are looked up by name,
-- because their ids differ between databases.
-- Safe to run again: nothing is added twice.

DECLARE @ProfileId		UNIQUEIDENTIFIER
DECLARE @EmployerName	NVARCHAR(255) = N'Krajowy Rejestr Długów Biuro Informacji Gospodarczej S.A.'

IF (SELECT COUNT(*) FROM [profile].[Profile]) <> 1
	THROW 50001, N'Expected exactly one profile to add the experience to.', 1

SELECT @ProfileId = [Id] FROM [profile].[Profile]

-- New technologies (the icons come from Simple Icons; black ones are inverted in dark themes)
INSERT INTO [profile].[Technology] ([Name], [IconSource], [IconSlug], [IconIsMonochrome])
SELECT v.[Name], v.[IconSource], v.[IconSlug], v.[IconIsMonochrome]
FROM (VALUES
	(N'Argo CD',			N'SimpleIcons', N'argo',			CAST(0 AS BIT)),
	(N'TeamCity',			N'SimpleIcons', N'teamcity',		CAST(1 AS BIT)),
	(N'Octopus Deploy',		N'SimpleIcons', N'octopusdeploy',	CAST(0 AS BIT)),
	(N'GitHub Copilot CLI',	N'SimpleIcons', N'githubcopilot',	CAST(1 AS BIT))
) AS v ([Name], [IconSource], [IconSlug], [IconIsMonochrome])
WHERE NOT EXISTS (SELECT 1 FROM [profile].[Technology] t WHERE t.[Name] = v.[Name])

-- The new technologies also go on the Stack page: Argo CD, TeamCity and Octopus Deploy under CI/CD, GitHub Copilot CLI
-- under AI, each after the technologies already in its category. The categories are found by their Polish names.
DECLARE @Skills TABLE ([TechnologyName] NVARCHAR(200), [CategoryName] NVARCHAR(200), [Position] INT)
INSERT INTO @Skills ([TechnologyName], [CategoryName], [Position]) VALUES
	(N'TeamCity', N'CI/CD', 1), (N'Octopus Deploy', N'CI/CD', 2), (N'Argo CD', N'CI/CD', 3),
	(N'GitHub Copilot CLI', N'AI', 1)

IF (SELECT COUNT(DISTINCT s.[CategoryName]) FROM @Skills s
	JOIN [profile].[SkillCategoryTranslation] c ON c.[Name] = s.[CategoryName] AND c.[LanguageCode] = N'PL') <> 2
	THROW 50003, N'The CI/CD or AI skill category does not exist.', 1

INSERT INTO [profile].[Skill] ([ProfileId], [TechnologyId], [SkillCategoryId], [Order])
SELECT @ProfileId, t.[Id], c.[SkillCategoryId],
	ISNULL((SELECT MAX(k.[Order]) FROM [profile].[Skill] k WHERE k.[SkillCategoryId] = c.[SkillCategoryId]), 0) + s.[Position]
FROM @Skills s
JOIN [profile].[Technology] t ON t.[Name] = s.[TechnologyName]
JOIN [profile].[SkillCategoryTranslation] c ON c.[Name] = s.[CategoryName] AND c.[LanguageCode] = N'PL'
WHERE NOT EXISTS (SELECT 1 FROM [profile].[Skill] k WHERE k.[ProfileId] = @ProfileId AND k.[TechnologyId] = t.[Id])

-- Already added: nothing more to do
IF EXISTS (SELECT 1 FROM [profile].[Employer] WHERE [Name] = @EmployerName)
	RETURN

DECLARE @Technologies TABLE ([Name] NVARCHAR(200), [Order] INT)
INSERT INTO @Technologies ([Name], [Order]) VALUES
	(N'C#', 1), (N'.NET', 2), (N'Azure', 3), (N'SQL Server', 4), (N'MongoDB', 5), (N'RabbitMQ', 6), (N'gRPC', 7),
	(N'Azure DevOps', 8), (N'TeamCity', 9), (N'Octopus Deploy', 10), (N'Argo CD', 11), (N'OpenShift', 12),
	(N'GitHub Copilot', 13), (N'GitHub Copilot CLI', 14), (N'C4', 15)

IF (SELECT COUNT(*) FROM @Technologies s JOIN [profile].[Technology] t ON t.[Name] = s.[Name]) <> (SELECT COUNT(*) FROM @Technologies)
	THROW 50002, N'Some technologies of the new experience do not exist.', 1

DECLARE @Areas TABLE ([AreaOrder] INT, [TitlePl] NVARCHAR(200), [TitleEn] NVARCHAR(200), [AreaId] UNIQUEIDENTIFIER DEFAULT NEWID())
INSERT INTO @Areas ([AreaOrder], [TitlePl], [TitleEn]) VALUES
	(1, N'Backend i chmura',	N'Backend and cloud'),
	(2, N'Dane',				N'Data'),
	(3, N'Integracje',			N'Integrations'),
	(4, N'DevOps',				N'DevOps'),
	(5, N'Jakość',				N'Quality'),
	(6, N'AI',					N'AI')

DECLARE @Responsibilities TABLE ([AreaOrder] INT, [ResponsibilityOrder] INT, [DescriptionPl] NVARCHAR(1000), [DescriptionEn] NVARCHAR(1000), [ResponsibilityId] UNIQUEIDENTIFIER DEFAULT NEWID())
INSERT INTO @Responsibilities ([AreaOrder], [ResponsibilityOrder], [DescriptionPl], [DescriptionEn]) VALUES
	(1, 1, N'Tworzenie i utrzymanie aplikacji webowych w technologii .NET (backend i frontend)',
			N'Building and maintaining web applications in .NET (backend and frontend)'),
	(1, 2, N'Tworzenie i utrzymanie aplikacji w środowisku chmurowym Microsoft Azure',
			N'Building and maintaining applications in the Microsoft Azure cloud'),
	(2, 1, N'SQL Server / MongoDB — utrzymanie i rozwój struktur baz (tabele, indeksy, relacje)',
			N'SQL Server / MongoDB — maintaining and developing database structures (tables, indexes, relations)'),
	(2, 2, N'Optymalizacja zapytań',
			N'Query optimization'),
	(3, 1, N'Integracja z systemami zewnętrznymi i komunikacja między usługami (gRPC)',
			N'Integration with external systems and communication between services (gRPC)'),
	(3, 2, N'Komunikacja asynchroniczna (RabbitMQ)',
			N'Asynchronous communication (RabbitMQ)'),
	(4, 1, N'Konfiguracja i utrzymanie pipeline’ów CI/CD w Azure DevOps i TeamCity (build, testy, wdrożenia)',
			N'Configuring and maintaining CI/CD pipelines in Azure DevOps and TeamCity (build, tests, deployments)'),
	(4, 2, N'Wdrożenia z Octopus Deploy i Argo CD na OpenShift',
			N'Deployments with Octopus Deploy and Argo CD to OpenShift'),
	(5, 1, N'Testy jednostkowe i integracyjne',
			N'Unit and integration tests'),
	(5, 2, N'Code review oraz utrzymanie jakości i spójności kodu wg przyjętych standardów',
			N'Code review and maintaining code quality and consistency according to the adopted standards'),
	(6, 1, N'Wykorzystanie GitHub Copilot i Copilot CLI w codziennej pracy',
			N'Using GitHub Copilot and Copilot CLI in daily work'),
	(6, 2, N'Budowanie agentów AI',
			N'Building AI agents'),
	(6, 3, N'Tworzenie skilli i instrukcji dla AI',
			N'Creating skills and instructions for AI'),
	(6, 4, N'Przygotowanie zespołu do optymalizacji zużycia AIC / tokenów',
			N'Preparing the team to optimize AIC / token usage')

DECLARE @EmployerId		UNIQUEIDENTIFIER = NEWID()
DECLARE @ExperienceId	UNIQUEIDENTIFIER = NEWID()

INSERT INTO [profile].[Employer] ([Id], [Name]) VALUES (@EmployerId, @EmployerName)

INSERT INTO [profile].[Experience] ([Id], [ProfileId], [EmployerId], [StartDate], [EndDate])
VALUES (@ExperienceId, @ProfileId, @EmployerId, CAST(N'2026-04-24' AS DATE), NULL)

INSERT INTO [profile].[ExperienceTranslation] ([ExperienceId], [LanguageCode], [Position]) VALUES
	(@ExperienceId, N'PL', N'.NET Developer'),
	(@ExperienceId, N'EN', N'.NET Developer')

INSERT INTO [profile].[ExperienceArea] ([Id], [ExperienceId], [Order])
SELECT [AreaId], @ExperienceId, [AreaOrder] FROM @Areas

INSERT INTO [profile].[ExperienceAreaTranslation] ([ExperienceAreaId], [LanguageCode], [Title])
SELECT [AreaId], N'PL', [TitlePl] FROM @Areas
UNION ALL
SELECT [AreaId], N'EN', [TitleEn] FROM @Areas

INSERT INTO [profile].[ExperienceResponsibility] ([Id], [ExperienceAreaId], [Order])
SELECT r.[ResponsibilityId], a.[AreaId], r.[ResponsibilityOrder]
FROM @Responsibilities r
JOIN @Areas a ON a.[AreaOrder] = r.[AreaOrder]

INSERT INTO [profile].[ExperienceResponsibilityTranslation] ([ExperienceResponsibilityId], [LanguageCode], [Description])
SELECT [ResponsibilityId], N'PL', [DescriptionPl] FROM @Responsibilities
UNION ALL
SELECT [ResponsibilityId], N'EN', [DescriptionEn] FROM @Responsibilities

INSERT INTO [profile].[ExperienceTechnology] ([ExperienceId], [TechnologyId], [Order])
SELECT @ExperienceId, t.[Id], s.[Order]
FROM @Technologies s
JOIN [profile].[Technology] t ON t.[Name] = s.[Name]
