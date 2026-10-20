/** Translation keys of the docs app (namespace `docs`); the texts live in `docs/i18n/locales`. */
export const DOCS_KEYS = {
  app: {
    designSystem: 'app.designSystem',
    sidebarHeader: 'app.sidebarHeader',
    sidebarLabel: 'app.sidebarLabel',
    allComponents: 'app.allComponents',
    theme: 'app.theme',
    themeDark: 'app.themeDark',
    themeDarkAria: 'app.themeDarkAria',
    themeLight: 'app.themeLight',
    themeLightAria: 'app.themeLightAria',
    language: 'app.language',
    componentCount: 'app.componentCount',
    mainNav: 'app.mainNav',
    sections: {
      overview: 'app.sections.overview',
      changelog: 'app.sections.changelog',
      components: 'app.sections.components',
      themes: 'app.sections.themes',
    },
  },
  categories: {
    general: 'categories.general',
    layout: 'categories.layout',
    navigation: 'categories.navigation',
    data: 'categories.data',
    forms: 'categories.forms',
    overlays: 'categories.overlays',
  },
  componentsIndex: {
    kicker: 'componentsIndex.kicker',
    title: 'componentsIndex.title',
    text: 'componentsIndex.text',
    stats: 'componentsIndex.stats',
  },
  search: {
    placeholder: 'search.placeholder',
    label: 'search.label',
    noResults: 'search.noResults',
  },
  componentPage: {
    breadcrumb: 'componentPage.breadcrumb',
    previous: 'componentPage.previous',
    next: 'componentPage.next',
    usage: 'componentPage.usage',
    props: {
      title: 'componentPage.props.title',
      description: 'componentPage.props.description',
    },
    tokens: {
      title: 'componentPage.tokens.title',
      description: 'componentPage.tokens.description',
    },
    builtFrom: {
      title: 'componentPage.builtFrom.title',
      description: 'componentPage.builtFrom.description',
    },
  },
  changelog: {
    kicker: 'changelog.kicker',
    title: 'changelog.title',
    text: 'changelog.text',
    added: 'changelog.added',
    changed: 'changelog.changed',
    fixed: 'changelog.fixed',
    dateLocale: 'changelog.dateLocale',
  },
  props: {
    columns: {
      name: 'props.columns.name',
      type: 'props.columns.type',
      default: 'props.columns.default',
      description: 'props.columns.description',
    },
    extends: 'props.extends',
    unionOf: 'props.unionOf',
    typeLabel: 'props.typeLabel',
    missing: 'props.missing',
    required: 'props.required',
  },
  tokens: {
    none: 'tokens.none',
    columns: {
      token: 'tokens.columns.token',
      value: 'tokens.columns.value',
      usage: 'tokens.columns.usage',
    },
    categories: {
      colors: 'tokens.categories.colors',
      sizes: 'tokens.categories.sizes',
      fonts: 'tokens.categories.fonts',
      radii: 'tokens.categories.radii',
      shadows: 'tokens.categories.shadows',
      breakpoints: 'tokens.categories.breakpoints',
    },
    roles: {
      background: 'tokens.roles.background',
      textColor: 'tokens.roles.textColor',
      border: 'tokens.roles.border',
      outline: 'tokens.roles.outline',
      fill: 'tokens.roles.fill',
      stroke: 'tokens.roles.stroke',
      caret: 'tokens.roles.caret',
      divider: 'tokens.roles.divider',
      gradient: 'tokens.roles.gradient',
      layoutChange: 'tokens.roles.layoutChange',
      color: 'tokens.roles.color',
      fontSize: 'tokens.roles.fontSize',
      placeholderColor: 'tokens.roles.placeholderColor',
      radius: 'tokens.roles.radius',
      shadow: 'tokens.roles.shadow',
      fontFamily: 'tokens.roles.fontFamily',
      arbitraryValue: 'tokens.roles.arbitraryValue',
    },
    footnote: 'tokens.footnote',
  },
  codeBlock: {
    copy: 'codeBlock.copy',
    copied: 'codeBlock.copied',
  },
  overview: {
    kicker: 'overview.kicker',
    title: 'overview.title',
    text: 'overview.text',
    browse: 'overview.browse',
    seeChangelog: 'overview.seeChangelog',
    stats: {
      components: 'overview.stats.components',
      categories: 'overview.stats.categories',
      colors: 'overview.stats.colors',
    },
    principlesTitle: 'overview.principlesTitle',
    principles: {
      colors: {
        title: 'overview.principles.colors.title',
        body: 'overview.principles.colors.body',
      },
      tokens: {
        title: 'overview.principles.tokens.title',
        body: 'overview.principles.tokens.body',
      },
      fidelity: {
        title: 'overview.principles.fidelity.title',
        body: 'overview.principles.fidelity.body',
      },
    },
    colorsTitle: 'overview.colorsTitle',
    typographyTitle: 'overview.typographyTitle',
    stackTitle: 'overview.stackTitle',
    fields: {
      version: 'overview.fields.version',
      framework: 'overview.fields.framework',
      style: 'overview.fields.style',
      icons: 'overview.fields.icons',
      fonts: 'overview.fields.fonts',
    },
  },
  themes: {
    kicker: 'themes.kicker',
    title: 'themes.title',
    text: 'themes.text',
    groups: {
      surfaces: 'themes.groups.surfaces',
      lines: 'themes.groups.lines',
      content: 'themes.groups.content',
      accent: 'themes.groups.accent',
      links: 'themes.groups.links',
      tones: 'themes.groups.tones',
      decoration: 'themes.groups.decoration',
      overlays: 'themes.groups.overlays',
    },
    howTo: {
      title: 'themes.howTo.title',
      steps: {
        copy: 'themes.howTo.steps.copy',
        register: 'themes.howTo.steps.register',
        check: 'themes.howTo.steps.check',
        use: 'themes.howTo.steps.use',
      },
    },
    rules: {
      title: 'themes.rules.title',
      items: {
        raw: 'themes.rules.items.raw',
        alpha: 'themes.rules.items.alpha',
        read: 'themes.rules.items.read',
        attribute: 'themes.rules.items.attribute',
      },
    },
  },
  entries: {
    architecturediagram: {
      summary: 'entries.architecturediagram.summary',
      note: 'entries.architecturediagram.note',
    },
    badge: {
      summary: 'entries.badge.summary',
    },
    chip: {
      summary: 'entries.chip.summary',
      note: 'entries.chip.note',
    },
    list: {
      summary: 'entries.list.summary',
      note: 'entries.list.note',
    },
    gallery: {
      summary: 'entries.gallery.summary',
      note: 'entries.gallery.note',
    },
    card: {
      summary: 'entries.card.summary',
      note: 'entries.card.note',
    },
    input: {
      summary: 'entries.input.summary',
    },
    textarea: {
      summary: 'entries.textarea.summary',
    },
    searchfield: {
      summary: 'entries.searchfield.summary',
      note: 'entries.searchfield.note',
    },
    text: {
      summary: 'entries.text.summary',
      note: 'entries.text.note',
    },
    label: {
      summary: 'entries.label.summary',
      note: 'entries.label.note',
    },
    button: {
      summary: 'entries.button.summary',
    },
    toolbarbutton: {
      summary: 'entries.toolbarbutton.summary',
    },
    iconbutton: {
      summary: 'entries.iconbutton.summary',
    },
    railbutton: {
      summary: 'entries.railbutton.summary',
      note: 'entries.railbutton.note',
    },
    link: {
      summary: 'entries.link.summary',
      note: 'entries.link.note',
    },
    container: {
      summary: 'entries.container.summary',
    },
    panel: {
      summary: 'entries.panel.summary',
    },
    splitpanel: {
      summary: 'entries.splitpanel.summary',
      note: 'entries.splitpanel.note',
    },
    statusbar: {
      summary: 'entries.statusbar.summary',
      note: 'entries.statusbar.note',
    },
    titlebar: {
      summary: 'entries.titlebar.summary',
      note: 'entries.titlebar.note',
    },
    menu: {
      summary: 'entries.menu.summary',
      note: 'entries.menu.note',
    },
    tabs: {
      summary: 'entries.tabs.summary',
      note: 'entries.tabs.note',
    },
    solutionexplorer: {
      summary: 'entries.solutionexplorer.summary',
      note: 'entries.solutionexplorer.note',
    },
    guide: {
      summary: 'entries.guide.summary',
      note: 'entries.guide.note',
    },
    terminal: {
      summary: 'entries.terminal.summary',
      note: 'entries.terminal.note',
    },
    chat: {
      summary: 'entries.chat.summary',
      note: 'entries.chat.note',
    },
    chatlauncher: {
      summary: 'entries.chatlauncher.summary',
      note: 'entries.chatlauncher.note',
    },
  },
} as const
