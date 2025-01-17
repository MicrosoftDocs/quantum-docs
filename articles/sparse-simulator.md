---
author: SoniaLopezBravo
description: Learn how to run your Q# programs on the Azure Quantum Development Kit sparse simulator.
ms.author: sonialopez
ms.date: 01/13/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: concept-article
no-loc: ['Q#', '$$v', Quantum Development Kit, target, targets]
title: Sparse quantum simulator 
uid: microsoft.quantum.machines.overview.sparse-simulator
---

# Sparse quantum simulator

The sparse simulator is the default local simulator for Azure Quantum development environments, and utilizes a sparse representation of quantum state vectors. This feature allows the sparse simulator to minimize the memory footprint used to represent quantum states, thus enabling simulations over a larger number of qubits. The sparse simulator is efficient for representing quantum states that are sparse in the computational basis, that is, quantum states for which most of the amplitude coefficients are zero in the computational basis. As such, the sparse simulator enables users to explore larger applications than what can be represented using a full-state simulator which will waste both memory and time on an exponentially large number of zero-amplitudes.

For more information about the sparse simulator, please see [Jaques and Häner (arXiv:2105.01533)](https://arxiv.org/abs/2105.01533).

## Calling the sparse simulator

The sparse simulator is the default local simulator in Visual Studio Code with the Azure Quantum Development Kit extension installed, and in the Azure Quantum portal. 

| Scenario | Method |
|----------|--------|
|**In a Q# program in VS Code**  | Select **Run Q# file** |
|**In a Python notebook cell**  | `result=qsharp.eval("Program_Entry_Operation()")`<br>or<br>`result=qsharp.run("Program_Entry_Operation()", shots=##)` |
|**In a `%%qsharp` notebook cell**  | `Program_Entry_Operation()` |


## Adding Pauli noise to the sparse simulator

The sparse simulator supports the addition of Pauli noise to the simulation. This feature allows you to simulate the effects of noise on quantum operations and measurements. The noise model is specified using a dictionary of Pauli noise probabilities, where the keys are the Pauli operators `X`, `Y`, and `Z`, and the values are the probabilities of applying the corresponding Pauli operator. The noise model can be called from Q# programs, Python programs, or configured in the VS Code settings. 

### Adding Pauli noise using the VS Code settings

Pauli noise can be configured globally in Visual Studio Code by configuring the **Q# > Simulation:Pauli Noise** user setting. 

:::image type="content" source="media/noisy-settings.png" alt-text="Screen shot showing settings for Q# noisy simulator.":::


The settings apply to all Q# programs run in VS Code, and to all gates,  measurements, and qubits referenced in the program. 

Running a histogram of the following GHz sample program without noise configured would return |00000> roughly half the time and |11111> the other half. 

```qsharp
import Std.Diagnostics.*;
import Std.Measurement.*;

operation Main() : Result []{
    let num = 5;
    return GHzSample(num);
}
operation GHzSample(n: Int) : Result[] {
    use qs = Qubit[n];
    H(qs[0]);
    ApplyCNOTChain(qs);
    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

:::image type="content" source="media/noisy-50-50.png" alt-text="Screen shot showing results with no noise.":::

However, adding 1% bit-flip noise shows the state starting to diffuse, and with 25% noise, the state is indistinguishable from noise. 

:::image type="content" source="media/noisy-1-25.png" alt-text="Screen shot showing results with 1% noise and 25% noise.":::

### Adding Pauli noise to Q# programs

Use the `ConfigurePauliNoise()` function to set, or reset, the noise model for individual Q# programs.  Using the `ConfigurePauliNoise()` function, you can granularly control where noise is applied in your Q# programs. 

For example, in the previous program (after clearing the VS Code noise settings), you can add noise immediately after qubit allocation:  

```qsharp
...
operation GHzSample(n: Int) : Result[] {
    use qs = Qubit[n];
    ConfigurePauliNoise(0.05, 0.0, 0.0); // 5% bit-flip noise applies to all operations
    H(qs[0]);
...
```
:::image type="content" source="media/noisy-allocation.png" alt-text="Screen shot showing results with noise added after qubit allocation.":::


or just prior to the measurement operation.

```qsharp
    ...
    use qs = Qubit[n];
    H(qs[0]);

    ApplyCNOTChain(qs);
    ConfigurePauliNoise(0.05, 0.0, 0.0); // noise applies only to measurement operation 
    let results = MeasureEachZ(qs);
    ...
```
:::image type="content" source="media/noisy-measurement.png" alt-text="Screen shot showing results with noise added just before measurement.":::


### Adding Pauli noise to Python programs or Jupyter Notebooks

Pauli noise configuration is available with the `qsharp` Python package, and histogram capability with the `qsharp_widgets` package. Noise is added as a parameter to the `qsharp.run` method.

- `qsharp.BitFlipNoise`
- `qsharp.PhaseFlipNoise`
- `qsharp.DepolarizingNoise`

The following sample shows the effect of 10% depolarizing noise on a Bell state measurement.

```python 
import qsharp
import qsharp_widgets
```

```python
%%qsharp

operation BellPair() : Result[] {
    use q = Qubit[2];
    H(q[0]);
    CNOT(q[0], q[1]);
    MResetEachZ(q)
}
```

```python
results = qsharp.run("BellPair()", 20, noise=qsharp.DepolarizingNoise(0.1))
results
```

Arbitrary Pauli noise can be added to the noise model by specifying the probabilities of each Pauli operator. Let's use the previous GHz sample program:

```python
%%qsharp

operation GHzSample() : Result[] {
    use q = Qubit[5];
    H(q[0]);
    ApplyCNOTChain(q);
    MResetEachZ(q)
}
```

This run of the program applies noise with 20% probability (bit-flip half the time and phase-flip half the time),

```python
result = qsharp.run("GHzSample()", 20, noise=(0.1, 0., 0.1))
display(qsharp_widgets.Histogram(result))
```

and this run applies Pauli-Y noise with 10% probability.

```python
result = qsharp.run("GHzSample()", 20, noise=(0.0, 0.1, 0.0))
display(qsharp_widgets.Histogram(result))
```


