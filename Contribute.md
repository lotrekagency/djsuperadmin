---
url: /djsuperadmin/Contribute.md
---
# Contributing to djsuperadmin

First off, thanks for taking the time to contribute! 🎉

**djsuperadmin** is a tiny Django app (no runtime dependencies except Django) that
lets superusers edit page contents inline in the browser. It's MIT licensed and
maintained by [Lotrèk](https://www.lotrek.it/). Every contribution helps — bug
reports, docs fixes, and code all count.

This guide explains how to report issues, set up a development environment, and get
your changes merged.

## Reporting bugs

Found something broken? Please open an issue on the
[issue tracker](https://github.com/lotrekagency/djsuperadmin/issues).

A good bug report includes:

* Your Django and Python versions (djsuperadmin is tested from Django 2.2 to 6.0 on
  Python 3.6+).
* The template tags you're using and a minimal snippet that reproduces the problem.
* What you expected to happen vs. what actually happened, plus any traceback.

Before opening a new issue, take a quick look through the existing ones — someone may
have already reported it.

## Suggesting enhancements

Enhancement ideas are welcome on the same
[issue tracker](https://github.com/lotrekagency/djsuperadmin/issues). Describe the use
case you're trying to solve and, if you can, sketch how the API might look. Keep in
mind that a core goal of this project is to stay small and dependency-free, so we tend
to favour focused, minimal additions.

## Your first code contribution

Unsure where to begin? Issues labelled `good first issue` or `help wanted` are a great
place to start. In general the flow is:

1. Fork the repository and clone your fork.
2. Set up your environment (see below) and run the tests to confirm everything works.
3. Create a branch, make your change, add or update tests, and open a pull request.

## Development setup

### Prerequisites

* **Python** with [uv](https://docs.astral.sh/uv/) — manages the virtualenv and Python
  dependencies.
* **Node** with [pnpm](https://pnpm.io/) — builds the JS bundle and the docs.

### Install

Clone the repo and install everything with one command:

```bash
make install
```

This runs `uv sync --dev` (Python deps + dev tools into a managed virtualenv) and
`pnpm install` (JS toolchain for the Vite bundle and VitePress docs).

### Chore commands

All common tasks are wrapped in the `Makefile`:

| Command | What it does |
| --- | --- |
| `make install` | `uv sync --dev && pnpm install` — set up Python + JS deps |
| `make test` | Run `flake8` on `djsuperadmin`, then `pytest` with coverage |
| `make format` | Format the codebase with `black` |
| `make lint` | Lint `djsuperadmin` with `flake8` |
| `make build` | `pnpm run build` — rebuild `djsuperadmin/dist/djsuperadmin.bundle.js` with Vite |
| `make migrations` | `uv run python manage.py makemigrations` |
| `make docs-dev` | Serve the VitePress docs locally with hot reload |
| `make docs-build` | Build the static docs site |
| `make docs-preview` | Preview the built docs site |

Tests live in `tests/` (pytest + pytest-django). The example/demo project lives in
`example/`.

### Running the demo app

The example project doubles as the test project (settings module
`example.djsuperadmin_example.settings`). To run it locally:

```bash
uv run python manage.py migrate
uv run python manage.py createsuperuser
uv run python manage.py runserver
```

Then log in at `/admin/` and open `/` — as a superuser you'll see the editable
content regions inline on the page.

### Rebuilding the JS bundle

djsuperadmin ships a small JS bundle (built with [Vite](https://vitejs.dev/)) that is
injected into the page by the `{% djsuperadminjs %}` tag; it lazy-loads SunEditor from
a CDN for the WYSIWYG editor. If you change anything under the frontend sources, rebuild
the bundle:

```bash
make build
```

This regenerates `djsuperadmin/dist/djsuperadmin.bundle.js`. Commit the rebuilt bundle
alongside your source changes.

## Coding conventions

* **Formatting:** we use [black](https://black.readthedocs.io/). Run `make format`
  before committing.
* **Linting:** code must pass [flake8](https://flake8.pycqa.org/) — run `make lint`
  (also part of `make test`).
* Keep the project dependency-free: don't add runtime dependencies beyond Django.
* Add or update tests for any behaviour change, and make sure `make test` is green.

## Commit conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/). This is not
just for tidiness — releases are automated with
[python-semantic-release](https://python-semantic-release.readthedocs.io/), which
derives the next version number and changelog directly from your commit messages.

Use messages like:

```
feat: add in-place editing for raw contents
fix: correct html replacement in nested elements
docs: document the superadmin_raw_content tag
chore: bump dev dependencies
```

Rough guide to what each type triggers:

* `fix:` → patch release
* `feat:` → minor release
* a `BREAKING CHANGE:` footer (or `!` after the type) → major release
* `docs:`, `chore:`, `test:`, `refactor:`, etc. → no release on their own

## Pull request process

1. Branch off `master` and keep your changes focused.
2. Run `make format` and `make test` locally — both should pass.
3. If you touched the frontend, run `make build` and commit the updated bundle.
4. Write clear, [Conventional Commits](https://www.conventionalcommits.org/)-style
   commit messages.
5. Open a pull request against `lotrekagency/djsuperadmin`, describing the change and
   linking any related issue.

A maintainer will review your PR, and CI will run the test suite. Once it's approved
and green, it will be merged.

## Release flow

Releases are cut by maintainers, not on every merge. When it's time, the manual
**Release** GitHub Actions workflow (`workflow_dispatch`) runs
python-semantic-release: it reads the Conventional Commits since the last tag,
determines the new version, updates the changelog, builds the package with `uv`, and
publishes it to [PyPI](https://pypi.org/project/djsuperadmin/). Writing good commit
messages is what makes this work — thank you for keeping them clean!
