import { IconButton, Icon, IconName, IconSize } from '../../../../design-system/components';
import { IconButtonSize } from '../../../../design-system/components/IconButton/IconButton.consts';
import type { ProjectActionsProps } from './ProjectActions.types';

export function ProjectActions({ githubLink, liveLink, className = '' }: ProjectActionsProps) {
  if (!githubLink && !liveLink) return null;

  return (
    <div className={`flex gap-3 ${className}`}>
      {githubLink && (
        <IconButton
          href={githubLink}
          size={IconButtonSize.SMALL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name={IconName.GITHUB} size={IconSize.SM} />
        </IconButton>
      )}
      {liveLink && (
        <IconButton
          href={liveLink}
          size={IconButtonSize.SMALL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name={IconName.EXTERNAL_LINK} size={IconSize.SM} />
        </IconButton>
      )}
    </div>
  );
}
