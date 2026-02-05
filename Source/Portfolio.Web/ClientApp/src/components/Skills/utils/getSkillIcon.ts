/**
 * Maps technology names to devicon identifiers
 * https://devicon.dev/
 */
const SKILL_ICON_MAP: Record<string, string> = {
  'c#': 'csharp',
  '.net core': 'dotnetcore',
  'ef core': 'entityframeworkcore',
  'tailwind css': 'tailwindcss',
  'sql server': 'microsoftsqlserver',
  'mssql': 'microsoftsqlserver',
  'spring boot': 'spring',
  'kafka': 'apachekafka',
  'react native': 'react',
  'aws': 'amazonwebservices',
  'celery': 'python',
  'winforms': 'dot-net',
  'vb.net': 'visualbasic',
  'wpf': 'dot-net',
  'soap':'xml',
  'rest api': 'json',
  'oracle db': 'oracle',
  'azure sql': 'azuresqldatabase',
  'azure devops pipelines': 'azuredevops',
  'github actions': 'githubactions',
  'visual studio': 'visualstudio',
  'vs code': 'vscode',
};

/**
 * Generates skill icon URL from devicon CDN (colored icons)
 * If icon is provided in API, returns it. Otherwise generates from name.
 */
export function getSkillIcon(name: string, iconFromApi?: string | null): string {
  if (iconFromApi) {
    return iconFromApi;
  }

  const normalizedName = name.toLowerCase().trim();
  const iconId = SKILL_ICON_MAP[normalizedName] ?? normalizedName.replace(/[\s.]/g, '');
  
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconId}/${iconId}-original.svg`;
}
