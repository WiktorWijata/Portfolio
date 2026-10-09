/**
 * Shared base for every `*Button` in the design system: the cursor and disabled-state treatment
 * that has nothing to do with a button's own shape or colour. Compose it with each button's own
 * layout, transition and `focus-ring`/`focus-ring-tight` classes — those still vary per button and
 * are not part of this base.
 */
export const INTERACTIVE_BASE_CLASSES = 'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
