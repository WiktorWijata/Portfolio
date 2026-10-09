CREATE TABLE [profile].[ExperienceArea]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ExperienceId]	UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_ExperienceArea_Experience] FOREIGN KEY ([ExperienceId]) REFERENCES [profile].[Experience] ([Id]) ON DELETE CASCADE
)
GO

CREATE NONCLUSTERED INDEX [IX_ExperienceArea_ExperienceId] ON [profile].[ExperienceArea] ([ExperienceId])
