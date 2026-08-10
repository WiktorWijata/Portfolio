import type { EducationDto } from "./educationDto";
import type { ExperienceDto } from "./experienceDto";
import type { FactDto } from "./factDto";
import type { HeroDto } from "./heroDto";
import type { ProjectDto } from "./projectDto";

export interface ContentResponseDto {
  hero: HeroDto;
  experiences: ExperienceDto[];
  education: EducationDto[];
  projects: ProjectDto[];
  facts: FactDto[];
}
