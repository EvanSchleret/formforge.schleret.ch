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
One backend source of truth for form schema, immutable revisions, secure HTTP APIs, staged uploads, and automation-ready submissions. Pair it with FormForge Client to render and manage forms in Nuxt 4.

#links
  :::u-button
  ---
  to: /getting-started
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Start in 5 minutes
  :::

  :::u-button
  ---
  to: https://github.com/EvanSchleret/FormForge/stargazers
  size: xl
  color: neutral
  variant: outline
  icon: i-lucide-github
  target: _blank
  ---
  Star FormForge
  :::

  :::u-button
  ---
  to: https://github.com/EvanSchleret/FormForgeClient/stargazers
  size: xl
  color: neutral
  variant: outline
  icon: i-lucide-github
  target: _blank
  ---
  Star FormForge Client
  :::

#default
  :::prose-pre
  ---
  code: |
    composer require evanschleret/formforge
    php artisan formforge:install
    php artisan migrate

    bun add @evanschleret/formforgeclient
  filename: quickstart.sh
  ---

  ```bash [quickstart.sh]
  composer require evanschleret/formforge
  php artisan formforge:install
  php artisan migrate

  bun add @evanschleret/formforgeclient
  ```
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
  icon: i-lucide-route
  ---
  #title
  Scoped routes with owner context

  #description
  Run endpoints under prefixes like `/users/{user}` or `/teams/{team}` and resolve ownership directly from route params.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield
  ---
  #title
  Policy or gate authorization

  #description
  Add fail-closed authorization with scoped policy mode, endpoint abilities, and ownership-aware access checks.
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
  icon: i-lucide-sliders-horizontal
  ---
  #title
  Controlled and admin mode

  #description
  Use composables for custom UX, scoped calls, categories, response moderation, revisions, and diff workflows.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-bot
  ---
  #title
  Submission automations

  #description
  Register sync or queued automation handlers to execute app business logic immediately after persisted submissions.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-file-down
  ---
  #title
  Response exports (CSV/JSONL)

  #description
  Export submissions by form/version/date filters via HTTP, Facade, or Artisan for BI pipelines, audits, and data workflows.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-shield-ellipsis
  ---
  #title
  GDPR retention engine

  #description
  Apply global, form-level, or response-level privacy policies with anonymization/deletion actions and dry-run controls.
  :::
::

::u-page-section{class="dark:bg-neutral-950"}
#title
AI-ready docs with MCP Toolkit
#description
`@nuxtjs/mcp-toolkit` is integrated. This wiki is exposed as an MCP server so AI assistants can discover and read your docs.

#links
  :::u-button
  ---
  to: /mcp
  color: neutral
  variant: outline
  icon: i-lucide-plug
  ---
  Open MCP endpoint
  :::

  :::u-button
  ---
  to: /mcp-ai
  icon: i-lucide-book-open
  color: neutral
  variant: outline
  ---
  Read MCP/AI guide
  :::

  :::u-button
  ---
  to: /mcp-ai/connect-your-client
  icon: i-lucide-settings-2
  color: primary
  variant: solid
  ---
  Configure your MCP client
  :::

::card-group
  :::card
  ---
  title: Built-in tools
  icon: i-lucide-wrench
  ---
  `list-pages` and `get-page` are live and let assistants discover and read wiki content.
  :::

  :::card
  ---
  title: Zero-config discovery
  icon: i-lucide-folder-search
  ---
  Add files under `server/mcp/tools`, `server/mcp/prompts`, and `server/mcp/resources`.
  :::

  :::card
  ---
  title: Works with common IDEs
  icon: i-lucide-message-circle
  ---
  Connect from Cursor, VS Code, Claude Code, and other MCP clients with the `/mcp` URL.
  :::
::
::

::u-page-section{class="dark:bg-gradient-to-b from-neutral-950 to-neutral-900"}
  :::callout
  ---
  icon: i-lucide-star
  color: warning
  variant: subtle
  ---
  If this wiki helped you ship faster, starring the repos has a direct impact on roadmap visibility and adoption.
  :::

  :::card-group
    ::::card
    ---
    title: FormForge (Laravel backend)
    icon: i-lucide-database
    to: https://github.com/EvanSchleret/FormForge/stargazers
    target: _blank
    ---
    [![FormForge Stars](https://img.shields.io/github/stars/EvanSchleret/FormForge?style=for-the-badge&logo=github)](https://github.com/EvanSchleret/FormForge/stargazers)
    ::::

    ::::card
    ---
    title: FormForge Client (Nuxt frontend)
    icon: i-lucide-monitor
    to: https://github.com/EvanSchleret/FormForgeClient/stargazers
    target: _blank
    ---
    [![FormForge Client Stars](https://img.shields.io/github/stars/EvanSchleret/FormForgeClient?style=for-the-badge&logo=github)](https://github.com/EvanSchleret/FormForgeClient/stargazers)
    ::::
  :::

  :::u-page-c-t-a
  ---
  links:
    - label: FormForge backend package
      to: 'https://github.com/EvanSchleret/FormForge'
      target: _blank
      icon: i-lucide-github
    - label: FormForge Client package
      to: 'https://github.com/EvanSchleret/FormForgeClient'
      target: _blank
      variant: subtle
      icon: i-lucide-github
  title: Ship forms with confidence
  description: Keep business rules centralized, expose only what you need, and scale from one form to multi-owner production workflows.
  class: dark:bg-neutral-950
  ---
::
