/**
 * Maps technology names to devicon identifiers
 * https://devicon.dev/
 */
const SKILL_ICON_MAP: Record<string, string> = {
  'c#': 'csharp',
  '.net': 'dot-net',
  'asp.net core': 'dot-net',
  'entity framework': 'dot-net',
  'react': 'react',
  'typescript': 'typescript',
  'javascript': 'javascript',
  'tailwind css': 'tailwindcss',
  'tailwind': 'tailwindcss',
  'sql server': 'microsoftsqlserver',
  'mssql': 'microsoftsqlserver',
  'postgresql': 'postgresql',
  'mongodb': 'mongodb',
  'redis': 'redis',
  'docker': 'docker',
  'azure': 'azure',
  'git': 'git',
  'kubernetes': 'kubernetes',
  'node.js': 'nodejs',
  'express': 'express',
  'python': 'python',
  'fastapi': 'fastapi',
  'spring boot': 'spring',
  'kafka': 'apachekafka',
  'rabbitmq': 'rabbitmq',
  'signalr': 'dot-net',
  'blazor': 'blazor',
  'react native': 'react',
  'firebase': 'firebase',
  'redux': 'redux',
  'aws': 'amazonwebservices',
  'celery': 'python',
  'winforms': 'dot-net',
};

/**
 * Generates skill icon URL from devicon CDN (colored icons)
 * If icon is provided in API, returns it. Otherwise generates from name.
 */
export function getSkillIcon(name: string, iconFromApi?: string | null): string {
  // If API provides icon URL, use it
  if (iconFromApi) {
    return iconFromApi;
  }

  // Normalize name for lookup
  const normalizedName = name.toLowerCase().trim();
  
  // Get devicon identifier
  const iconId = SKILL_ICON_MAP[normalizedName] || normalizedName.replace(/[\s.]/g, '');
  
  // Return devicon CDN URL with original colored version
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconId}/${iconId}-original.svg`;
}
