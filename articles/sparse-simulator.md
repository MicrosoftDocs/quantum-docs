---
author: azure-quantum-content
description: Learn how to run your Q# programs on the Azure Quantum Development Kit sparse simulator.
ms.author: quantumdocwriters
ms.date: 10/16/2025
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

The sparse simulator is the default local simulator in Visual Studio Code with the Azure Quantum Development Kit extension installed.

| Scenario | Method |
|----------|--------|
|**In a Q# program in VS Code**  | Select **Run Q# file** |
|**In a Python notebook cell**  | `result=qsharp.eval("Program_Entry_Operation()")`<br>or<br>`result=qsharp.run("Program_Entry_Operation()", shots=##)` |
|**In a `%%qsharp` notebook cell**  | `Program_Entry_Operation()` |


## Adding Pauli noise to the sparse simulator

The sparse simulator supports the addition of Pauli noise to the simulation. This feature allows you to simulate the effects of noise on quantum operations and measurements. The noise model is specified using a dictionary of Pauli noise probabilities, where the keys are the Pauli operators `X`, `Y`, and `Z`, and the values are the probabilities of applying the corresponding Pauli operator. The noise model can be used in Q# programs, Python programs, or configured in the VS Code settings.

### Adding Pauli noise using the VS Code settings

Pauli noise can be configured globally in Visual Studio Code by configuring the **Q# > Simulation:Pauli Noise** user setting.

:::image type="content" source="media/noisy-settings.png" alt-text="Screen shot showing settings for Q# noisy simulator.":::

The settings apply to histogram results for all Q# programs run in VS Code, and to all gates, measurements, and qubits referenced in the program. The settings are identical to using the `ConfigurePauliNoise()` function.

Running a histogram of the following GHz sample program without noise configured would return $\ket{00000}$ roughly half the time and $\ket{11111}$ the other half.

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

You can use the `ConfigurePauliNoise()` function to set or modify the noise model for individual Q# programs.  Using `ConfigurePauliNoise()`, you can granularly control where noise is applied in your Q# programs.

> [!NOTE]
> If you configure noise in the VS Code settings, it will be applied to all Q# programs. If you configure noise in a Q# program using `ConfigurePauliNoise()`, it will bypass any VS Code settings during the run of that program.

For example, in the previous program you can add noise immediately after qubit allocation:  

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

You can also use `ConfigurePauliNoise()` to reset or clear noise configurations. In this example, the noise settings are set after qubit allocation, and then cleared immediately after the Hadamard operation, so that noise is only applied to the `H();` operation.

```qsharp
...
operation GHzSample(n: Int) : Result[] {
    use qs = Qubit[n];
    ConfigurePauliNoise(0.05, 0.0, 0.0); // noise applies to H() operation
    H(qs[0]);
    ConfigurePauliNoise(0.0, 0.0, 0.0); // clear noise settings
...

```

The following functions are available in the `Qdk.Std.Diagnostics` library to configure noise in Q# programs:

| Function | Description | Example |
|----------|-------------|---------|
| `ConfigurePauliNoise()` | Configures Pauli noise for a simulator run, with the parameters representing probabilities of the X, Y, and Z gates. The noise configuration applies to all subsequent gates, measurements, and qubits in a Q# program. Bypasses any noise settings in VS Code and can be reset by subsequent `ConfigurePauliNoise()` calls. | `ConfigurePauliNoise(0.1, 0.0, 0.5)`<br>or<br>`ConfigurePauliNoise(BitFlipNoise(0.1))` |
| `BitFlipNoise()` | Configures noise to be the X gate only with specified probability. The noise configuration applies to all subsequent gates, measurements, and qubits in a Q# program. |10% bit-flip noise:<br>`ConfigurePauliNoise(BitFlipNoise(0.1))` $\equiv$ `ConfigurePauliNoise(0.1, 0.0, 0.0)`|
| `PhaseFlipNoise()` |  Configures noise to be the Z gate only with specified probability. The noise configuration applies to all subsequent gates, measurements, and qubits in a Q# program.   | 10% phase-flip noise:<br> `ConfigurePauliNoise(PhaseFlipNoise(0.1))` $\equiv$ `ConfigurePauliNoise(0.0, 0.0, 0.1)`   |
| `DepolarizingNoise()` |Configures noise to be X, Y or Z gate with equal probabilities.   | 6% depolarizing noise:<br>`ConfigurePauliNoise(DepolarizingNoise(0.06))` $\equiv$ `ConfigurePauliNoise(0.2, 0.2, 0.2)`   |
| `NoNoise()` | Configures the noise model for no noise. | `ConfigurePauliNoise(NoNoise())` $\equiv$ `ConfigurePauliNoise(0.0, 0.0, 0.0)`     |
| `ApplyIdleNoise` | Applies configured noise to a single qubit during simulation.    | `...`<br>`use q = Qubit[2];`<br>`ConfigurePauliNoise(0.1, 0.0, 0.0);`<br>`ApplyIdleNoise(q[0]);`<br>`...`     |

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
result = qsharp.run("GHzSample()", 20, noise=(0.1, 0.0, 0.1))
display(qsharp_widgets.Histogram(result))
```

and this run applies Pauli-Y noise with 10% probability.

```python
result = qsharp.run("GHzSample()", 20, noise=(0.0, 0.1, 0.0))
display(qsharp_widgets.Histogram(result))
```
