# Repository Guidelines

## Project Structure & Module Organization

This repository combines a Quarto documentation website with a small Python deep learning package.

- `_quarto.yml` configures the website, navigation, rendering scope, bibliography, and output directory.
- `zh/` and `en/` contain localized Quarto chapters and landing pages.
- `assets/` stores shared website assets such as the favicon.
- `deep_learning/deep_learning/` contains the Python package, with neural network modules under `nn/`.
- `deep_learning/deep_learning/tests/` contains pytest tests for package behavior.
- `refs_article.bib`, `refs_media.bib`, and `style.css` support citations and site styling.

## Build, Test, and Development Commands

- `quarto render`: render the full documentation website into `_site/`.
- `quarto preview`: run a local preview server for editing `.qmd` pages.
- `quarto convert path/to/file.qmd`: convert a Quarto page when notebook inspection is useful.
- `cd deep_learning && python -m pip install -e ".[test]"`: install the package and test extras for local development.
- `cd deep_learning && pytest`: run the Python test suite.
- `ruff check .` and `ruff format .`: lint and format Python files according to repository Ruff settings.

Use the `cs_hw` Conda environment for local Python execution when running project scripts or tests through an activated environment.

## Coding Style & Naming Conventions

Use Quarto Markdown (`.qmd`) for notes and keep chapter paths aligned between `zh/` and `en/` where possible. Write clear section headings, readable math, and concise explanations.

Python code uses 4-space indentation, a line length of 88, single quotes from Ruff formatting, and Python 3.10+ package compatibility. Use descriptive module names in lowercase with underscores, and name tests `test_*.py`.

## Testing Guidelines

Python tests use pytest. Add or update tests under `deep_learning/deep_learning/tests/` when changing package behavior, especially tensor shapes, attention behavior, diffusion utilities, or model outputs. Prefer focused tests that verify observable behavior rather than implementation details.

For documentation changes, run `quarto render` before opening a pull request and check that math, links, code blocks, citations, and bilingual navigation still render correctly.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit-style prefixes such as `feat:`, `docs:`, and `refactor:`. Keep commit messages short and scoped, for example `docs: add attention chapter notes` or `feat: implement transformer block`.

Pull requests should include a concise summary, the verification commands run, and screenshots only when visual rendering changes. Link related issues for large additions or structural changes.

## Security & Configuration Tips

Do not commit generated `_site/` output, local virtual environments, caches, notebooks checkpoints, or private credentials. Keep executable code examples deterministic and avoid network-dependent behavior unless the chapter explicitly requires it.
