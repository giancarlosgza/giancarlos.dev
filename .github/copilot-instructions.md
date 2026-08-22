# AI agent instructions for this repo

This project is a Nuxt 4 (Vue 3.5) starter focused on a typed UI kit, PWA, and SCSS design system. Use these rules to be productive quickly.

## Architecture and conventions
- Nuxt app structure is under `app/`: `layouts/`, `pages/`, `components/`, `assets/`, `composables/`. `public/` holds PWA icons and static assets. Server code (if any) would live under `server/`.
- Styling is by an in-repo SCSS design system: `app/assets/scss/main.scss` composes modules in `abstracts/`, `base/`, `components/`, `layout/`, `utilities/`. Prefer adding styles via these partials, not ad‑hoc `<style>`.
- UI components are colocated under `app/components/ui/**` and use strongly-typed props from `shared/types/**`. Example: `Button.vue` imports `IButtonProps` from `#shared/types/button`.
- Import alias `#shared` resolves to `shared/` via Nuxt’s generated tsconfig; keep using `#shared/...` inside Vue/TS.
- Many UI props accept constrained strings. Follow existing unions and naming, e.g. `variant: 'filled'|'tonal'|'outline'|'text'|'link'|'chip'|'cta'|'gradient'|'frosted'`, `color: 'primary'|'warning'|...`, `size: 'sm'|'md'|'lg'`.
- Dialogs use a small contract: see `app/components/ui/dialog/Modal.vue` and `ConfirmModal.vue` and the d.ts at `shared/types/dialog.d.ts`. Prefer the modern `mode: 'modal'|'side-sheet'|'headless'` + `size: 'sm'|'md'|'lg'` over legacy flags.
- Icons use Material Symbols as HTML entities via `UiIconMaterial` component; pass `icon-code` like `'&#xe88e;'`. Keep semantics with `aria-*`.
- Color mode is via `@nuxtjs/color-mode`. Respect light/dark styles and prefer CSS variables from the design system.
- Component naming (auto-import): `components/app/* => App*`, `ui/* => Ui*`, `layout/* => Layout*`, `state/*` for loading/empty; keep prefixes consistent.
- Component skeleton (only include sections actually used):
```vue
<script setup lang="ts">
/** Interfaces */
interface IProps { /* doc */ color?: string }
interface IEmits { 'update:model-value': [string] }
const props = withDefaults(defineProps<IProps>(), { color: '#ffffff' })
const emit = defineEmits<IEmits>()
/** Data */ // refs
/** Computed */ // computed()
/** Methods */ // functions
</script>
```
- Do NOT add empty comment blocks; never leave unused imports, refs, emits, or props.
- Performance: prefer computed for derived values; avoid watchers unless strictly necessary; debounce expensive color recalculations client-side.
- Never add styles directly in components unless scoped and one-off; prefer SCSS file if reused.
- Keep responses & code minimal—remove stray console logs after implementing feature (only purposeful logs remain for error contexts).
- If uncertain: replicate closest existing page or component, then adapt; consistency > innovation.
- Accessibility: interactive elements need `aria-label` or semantic tags; dialogs must have accessible titles; copy actions use `role="button"` only if not a native button.

## PWA and runtime behavior
- PWA is provided by `@vite-pwa/nuxt` with Workbox. Manifest and assets are configured in `nuxt.config.ts` and `public/`. Use `$pwa` in layouts to show install/update prompts (see `app/layouts/default.vue`).
- Service worker runtime caching already includes Google Fonts and some Google APIs; avoid duplicating patterns.

## Development workflows
- Install: `npm install` (postinstall runs `nuxt prepare`).
- Dev server: `npm run dev` (port configured to 3001 in `nuxt.config.ts`; README mentions 3000 but this template uses 3001).
- Build: `npm run build`; Preview: `npm run preview`.
- Lint: `npm run lint`; Fix: `npm run lint:fix`. ESLint uses `@antfu/eslint-config` with stylistic rules (2 spaces, single quotes, no semis, JSX enabled) and disallows `console` except `console.log`.
- SCSS source maps: `npm run sass:map` generates `app/assets/css` from `app/assets/scss` when you need CSS artifacts; Nuxt otherwise compiles SCSS directly from `main.scss`.
- PWA assets: `npm run generate-pwa-assets` regenerates icons based on `public/icon-pwa.svg` and `pwa-assets.config.ts`.

## Patterns to follow
- Use typed props from `shared/types/**` and keep enums in sync. Example: Button classes are composed in JS based on `variant`, `color`, `size`. Don’t hard-code classes in templates—use the same composition pattern as `app/components/ui/button/Button.vue`.
- For lists/tables, prefer the headless `Datatable.vue` pattern: headers as display titles, items as objects with camelCase keys mapped from headers via `toCamelCase`. Provide `cell-<key>` slots to customize cells.
- Tooltip-enabled actions use `UiButtonTooltip` (wraps `UiButton` + floating-vue); pass `tooltipText`, forward button props, use the `#icon` slot for icon-only buttons.
- Composition utilities live in `app/composables/` (`useToast`, `useDateUtils`, `useTextUtils`). `useToast` expects a `Ref<IToastDisplay|null>` and provides `success|warning|danger` helpers.
- Navigation patterns: mobile bottom bar in `app/components/ui/navigation/NavigationBar.vue`; active route detection uses `useRoute()` and exact path matching.

## Nuxt configuration highlights
- Modules enabled: `@nuxt/fonts`, `@nuxt/image`, `@nuxt/scripts`, `@nuxtjs/color-mode`, `@nuxtjs/robots`, `@nuxtjs/sitemap`, `@vite-pwa/nuxt`, `@vueuse/nuxt`.
- Global CSS: `~/assets/scss/main.scss`. Material Symbols and Floating‑Vue CSS are imported with CSS layers at the end of `main.scss`.
- Site metadata (`site`, `sitemap`, `robots`) and PWA manifest are driven from `nuxt.config.ts`. Set `process.env.BASE_URL` to control absolute URLs.

## Examples
- Button: `<UiButton variant="filled" color="primary" text="Save" @onClick="..." />` or icon-only: `<UiButtonTooltip id="save" icon :tooltip-text="'Save'"><template #icon><UiIconMaterial icon-code="&#xe161;"/></template></UiButtonTooltip>`.
- Dialog confirm: use `ref` to call `showDialog()`; see `ConfirmModal.vue` for emitted `confirm` and `variant`-styled action.
- Datatable: provide `headers` like `['Name','Email','Actions']` and items with keys `name`, `email`; use `<template #cell-actions="{ item }">...</template>`.

## Gotchas
- Port: dev runs on 3001 per `nuxt.config.ts` (override with `npm run dev:host` for LAN testing).
- Readme is the default from Nuxt; trust `nuxt.config.ts` over it when conflicting.
- Alias `#shared` is Nuxt-injected at build time; don’t attempt to configure `paths` manually in `tsconfig.json`.

If anything here seems off or you need additional patterns documented (tests, server routes, more UI modules), comment and we’ll expand this file.
