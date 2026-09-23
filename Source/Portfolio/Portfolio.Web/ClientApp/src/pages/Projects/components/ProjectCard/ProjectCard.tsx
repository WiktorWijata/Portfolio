import { FontFamily, FontSize, FontWeight, Panel, Text, TextColor } from '@/design-system'
import type { ProjectCardProps } from './ProjectCard.types'

/** Card of a project: a screenshot on top, label + title + description below. The whole card opens the project. */
export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <Panel interactive className="overflow-hidden">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full cursor-pointer rounded-[inherit] text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent"
      >
        <div className="mx-4 mt-4 aspect-[2380/1162] overflow-hidden rounded-lg border border-line-strong bg-surface-editor">
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="block size-full object-contain"
          />
        </div>
        <div className="px-5 pt-[18px] pb-[22px]">
          <Text
            as="small"
            size={FontSize.XXSmall}
            font={FontFamily.Mono}
            color={TextColor.Accent}
            className="block leading-[17px] tracking-[.5px]"
          >
            {project.label}
          </Text>
          <Text
            as="h3"
            size={FontSize.XXLarge}
            font={FontFamily.Sans}
            weight={FontWeight.Medium}
            color={TextColor.Heading}
            className="my-[7px] leading-[1.4] tracking-[-.15px]"
          >
            {project.title}
          </Text>
          <Text as="p" size={FontSize.Medium} font={FontFamily.Sans} color={TextColor.Muted} className="leading-[1.7]">
            {project.text}
          </Text>
        </div>
      </button>
    </Panel>
  )
}
