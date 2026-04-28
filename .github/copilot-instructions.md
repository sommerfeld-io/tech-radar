# GitHub Copilot Instructions

## Commit Messages: Conventional Commits

Always use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) for every commit message.

**Format:** `<type>[optional scope]: <description>`

| Type | Effect | When to use |
|------|--------|-------------|
| `fix` | PATCH release | Patches a bug |
| `feat` | MINOR release | Introduces a new feature |
| `BREAKING CHANGE` footer | MAJOR release | Introduces a breaking API change |
| `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test` | No release | All other changes |

**Rules:**
- A scope may be added in parentheses for extra context: `feat(parser): add ability to parse arrays`
- Breaking changes must include `BREAKING CHANGE:` in the footer: `feat: drop support for Node 6`
- Commit message titles must also match the project pattern: `^(fix|feat|build|chore|ci|docs|style|refactor|perf|test)/[a-z0-9._-]+$`

Write commit messages using the Conventional Commits format, ensuring the header (`type(scope): summary`) is clear and descriptive, as it will be displayed on GitHub release pages and used for changelogs. Focus the header on user-visible, meaningful change descriptions and avoid vague wording. Always document breaking changes explicitly in the footer using `BREAKING CHANGE:` (do not use the `!` notation).

## Project Overview

A tech radar visualization tool. [`radar/radar.yml`](../radar/radar.yml) is the single source of truth — a Node.js build step ([`radar/build.js`](../radar/build.js)) transforms it into [`radar/public/radar-data.json`](../radar/public/radar-data.json), served by an Nginx Docker image. **Never edit `radar-data.json` directly.**

The core visualization code (HTML/CSS/JS) is AI-generated. Dockerfile, pipelines, and task config are human-maintained.

## Key Commands

Use [Taskfile](../taskfile.yml) for all local operations — do not run `npm` or `docker` commands directly.

| Task | Purpose |
|------|---------|
| `task radar:build` | `npm install` + transform `radar.yml` → `radar-data.json` |
| `task radar:run` | Build + serve radar at `http://localhost:8080` |
| `task lint` | Run all linters via Docker Compose |
| `task docker:build` | Lint Dockerfile + build Docker image |
| `task docker:run` | Build image + run container |
| `task cleanup` | Full cleanup (Docker containers/volumes + filesystem) |

## Radar Data (`radar/radar.yml`)

Root keys: `title`, `description`, `copyright`, `githubUrl`
Arrays: `quadrants` (4 items with `name`, `color`, `description`), `rings` (4 items), `technologies` (flat list with `name`, `quadrant`, `ring`)

After editing `radar.yml`, run `task radar:build` to regenerate `radar-data.json`.

## Naming Conventions

Enforced by [`.ls-lint.yml`](../.ls-lint.yml) and [`.folderslintrc`](../.folderslintrc):

- YAML, JSON, shell scripts: `kebab-case`
- Directories: only whitelisted names (see `.folderslintrc`)
- `Dockerfile`, `Vagrantfile`: `PascalCase`

## Linting

Run `task lint` before every PR. The [`lint-and-fix` skill](skills/lint-and-fix/SKILL.md) automates running linters and fixing errors.

- **YAML** ([`.yamllint.yml`](../.yamllint.yml)): max line length 150, Unix line endings. GitHub Actions `on:` key requires `# yamllint disable-line rule:truthy`
- **Markdown links** ([`.lychee.toml`](../.lychee.toml)): accepts HTTP 200 & 429
- **Dockerfile** ([`.hadolint.yml`](../.hadolint.yml)): hadolint
- **Filenames/folders**: ls-lint + folderslint

## Pre-commit Hooks

[`.pre-commit-config.yaml`](../.pre-commit-config.yaml) runs `task lint` + `task docker:build` before every commit. Activate once after cloning: `pre-commit install`.
