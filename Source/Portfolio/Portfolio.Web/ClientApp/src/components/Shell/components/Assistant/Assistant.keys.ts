/** Translation keys of the assistant; the texts live in `i18n/locales`. */
export const ASSISTANT_KEYS = {
  title: 'shell.assistant.title',
  subtitle: 'shell.assistant.subtitle',
  placeholder: 'shell.assistant.placeholder',
  note: 'shell.assistant.note',
  launcher: 'shell.assistant.launcher',
  action: 'shell.assistant.action',
  welcome: 'shell.assistant.welcome',
  labels: {
    close: 'shell.assistant.labels.close',
    input: 'shell.assistant.labels.input',
    send: 'shell.assistant.labels.send',
  },
  topics: {
    experience: 'shell.assistant.topics.experience',
    stack: 'shell.assistant.topics.stack',
    project: 'shell.assistant.topics.project',
    collaboration: 'shell.assistant.topics.collaboration',
  },
  fallback: 'shell.assistant.fallback',
  rules: {
    contact: {
      pattern: 'shell.assistant.rules.contact.pattern',
      text: 'shell.assistant.rules.contact.text',
    },
    project: {
      pattern: 'shell.assistant.rules.project.pattern',
      text: 'shell.assistant.rules.project.text',
    },
    stack: {
      pattern: 'shell.assistant.rules.stack.pattern',
      text: 'shell.assistant.rules.stack.text',
    },
    experience: {
      pattern: 'shell.assistant.rules.experience.pattern',
      text: 'shell.assistant.rules.experience.text',
    },
  },
} as const
