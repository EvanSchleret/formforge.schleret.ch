---
seo:
  title: FormForge Wiki
  description: Official wiki for FormForge (Laravel backend) and FormForge Client (Nuxt 4).
---

::u-page-hero{class="relative overflow-hidden dark:bg-gradient-to-b from-neutral-900 to-neutral-950"}
---
orientation: horizontal
---
#top
  ::div{class="pointer-events-none absolute inset-x-0 top-0 h-[34rem] overflow-hidden hero-stars-fade"}
  :stars-bg{color="#00DC82" star-count="420" class="opacity-85"}
  :hero-background{class="opacity-75"}
  <div class="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/8 to-transparent"></div>
  ::

#title
Build deterministic forms with [FormForge]{.text-primary}.

#description
Build forms in Laravel and Nuxt with one schema, secure APIs, and a clear path to production.

#links
  :::u-button
  ---
  to: /docs/getting-started/installation/backend
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Start in 5 minutes
  :::

  :::u-button
  ---
  to: https://github.com/EvanSchleret/FormForge
  size: xl
  color: neutral
  variant: outline
  icon: i-lucide-github
  target: _blank
  ---
  View on GitHub
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
Choose your integration path
#description
Start narrow, keep a deterministic backend core, then scale to advanced API and frontend workflows.

#features
  :::u-page-feature
  ---
  icon: i-lucide-server
  ---
  #title
  Backend only

  #description
  Define and submit forms in Laravel code using the `Form` facade without exposing package HTTP routes.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-globe
  ---
  #title
  Backend HTTP API

  #description
  Expose built-in FormForge endpoints with configurable auth, middleware, abilities, and strict server-side validation.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-monitor
  ---
  #title
  Renderer mode (ship fast)

  #description
  Mount `<FormForgeRenderer>` with a form key and go live fast with built-in fetch, progress, and submit handling.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-layers-3
  ---
  #title
  Standalone builder and preview

  #description
  Expose save and publish from your own toolbar, hide settings for system forms, and keep renderer navigation visible in playground-style previews.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sliders-horizontal
  ---
  #title
  Controlled and admin mode

  #description
  Use composables for custom UX, scoped calls, categories, response moderation, revisions, and diff workflows.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-panels-top-left
  ---
  #title
  Full FormForge stack

  #description
  Combine the Laravel backend and FormForge Client when you need a complete builder, renderer, and submission workflow.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
AI-ready docs with MCP Toolkit
#description
Connect an MCP-compatible assistant to discover and read FormForge documentation as a source of truth.

#features
  :::u-page-feature
  ---
  icon: i-lucide-search
  ---
  #title
  Discover documentation
  #description
  Use `list-pages` to explore the complete documentation surface before selecting the exact page to read.
  :::
  :::u-page-feature
  ---
  icon: i-lucide-file-text
  ---
  #title
  Read exact pages
  #description
  Use `get-page` to retrieve the full Markdown source, examples, and resolution rules for a known path.
  :::
  :::u-page-feature
  ---
  icon: i-lucide-bot
  ---
  #title
  Connect your client
  #description
  Configure Cursor, VS Code, Claude Code, Codex-compatible clients, or any HTTP MCP client.
  :::
::
