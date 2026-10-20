CREATE SCHEMA [profile]
GO

CREATE SCHEMA [notification]
GO

CREATE TABLE [profile].[Language]
(
	[Code]		NVARCHAR(10)	NOT NULL PRIMARY KEY,
	[Name]		NVARCHAR(100)	NOT NULL,
	[Culture]	NVARCHAR(10)	NOT NULL
)
GO

CREATE TABLE [profile].[Technology]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[Name]				NVARCHAR(200)		NOT NULL,
	[IconSource]		NVARCHAR(20)		NULL,
	[IconSlug]			NVARCHAR(100)		NULL,
	[IconIsMonochrome]	BIT					NULL,

	CONSTRAINT [UQ_Technology_Name] UNIQUE ([Name]),
	CONSTRAINT [CK_Technology_IconSource] CHECK ([IconSource] IN (N'Devicon', N'SimpleIcons')),
	CONSTRAINT [CK_Technology_Icon] CHECK (
		([IconSource] IS NULL AND [IconSlug] IS NULL AND [IconIsMonochrome] IS NULL)
		OR ([IconSource] IS NOT NULL AND [IconSlug] IS NOT NULL AND [IconIsMonochrome] IS NOT NULL))
)
GO

CREATE TABLE [profile].[SkillCategory]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[Order]		INT					NOT NULL DEFAULT 0
)
GO

CREATE TABLE [profile].[SkillCategoryTranslation]
(
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Name]				NVARCHAR(200)		NOT NULL,

	CONSTRAINT [PK_SkillCategoryTranslation] PRIMARY KEY ([SkillCategoryId], [LanguageCode]),
	CONSTRAINT [FK_SkillCategoryTranslation_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [profile].[SkillCategory] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_SkillCategoryTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
GO

CREATE TABLE [profile].[Profile]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[UserId]	UNIQUEIDENTIFIER	NOT NULL,
	[Name]		NVARCHAR(200)		NOT NULL
)
GO

CREATE TABLE [profile].[Service]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[IconSlug]		NVARCHAR(100)		NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Service_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Service_ProfileId] ON [profile].[Service] ([ProfileId])
GO

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
GO

CREATE TABLE [profile].[Specialization]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Specialization_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Specialization_ProfileId] ON [profile].[Specialization] ([ProfileId])
GO

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
GO

CREATE TABLE [profile].[SpecializationTechnology]
(
	[SpecializationId]	UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]		UNIQUEIDENTIFIER	NOT NULL,
	[Order]				INT					NOT NULL DEFAULT 0,

	CONSTRAINT [PK_SpecializationTechnology] PRIMARY KEY ([SpecializationId], [TechnologyId]),
	CONSTRAINT [FK_SpecializationTechnology_Specialization] FOREIGN KEY ([SpecializationId]) REFERENCES [profile].[Specialization] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_SpecializationTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_SpecializationTechnology_TechnologyId] ON [profile].[SpecializationTechnology] ([TechnologyId])
GO

CREATE TABLE [profile].[Aspiration]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Aspiration_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Aspiration_ProfileId] ON [profile].[Aspiration] ([ProfileId])
GO

CREATE TABLE [profile].[AspirationTranslation]
(
	[AspirationId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]	NVARCHAR(10)		NOT NULL,
	[Text]			NVARCHAR(500)		NOT NULL,

	CONSTRAINT [PK_AspirationTranslation] PRIMARY KEY ([AspirationId], [LanguageCode]),
	CONSTRAINT [FK_AspirationTranslation_Aspiration] FOREIGN KEY ([AspirationId]) REFERENCES [profile].[Aspiration] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_AspirationTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
GO

CREATE TABLE [profile].[Introduction]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,

	CONSTRAINT [FK_Introduction_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_Introduction_ProfileId] ON [profile].[Introduction] ([ProfileId])
GO

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
GO

CREATE TABLE [profile].[Certificate]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Name]			NVARCHAR(255)		NOT NULL,
	[Issuer]		NVARCHAR(255)		NOT NULL,
	[IssuedOn]		DATE				NOT NULL,
	[Code]			NVARCHAR(100)		NULL,

	CONSTRAINT [FK_Certificate_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Certificate_ProfileId] ON [profile].[Certificate] ([ProfileId])
GO

CREATE TABLE [profile].[Business]
(
	[Id]					UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]				UNIQUEIDENTIFIER	NOT NULL,
	[Name]					NVARCHAR(255)		NOT NULL,
	[TaxNumber]				NVARCHAR(50)		NULL,
	[RegistrationNumber]	NVARCHAR(50)		NULL,
	[Street]				NVARCHAR(255)		NOT NULL,
	[PostalCode]			NVARCHAR(20)		NOT NULL,
	[City]					NVARCHAR(100)		NOT NULL,
	[Region]				NVARCHAR(100)		NULL,

	CONSTRAINT [FK_Business_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_Business_ProfileId] ON [profile].[Business] ([ProfileId])
GO

CREATE TABLE [profile].[Employer]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[Name]			NVARCHAR(255)		NOT NULL,

	CONSTRAINT [UQ_Employer_Name] UNIQUE ([Name])
)
GO

