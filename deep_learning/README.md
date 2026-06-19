# Deep Learning Notes Library

Small educational deep learning components used by
Deep-Learning-From-Scratch-Notes.

The package is intentionally lightweight. It collects reusable modules that make
the notes easier to run without turning the project into a general-purpose deep
learning framework.

## Install

Install the package in editable mode while working through the notes:

```bash
python -m pip install -e ".[test,dev]"
```

Run the test suite from the package directory:

```bash
python -m pytest deep_learning/tests
```

## Package Layout

- `deep_learning.nn` contains reusable neural network building blocks.
- `deep_learning.nn.functional` contains stateless tensor functions.
- `deep_learning.optim` contains educational optimizer implementations.
- `deep_learning.models` contains model-family examples used by the notes.

## Examples

```python
import torch

import deep_learning.nn as dnn

attn = dnn.MultiheadAttention(embed_dim=16, num_heads=4)

query = torch.randn(2, 8, 16)
key = torch.randn(2, 8, 16)
value = torch.randn(2, 8, 16)

output, weights = attn(query, key, value)
```

```python
import torch

from deep_learning.optim import AdamW

parameter = torch.nn.Parameter(torch.tensor([1.0]))
optimizer = AdamW([parameter], lr=1e-3)
```

## License

This package is licensed under the MIT License.
