# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository combines two coupled artifacts:

1. A **Quarto documentation website** (bilingual: `zh/` and `en/`) that publishes deep-learning-from-scratch notes as `.qmd` files rendered to `_site/`.
2. A small **Python package** `deep_learning` (under `deep_learning/deep_learning/`) providing educational neural-network implementations referenced by the notes.

`AGENTS.md` is the authoritative contributor guide — read it for project conventions. This file supplements, not duplicates, it.

## Common Commands

### Quarto website (documentation)

```bash
quarto render                 # render full site to _site/ (CI runs with --no-execute)
quarto preview                # local preview server while editing .qmd
quarto convert path/to/file.qmd  # inspect as notebook when needed
```

Per `_quarto.yml`: `execute.eval: false` — code blocks in `.qmd` are NOT executed during render by default. Do not expect outputs to be regenerated locally; treat existing rendered content as authoritative unless explicitly re-running.

### Python package (`deep_learning/`)

Conda environment for this project: `cs_hw`. Run all Python commands through it, e.g. `conda run -n cs_hw python ...`.

```bash
cd deep_learning
python -m pip install -e ".[test]"          # editable install with pytest
python -m pytest deep_learning/tests         # run full test suite
python -m pytest deep_learning/tests/test_nn_attention.py::test_name  # single test
python -m build --outdir dist ./deep_learning  # build sdist+wheel (CI step)
```

`deep_learning/deep_learning/tests/conftest.py` inserts the package root on `sys.path`, so tests run without installation — but the editable install is still recommended for dev.

### Lint & format (Ruff)

```bash
ruff check .      # lint
ruff format .     # format
```

CI runs `ruff format --check --diff` scoped to `deep_learning/deep_learning` and `deep_learning/deep_learning/tests` (see `.github/workflows/deep-learning-ci.yml`). Code must already be ruff-formatted or CI fails.

## Architecture

### Two-source-of-truth: notes ↔ package

The `.qmd` notes import and demonstrate the `deep_learning` package. When changing package code:

- Tests in `deep_learning/deep_learning/tests/` must keep passing (CI gates this on Python 3.10).
- Notes that reference changed APIs need their `.qmd` code blocks updated to match — but since `eval: false`, broken code won't surface in render. Verify by reading or by running the snippet manually.

### Package layout

`deep_learning/deep_learning/nn/` mirrors `torch.nn` conventions intentionally:
- `nn/` — module-level classes (`attention.py`, `transformer.py`, `autoencoder.py`, `diffusion.py`, `unet.py`, `positional_encoding.py`)
- `nn/functional/` — stateless functions (`attention.py`, `diffusion.py`, `flash_attention.py`, `loss.py`)
- All modules re-export via `__init__.py` with `*` imports, so `from deep_learning.nn import Transformer` works.

### Bilingual chapter mirroring

`zh/` and `en/` directories are intentionally parallel. Chapter directories must match across languages (e.g., `zh/chapter01-introduction/` ↔ `en/chapter01-introduction/`). Note the existing typo `chatper02-pytorch-introduction` is replicated in both locales for consistency — preserve it when adding files; do not "fix" it on one side only.

Each locale has its own `_metadata.yml` setting `sidebar` and `lang`. The `_quarto.yml` sidebar config references glob patterns like `zh/chatper02-pytorch-introduction/*.qmd`, so new chapter files appear automatically once placed in the right directory.

### CI workflows (two independent pipelines)

- `.github/workflows/publish.yml` — triggers on `.qmd`/`.md`/`_quarto.yml`/bib/css changes; renders with `quarto render --no-execute` and deploys to GitHub Pages.
- `.github/workflows/deep-learning-ci.yml` — triggers only on `deep_learning/**` changes; runs ruff format check, pytest, and `python -m build`.

These are decoupled: docs-only changes do not run Python tests, and package-only changes do not re-render the site. When a change touches both (e.g., updating a snippet that demonstrates new package behavior), verify both locally.

## Conventions

- Commit style: Conventional Commits (`feat:`, `docs:`, `refactor:`) — see `git log`.
- Python: 4-space indent, line length 88, single quotes (ruff `quote-style = "single"`), Python 3.10+ target.
- Top-level `ruff.toml` targets `py314`; `deep_learning/ruff.toml` targets `py310`. The package-level config is the one CI enforces — do not apply py314 rules to package code.
- Do not commit `_site/`, `_freeze/` (unless intentional), virtualenvs, or `.ipynb_checkpoints/`. The `.gitignore` is comprehensive.
- `requirements.txt` pins a heavier env (torch, torchvision, transformers, diffusers, jupyter, etc.) for running notebooks locally; the package itself only requires `numpy` and `torch` (see `pyproject.toml`).
