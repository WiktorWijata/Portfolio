CREATE TABLE [content].[ExperienceAchievement]
(
	[Id]			UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ExperienceId]	UNIQUEIDENTIFIER NOT NULL,
	[Description]	NVARCHAR(1000) NOT NULL,

	CONSTRAINT [FK_ExperienceAchievement_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [content].[Experience] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceAchievement_ExperienceId] ON [content].[ExperienceAchievement] ([ExperienceId])
