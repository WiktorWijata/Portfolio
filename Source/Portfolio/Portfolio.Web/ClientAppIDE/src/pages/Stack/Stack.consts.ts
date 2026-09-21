import type { StackCategory, TechnologyGroup } from './Stack.types'

export const STACK_KICKER = 'Stack / Kompetencje'
export const STACK_TITLE = 'Technologie'
export const STACK_TITLE_ACCENT = 'w moim warsztacie.'
export const STACK_TEXT = 'Przegląd narzędzi i technologii z mojego portfolio. Wybierz kategorię lub wyszukaj nazwę.'

export const STACK_CATEGORIES_HEADER = 'Kategorie'
export const STACK_CATEGORIES_LABEL = 'Kategorie umiejętności'
export const STACK_ALL_LABEL = 'Wszystkie'
export const STACK_SEARCH_PLACEHOLDER = 'Szukaj technologii…'
export const STACK_SEARCH_LABEL = 'Szukaj technologii'
export const STACK_COUNT_LABEL = 'Liczba technologii:'
export const STACK_EMPTY = 'Brak wyników — zmień nazwę lub kategorię.'

/** The category that shows every group. */
export const ALL_CATEGORIES: StackCategory = 'all'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'
const SIMPLE_ICONS = 'https://cdn.simpleicons.org/'
const SIMPLE_ICONS_MONOCHROME = 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/'

const devicon = (name: string) => `${DEVICON}${name}/${name}-original.svg`
const simpleIcon = (slug: string) => `${SIMPLE_ICONS}${slug}`

/** Groups of technologies, in the order shown on the page (later served by the API). */
export const STACK_GROUPS: TechnologyGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    technologies: [
      { name: 'C#', icon: devicon('csharp') },
      { name: '.NET Core', icon: devicon('dotnetcore') },
      { name: '.NET Framework', icon: devicon('dot-net') },
      { name: 'VB.NET', icon: devicon('visualbasic') },
      { name: 'NHibernate', icon: devicon('nhibernate') },
      { name: 'SignalR', icon: devicon('dot-net') },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    technologies: [
      { name: 'HTML5', icon: devicon('html5') },
      { name: 'CSS3', icon: devicon('css3') },
      { name: 'React', icon: devicon('react') },
      { name: 'Aurelia', icon: simpleIcon('aurelia') },
      { name: 'Knockout.js' },
      { name: 'Blazor', icon: devicon('blazor') },
      { name: 'TypeScript', icon: devicon('typescript') },
      { name: 'JavaScript', icon: devicon('javascript') },
      { name: 'Tailwind CSS', icon: devicon('tailwindcss') },
      { name: 'Bootstrap', icon: devicon('bootstrap') },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    technologies: [
      { name: 'GitHub Copilot', icon: `${simpleIcon('githubcopilot')}/e6e7e9` },
      { name: 'Claude Code', icon: simpleIcon('claude') },
      { name: 'Cursor', icon: `${simpleIcon('cursor')}/e6e7e9` },
      { name: 'OpenAI API', icon: `${SIMPLE_ICONS_MONOCHROME}openai.svg`, monochrome: true },
      { name: 'OpenRouter API', icon: `${simpleIcon('openrouter')}/8a8fa3` },
      { name: 'HuggingFace', icon: simpleIcon('huggingface') },
    ],
  },
  {
    id: 'desktop',
    label: 'Desktop',
    technologies: [
      { name: 'WPF', icon: devicon('dot-net') },
      { name: 'WinForms', icon: devicon('dot-net') },
    ],
  },
  {
    id: 'databases',
    label: 'Bazy danych',
    technologies: [
      { name: 'MSSQL', icon: devicon('microsoftsqlserver') },
      { name: 'Azure SQL', icon: devicon('azuresqldatabase') },
      { name: 'PostgreSQL', icon: devicon('postgresql') },
      { name: 'Oracle DB', icon: devicon('oracle') },
      { name: 'MongoDB', icon: devicon('mongodb') },
      { name: 'Redis', icon: devicon('redis') },
      { name: 'Apache Solr', icon: simpleIcon('apachesolr') },
    ],
  },
  {
    id: 'api',
    label: 'API i komunikacja',
    technologies: [
      { name: 'REST API', icon: simpleIcon('openapiinitiative') },
      { name: 'gRPC', icon: devicon('grpc') },
      { name: 'WCF', icon: devicon('dot-net') },
      { name: 'SOAP', icon: devicon('dot-net') },
      { name: 'MassTransit', icon: devicon('dot-net') },
      { name: 'RabbitMQ', icon: devicon('rabbitmq') },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    technologies: [
      { name: 'Azure Application Insights', icon: devicon('azure') },
      { name: 'Grafana', icon: devicon('grafana') },
    ],
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    technologies: [
      { name: 'Azure DevOps Pipelines', icon: devicon('azuredevops') },
      { name: 'GitHub Actions', icon: devicon('githubactions') },
      { name: 'Docker', icon: devicon('docker') },
      { name: 'Kubernetes', icon: devicon('kubernetes') },
      { name: 'SonarQube', icon: devicon('sonarqube') },
      { name: 'NuGet', icon: devicon('nuget') },
      { name: 'OpenShift', icon: simpleIcon('redhatopenshift') },
    ],
  },
  {
    id: 'vcs',
    label: 'Kontrola wersji',
    technologies: [
      { name: 'Git', icon: devicon('git') },
      { name: 'GitHub', icon: `${simpleIcon('github')}/e6e7e9` },
      { name: 'GitLab', icon: devicon('gitlab') },
      { name: 'SVN', icon: devicon('subversion') },
    ],
  },
  {
    id: 'tests',
    label: 'Testy',
    technologies: [
      { name: 'xUnit', icon: devicon('dot-net') },
      { name: 'NUnit', icon: devicon('dot-net') },
    ],
  },
  {
    id: 'tools',
    label: 'Narzędzia',
    technologies: [
      { name: 'Visual Studio', icon: devicon('visualstudio') },
      { name: 'VS Code', icon: devicon('vscode') },
      { name: 'Rider', icon: devicon('rider') },
      { name: 'SSMS', icon: devicon('microsoftsqlserver') },
      { name: 'DataGrip', icon: devicon('datagrip') },
      { name: 'Azure DevOps', icon: devicon('azuredevops') },
      { name: 'Jira', icon: devicon('jira') },
      { name: 'Postman', icon: devicon('postman') },
      { name: 'Swagger', icon: devicon('swagger') },
      { name: 'Scalar', icon: simpleIcon('openapiinitiative') },
      { name: 'Figma', icon: devicon('figma') },
      { name: 'Gimp', icon: devicon('gimp') },
    ],
  },
]
