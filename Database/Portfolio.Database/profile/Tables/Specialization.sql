CREATE TABLE [profile].[Specialization]
(
	[Id]			UNIQUEIDENTIFIER	NOT NULL PRIMARY KEY DEFAULT NEWID(),
	[ProfileId]		UNIQUEIDENTIFIER	NOT NULL,
	[Order]			INT					NOT NULL DEFAULT 0,

	CONSTRAINT [FK_Specialization_Profile] FOREIGN KEY ([ProfileId]) REFERENCES [profile].[Profile] ([Id])
)
GO

CREATE NONCLUSTERED INDEX [IX_Specialization_ProfileId] ON [profile].[Specialization] ([ProfileId])