CREATE TABLE [profile].[Experience]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[EmployerId]		UNIQUEIDENTIFIER	NOT NULL,
	[StartDate]		DATE				NOT NULL,
	[EndDate]		DATE				NULL,

	CONSTRAINT [FK_Experience_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id]),
	CONSTRAINT [FK_Experience_Employer] FOREIGN KEY ([EmployerId]) REFERENCES [profile].[Employer] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Experience_ProfileId] ON [profile].[Experience] ([ProfileId])
GO

CREATE NONCLUSTERED INDEX [IX_Experience_EmployerId] ON [profile].[Experience] ([EmployerId])
GO

CREATE TABLE [profile].[ExperienceTranslation]
(
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]	NVARCHAR(10)		NOT NULL,
	[Position]		NVARCHAR(255)		NOT NULL,

	CONSTRAINT [PK_ExperienceTranslation] PRIMARY KEY ([ExperienceId], [LanguageCode]),
	CONSTRAINT [FK_ExperienceTranslation_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [profile].[Experience] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
GO

CREATE TABLE [profile].[ExperienceArea]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_ExperienceArea_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [profile].[Experience] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceArea_ExperienceId] ON [profile].[ExperienceArea] ([ExperienceId])
GO

CREATE TABLE [profile].[ExperienceAreaTranslation]
(
	[ExperienceAreaId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]		NVARCHAR(10)		NOT NULL,
	[Title]				NVARCHAR(200)		NOT NULL,

	CONSTRAINT [PK_ExperienceAreaTranslation] PRIMARY KEY ([ExperienceAreaId], [LanguageCode]),
	CONSTRAINT [FK_ExperienceAreaTranslation_ExperienceArea] FOREIGN KEY ([ExperienceAreaId]) REFERENCES [profile].[ExperienceArea] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceAreaTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
GO

CREATE TABLE [profile].[ExperienceResponsibility]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ExperienceAreaId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]				INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_ExperienceResponsibility_ExperienceArea] FOREIGN KEY ([ExperienceAreaId]) REFERENCES [profile].[ExperienceArea] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceResponsibility_ExperienceAreaId] ON [profile].[ExperienceResponsibility] ([ExperienceAreaId])
GO

CREATE TABLE [profile].[ExperienceResponsibilityTranslation]
(
	[ExperienceResponsibilityId]	UNIQUEIDENTIFIER	NOT NULL,
	[LanguageCode]					NVARCHAR(10)		NOT NULL,
	[Description]					NVARCHAR(1000)		NOT NULL,

	CONSTRAINT [PK_ExperienceResponsibilityTranslation] PRIMARY KEY ([ExperienceResponsibilityId], [LanguageCode]),
	CONSTRAINT [FK_ExperienceResponsibilityTranslation_ExperienceResponsibility] FOREIGN KEY ([ExperienceResponsibilityId]) REFERENCES [profile].[ExperienceResponsibility] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceResponsibilityTranslation_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [profile].[Language] ([Code])
)
GO

CREATE TABLE [profile].[ExperienceTechnology]
(
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [PK_ExperienceTechnology] PRIMARY KEY ([ExperienceId], [TechnologyId]),
	CONSTRAINT [FK_ExperienceTechnology_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [profile].[Experience] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ExperienceTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceTechnology_TechnologyId] ON [profile].[ExperienceTechnology] ([TechnologyId])
GO

CREATE TABLE [profile].[Contact]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER NOT NULL,
	[Type]			NVARCHAR(50) NOT NULL,
	[Value]			NVARCHAR(500) NOT NULL,

	CONSTRAINT [FK_Contact_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Contact_ProfileId] ON [profile].[Contact] ([ProfileId])
GO

CREATE TABLE [profile].[Skill]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]			UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]		UNIQUEIDENTIFIER	NOT NULL,
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]				INT					NOT NULL DEFAULT 0,

	CONSTRAINT [UQ_Skill_Profile_Technology] UNIQUE ([ProfileId], [TechnologyId]),
	CONSTRAINT [FK_Skill_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id]),
	CONSTRAINT [FK_Skill_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id]),
	CONSTRAINT [FK_Skill_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [profile].[SkillCategory] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Skill_TechnologyId] ON [profile].[Skill] ([TechnologyId])
GO

CREATE NONCLUSTERED INDEX [IX_Skill_SkillCategoryId] ON [profile].[Skill] ([SkillCategoryId])
GO

CREATE TABLE [profile].[Project]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Name]			NVARCHAR(200)		NOT NULL,
	[CodeUrl]		NVARCHAR(1000)		NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Project_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Project_ProfileId] ON [profile].[Project] ([ProfileId])
GO

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
GO

CREATE TABLE [profile].[ProjectTechnology]
(
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [PK_ProjectTechnology] PRIMARY KEY ([ProjectId], [TechnologyId]),
	CONSTRAINT [FK_ProjectTechnology_Project] FOREIGN KEY ([ProjectId]) REFERENCES [profile].[Project] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_ProjectTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [profile].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectTechnology_TechnologyId] ON [profile].[ProjectTechnology] ([TechnologyId])
GO

CREATE TABLE [notification].[Email]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[Name]		NVARCHAR(100)		NOT NULL,
	[Sender]	NVARCHAR(100)		NOT NULL,
	[Body]		NVARCHAR(1000)		NOT NULL,
	[SentDate]	DATETIME			NULL,
	[CreatedAt]	DATETIME			NOT NULL DEFAULT GETDATE()
)
