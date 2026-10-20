-- New order of the projects: Infrastructure, Portfolio, IntegratorAI. Safe to run again.

UPDATE [profile].[Project] SET [Order] = 1 WHERE [Name] = N'Infrastructure'
UPDATE [profile].[Project] SET [Order] = 2 WHERE [Name] = N'Portfolio'
UPDATE [profile].[Project] SET [Order] = 3 WHERE [Name] = N'IntegratorAI'
