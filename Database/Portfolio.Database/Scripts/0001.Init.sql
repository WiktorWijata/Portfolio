CREATE SCHEMA [content]
GO

CREATE SCHEMA [notification]
GO

CREATE TABLE [content].[Language]
(
	[Code]		NVARCHAR(10)	NOT NULL PRIMARY KEY,
	[Name]		NVARCHAR(100)	NOT NULL,
	[Culture]	NVARCHAR(10)	NOT NULL
)
GO

CREATE TABLE [content].[Technology]
(
	[Id]	UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[Name]	NVARCHAR(200) NOT NULL
)
GO

CREATE TABLE [content].[SkillCategory]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[PL]		NVARCHAR(200)		NOT NULL,
	[EN]		NVARCHAR(200)		NOT NULL,
	[Order]		INT					NOT NULL DEFAULT 0
)
GO

CREATE TABLE [content].[Content]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[LanguageCode]	NVARCHAR(10) NOT NULL,

	CONSTRAINT [FK_Content_Language] FOREIGN KEY ([LanguageCode]) REFERENCES [content].[Language] ([Code])
)
GO

CREATE NONCLUSTERED INDEX [IX_Content_LanguageCode] ON [content].[Content] ([LanguageCode])
GO

CREATE TABLE [content].[Hero]
(
	[Id]		UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId] UNIQUEIDENTIFIER NOT NULL,
	[Motto]		NVARCHAR(1000),
	[ImageUrl]	NVARCHAR(1000)	 NULL,

	CONSTRAINT [FK_Hero_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_Hero_ContentId] ON [content].[Hero] ([ContentId])
GO

CREATE TABLE [content].[AboutMe]
(
	[Id]		UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[HeroId]	UNIQUEIDENTIFIER	NOT NULL,
	[Title]		NVARCHAR(500)		NOT NULL,
	[Header]	NVARCHAR(500)		NULL,

	CONSTRAINT [FK_AboutMe_Hero] FOREIGN KEY ([HeroId]) REFERENCES [content].[Hero] ([Id])
)
GO

CREATE UNIQUE NONCLUSTERED INDEX [IX_AboutMe_HeroId] ON [content].[AboutMe] ([HeroId])
GO

CREATE TABLE [content].[AboutMeDescription]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[AboutMeId]		UNIQUEIDENTIFIER	NOT NULL,
	[Description]	NVARCHAR(2000)		NOT NULL,
	[Order]			INT					NULL,

	CONSTRAINT [FK_AboutMeDescription_AboutMe] FOREIGN KEY ([AboutMeId]) REFERENCES [content].[AboutMe] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_AboutMeDescription_AboutMeId] ON [content].[AboutMeDescription] ([AboutMeId])
GO

CREATE TABLE [content].[Experience]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER	NOT NULL,
	[Company]		NVARCHAR(255)		NOT NULL,
	[Position]		NVARCHAR(255)		NOT NULL,
	[StartDate]		DATE				NOT NULL,
	[EndDate]		DATE				NULL,
	[Description]	NVARCHAR(MAX)		NULL,

	CONSTRAINT [FK_Experience_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Experience_ContentId] ON [content].[Experience] ([ContentId])
GO

CREATE TABLE [content].[ExperienceTechnology]
(
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NULL,

	CONSTRAINT [PK_ExperienceTechnology] PRIMARY KEY ([ExperienceId], [TechnologyId]),
	CONSTRAINT [FK_ExperienceTechnology_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [content].[Experience] ([Id]),
	CONSTRAINT [FK_ExperienceTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [content].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceTechnology_TechnologyId] ON [content].[ExperienceTechnology] ([TechnologyId])
GO

CREATE TABLE [content].[ExperienceAchievement]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[Description]	NVARCHAR(1000)		NOT NULL,
	[Order]			INT					NULL,

	CONSTRAINT [FK_ExperienceAchievement_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [content].[Experience] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceAchievement_ExperienceId] ON [content].[ExperienceAchievement] ([ExperienceId])
GO

CREATE TABLE [content].[Education]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER NOT NULL,
	[StartDate]		DATE NOT NULL,
	[EndDate]		DATE NULL,
	[Institution]	NVARCHAR(255) NOT NULL,
	[Degree]		NVARCHAR(255) NOT NULL,
	[Field]			NVARCHAR(255) NULL,

	CONSTRAINT [FK_Education_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Education_ContentId] ON [content].[Education] ([ContentId])
GO

CREATE TABLE [content].[Fact]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER	NOT NULL,
	[Title]			NVARCHAR(200)		NOT NULL,
	[Description]	NVARCHAR(MAX)		NOT NULL,
	[ImageUrl]		NVARCHAR(1000)		NULL,

	CONSTRAINT [FK_Fact_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Fact_ContentId] ON [content].[Fact] ([ContentId])
GO

CREATE TABLE [content].[Contact]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER NOT NULL,
	[Type]			NVARCHAR(50) NOT NULL,
	[Value]			NVARCHAR(500) NOT NULL,
	[IsExternal]	BIT NOT NULL,

	CONSTRAINT [FK_Contact_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Contact_ContentId] ON [content].[Contact] ([ContentId])
GO

CREATE TABLE [content].[Skill]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]			UNIQUEIDENTIFIER	NOT NULL,
	[SkillCategoryId]	UNIQUEIDENTIFIER	NOT NULL,
	[Name]				NVARCHAR(200)		NOT NULL,
	[ImageUrl]			NVARCHAR(500)		NULL,
	[Order]				INT					NULL,

	CONSTRAINT [FK_Skill_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id]),
	CONSTRAINT [FK_Skill_SkillCategory] FOREIGN KEY ([SkillCategoryId]) REFERENCES [content].[SkillCategory] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Skill_ContentId] ON [content].[Skill] ([ContentId])
GO

CREATE NONCLUSTERED INDEX [IX_Skill_SkillCategoryId] ON [content].[Skill] ([SkillCategoryId])
GO

CREATE TABLE [content].[Project]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ContentId]		UNIQUEIDENTIFIER	NOT NULL,
	[Title]			NVARCHAR(200)		NOT NULL,
	[Description]	NVARCHAR(MAX)		NOT NULL,
	[ImageUrl]		NVARCHAR(1000)		NULL,
	[CodeUrl]		NVARCHAR(1000)		NULL,
	[DemoUrl]		NVARCHAR(1000)		NULL,
	[Order]			INT					NULL,

	CONSTRAINT [FK_Project_Content] FOREIGN KEY ([ContentId]) REFERENCES [content].[Content] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Project_ContentId] ON [content].[Project] ([ContentId])
GO

CREATE TABLE [content].[ProjectTechnology]
(
	[ProjectId]		UNIQUEIDENTIFIER	NOT NULL,
	[TechnologyId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NULL,

	CONSTRAINT [PK_ProjectTechnology] PRIMARY KEY ([ProjectId], [TechnologyId]),
	CONSTRAINT [FK_ProjectTechnology_Project] FOREIGN KEY ([ProjectId]) REFERENCES [content].[Project] ([Id]),
	CONSTRAINT [FK_ProjectTechnology_Technology] FOREIGN KEY ([TechnologyId]) REFERENCES [content].[Technology] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ProjectTechnology_TechnologyId] ON [content].[ProjectTechnology] ([TechnologyId])
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
