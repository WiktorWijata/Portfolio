CREATE TABLE [profile].[ExperienceResponsibility]
(
	[Id]				UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ExperienceAreaId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]				INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_ExperienceResponsibility_ExperienceArea] FOREIGN KEY ([ExperienceAreaId]) REFERENCES [profile].[ExperienceArea] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceResponsibility_ExperienceAreaId] ON [profile].[ExperienceResponsibility] ([ExperienceAreaId])
