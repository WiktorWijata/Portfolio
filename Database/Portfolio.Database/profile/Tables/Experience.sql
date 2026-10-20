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
