---
author: azure-quantum-content
description: Learn how to run Q# and OpenQASM programs on the local simulator in the QDK extension for Visual Studio Code.
ms.author: quantumdocwriters
ms.date: 10/06/2026
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: how-to
ai-usage: ai-assisted
no-loc: ["Q#", "QDK", "Microsoft", "Quantum Development Kit", "OpenQASM", "Python", "Visual Studio Code", "VS Code", Pauli, GHZ]
title: Run quantum simulations in the QDK extension for Visual Studio Code
uid: microsoft.quantum.machines.overview.sparse-simulator
---

# Run quantum simulations in the QDK extension for Visual Studio Code

The Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code) automatically runs Q# and OpenQASM programs on its local sparse simulator.

This article explains how to run programs on the local simulator and how to add Pauli noise to Q# simulations. To use the other QDK simulators from Python, see [Run quantum simulations with the QDK Python package](xref:microsoft.quantum.how-to.install-qdk-neutral-atom-simulators).

## How the local simulator works

The sparse simulator stores only the nonzero amplitudes of a quantum state. When most computational basis amplitudes are zero, this representation uses less memory and can simulate some programs with more qubits than a full-state simulator, which stores every amplitude.

The performance benefit depends on whether the quantum state remains sparse in the computational basis. For more information, see [Jaques and Häner (arXiv:2105.01533)](https://arxiv.org/abs/2105.01533).

## Run a quantum program in VS Code

1. Install the [QDK extension for VS Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode).
1. Open a Q# (`.qs`) or OpenQASM (`.qasm`) file.
1. Select **Run** from the code lens at the start of the file or above the Q# `Main` operation.

The simulation output appears in the VS Code terminal. For Q# programs, select **Debug** to inspect the program's quantum state as it runs.

## Add Pauli noise to Q# simulations

The sparse simulator supports Pauli noise for Q# programs in the QDK extension. Use `ConfigurePauliNoise` to set the probabilities of Pauli $X$, $Y$, and $Z$ errors in a program. The QDK extension settings also support a global Pauli noise model.

> [!NOTE]
> You can't add a noise model to an OpenQASM simulation in the QDK extension. To build operation-specific noise models for Q# or OpenQASM programs, use the QDK Python package and the `NoiseConfig` API.

### Add Pauli noise in the VS Code settings

- In VS Code, set global Pauli noise for Q# programs in the **Q# > Simulation:Pauli Noise** user setting for the QDK extension.

:::image type="content" source="media/noisy-settings.png" alt-text="Screenshot of global Q# Pauli noise settings for the QDK extension in VS Code.":::

The noise settings apply to histogram results for all gates, measurements, and qubits in all Q# programs in VS Code.

Without noise, a histogram for this GHZ sample program shows $\ket{00000}$ for about half the measurements and $\ket{11111}$ for the other half.

```qsharp
import Std.Diagnostics.*;
import Std.Measurement.*;

operation Main() : Result[] {
    let num = 5;
    return GHZSample(num);
}

operation GHZSample(n: Int) : Result[] {
    use qs = Qubit[n];
    H(qs[0]);
    ApplyCNOTChain(qs);
    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

:::image type="content" source="media/noisy-50-50.png" alt-text="Screenshot of a histogram with no noise and peaks where all qubits are zero or all qubits are one.":::

At a 1% bit-flip noise rate, the results start to spread. At 25%, the histogram is indistinguishable from pure noise.

:::image type="content" source="media/noisy-1-25.png" alt-text="Screenshot of histograms for a Q# program with 1% and 25% bit-flip noise rates.":::

### Add Pauli noise to individual Q# programs

Use `ConfigurePauliNoise` to set or change a Q# program's noise model and control when and where noise occurs.

> [!NOTE]
> The VS Code settings apply noise to all Q# programs, but `ConfigurePauliNoise` overrides those settings for the program that calls it.

In the previous program, add noise immediately after qubit allocation:

```qsharp  
operation GHZSample(n: Int) : Result[] {
    use qs = Qubit[n];

    // 5% bit-flip noise applies to all subsequent operations.
    ConfigurePauliNoise(0.05, 0.0, 0.0);

    H(qs[0]);
    ApplyCNOTChain(qs);
    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

:::image type="content" source="media/noisy-allocation.png" alt-text="Screenshot of histogram results when 5% bit-flip noise starts after qubit allocation.":::

To apply noise only to the measurement operation, set the noise model immediately before measurement and clear it afterward:

```qsharp  
operation GHZSample(n: Int) : Result[] {
    use qs = Qubit[n];
    H(qs[0]);
    ApplyCNOTChain(qs);

    // Noise applies only to the measurement operation.
    ConfigurePauliNoise(0.05, 0.0, 0.0);

    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

:::image type="content" source="media/noisy-measurement.png" alt-text="Screenshot of histogram results when 5% bit-flip noise starts immediately before measurement.":::

To change or clear the noise configuration at different points in your program, call `ConfigurePauliNoise` multiple times. For example, apply 5% bit-flip noise to the Hadamard gate and then clear the noise configuration for the rest of the program.

```qsharp
operation GHZSample(n: Int) : Result[] {
    use qs = Qubit[n];

    // Noise applies to the H operation.
    ConfigurePauliNoise(0.05, 0.0, 0.0);
    
    H(qs[0]);

    // Clear the noise settings.
    ConfigurePauliNoise(0.0, 0.0, 0.0);
    
    ApplyCNOTChain(qs);
    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

### Other Q# noise functions

`ConfigurePauliNoise` supports any Pauli noise model. Use these functions and operations from the `Std.Diagnostics` namespace to configure or apply noise:

| Function              | Description | Example |
|-----------------------|-------------|---------|
| `ConfigurePauliNoise` | Sets Pauli noise for a simulation. Pass either the probabilities of Pauli $X$, $Y$, and $Z$ errors or a Pauli noise model. The configuration applies to all subsequent gates, measurements, and qubits in a Q# program and overrides the VS Code extension noise settings. Subsequent calls override earlier configurations. | `ConfigurePauliNoise(0.1, 0.0, 0.5)`<br>or<br>`ConfigurePauliNoise(BitFlipNoise(0.1))` |
| `BitFlipNoise`        | Returns a noise model with only Pauli $X$ errors at the specified probability. | 10% bit-flip noise:<br>`ConfigurePauliNoise(BitFlipNoise(0.1))` $\equiv$ `ConfigurePauliNoise(0.1, 0.0, 0.0)` |
| `PhaseFlipNoise`      | Returns a noise model with only Pauli $Z$ errors at the specified probability. | 10% phase-flip noise:<br> `ConfigurePauliNoise(PhaseFlipNoise(0.1))` $\equiv$ `ConfigurePauliNoise(0.0, 0.0, 0.1)` |
| `DepolarizingNoise`   | Returns a noise model with equal probabilities for Pauli $X$, $Y$, and $Z$ errors. | 6% depolarizing noise:<br>`ConfigurePauliNoise(DepolarizingNoise(0.06))` $\equiv$ `ConfigurePauliNoise(0.02, 0.02, 0.02)` |
| `NoNoise`             | Returns a model with zero error probabilities. Pass it to `ConfigurePauliNoise` to clear the current noise configuration. | `ConfigurePauliNoise(NoNoise())` $\equiv$ `ConfigurePauliNoise(0.0, 0.0, 0.0)` |
| `ApplyIdleNoise`      | Applies configured noise to a single qubit during simulation. | `...`<br>`use q = Qubit[2];`<br>`ConfigurePauliNoise(0.1, 0.0, 0.0);`<br>`ApplyIdleNoise(q[0]);`<br>`...` |
