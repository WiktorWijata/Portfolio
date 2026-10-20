-- The Infrastructure page now draws its own diagram (a live component, translated in the frontend) instead of showing
-- the generic architecture diagram and a gallery picture of it. So the project keeps no diagram blocks and no caption
-- for them, and the picture on its card moves to a new file made from that component. Safe to run again.

DECLARE @ProjectId UNIQUEIDENTIFIER = (SELECT [Id] FROM [profile].[Project] WHERE [Name] = N'Infrastructure')

IF @ProjectId IS NULL
	RETURN

-- Children first: a block cannot be deleted while another one points at it. Their translations go with them.
DELETE FROM [profile].[ProjectArchitectureBlock] WHERE [ProjectId] = @ProjectId AND [ParentBlockId] IS NOT NULL
DELETE FROM [profile].[ProjectArchitectureBlock] WHERE [ProjectId] = @ProjectId

UPDATE [profile].[ProjectTranslation]
SET [ArchitectureCaption] = NULL, [ArchitectureDiagramLabel] = NULL
WHERE [ProjectId] = @ProjectId

UPDATE [profile].[ProjectImage]
SET [Url] = N'https://files.wiktorwijata.com/projects/infrastructure/diagram.webp'
WHERE [ProjectId] = @ProjectId AND [Url] = N'https://files.wiktorwijata.com/projects/infrastructure/environments.webp'
