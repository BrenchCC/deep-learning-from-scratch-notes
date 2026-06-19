# Deep-Learning-From-Scratch-Notes

Modern academic notes for learning deep learning from first principles.

The project combines a Quarto website with a small companion Python package.
The notes focus on three passes through each topic: formula, diagram, and code.

## Website

Render the HTML website:

```bash
quarto render --profile html --no-execute
```

Export notebooks:

```bash
quarto render --profile jupyter
```

Render Typst books:

```bash
quarto render --profile typst-zh
quarto render --profile typst-en
```

## Python Package

Install the companion package in editable mode:

```bash
cd deep_learning
python -m pip install -e ".[test,dev]"
```

Run package tests:

```bash
cd deep_learning
python -m pytest deep_learning/tests
```

## License

The notes are licensed under CC BY-NC. The companion Python package is licensed
under MIT.
