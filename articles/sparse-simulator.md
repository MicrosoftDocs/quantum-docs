---
author: azure-quantum-content
description: Learn how to run your quantum programs on the QDK sparse simulator.
ms.author: quantumdocwriters
ms.date: 05/11/2026
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: concept-article
no-loc: ["Q#", "QDK", "Microsoft", "Quantum Development Kit", "OpenQASM", "Python", "Visual Studio Code", "VS Code", "Pauli", ]
title: Sparse quantum simulator 
uid: microsoft.quantum.machines.overview.sparse-simulator
---

# Sparse quantum simulator

The sparse simulator utilizes a sparse representation of quantum state vectors. A sparse quantum state is a state where most of the amplitude coefficients are zero. Sparse representations allow the sparse simulator to minimize the memory footprint required to represent quantum states, which enables simulations over a larger number of qubits. The sparse simulator is efficient for programs with quantum states that are sparse in the computational basis. The sparse simulator lets users explore larger applications than a full-state simulator because full-state simulators waste memory and time on an exponentially large number of zero-amplitudes.

For more information about the sparse simulator, please see [Jaques and Häner (arXiv:2105.01533)](https://arxiv.org/abs/2105.01533).

## Call the sparse simulator

is the default local simulator for the Microsoft Quantum Development Kit (QDK) extension in Visual Studio Code (VS Code), and

The sparse simulator is the default local simulator in the Microsoft Quantum Development Kit (QDK) extension for Visual Studio Code (VS Code). How to use the sparse simulator depends on your development environment.

| Development environment                   | How to call the sparse simulator                                           |
|-------------------------------------------|----------------------------------------------------------------------------|
|In a Q# or OpenQASM program in VS Code     | Run the Q# or OpenQASM file                                                |
|In a Python program with the `qdk` library | `qsharp.run`<br>or<br>`openqasm.run`<br>or<br>`qiskit.QSharpBackend`       |
|In a `%%qsharp` notebook cell              | Call the program entry operation, for example:<br>`Main()`                 |

## Add Pauli noise to the sparse simulator in VS Code

The sparse simulator supports the addition of Pauli noise to simulations of your Q# programs with the VS Code extension. This feature allows you to simulate the effects of noise on quantum operations and measurements. To specify a noise model in your Q# program, use the `ConfigurePauliNoise` function. The function sets probabilities for Pauli operators `X`, `Y`, and `Z`, noise to occur. You can also configure global noise models in the extension settings.

### Add Pauli noise using the VS Code settings

To set global Pauli noise for Q# programs in VS Code, configure the **Q# > Simulation:Pauli Noise** user setting for the QDK extension.

:::image type="content" source="media/noisy-settings.png" alt-text="Screen shot that shows the global Q# noise settings for the QDK extension in VS Code.":::

The noise settings apply to histogram results for all gates, measurements, and qubits in all Q# programs in VS Code.

For example, a histogram for the following GHz sample program without noise configured shows a result of $\ket{00000}$ for about half the measurements and $\ket{11111}$ for the other half.

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

If you add even a 1% bit-flip noise rate, the results start to diffuse. With 25% bit-flip noise, the histogram is indistinguishable from pure noise.

:::image type="content" source="media/noisy-1-25.png" alt-text="Screen sho of the QDK in VS Code that shows histogram results for a program with 1% and 25% bit-flip noise rates.":::

### Add Pauli noise to individual Q# programs

Use the `ConfigurePauliNoise` function to set or modify the noise model for individual Q# programs. The `ConfigurePauliNoise` function gives you more granular control over when and where noise occurs in your Q# programs.

> [!NOTE]
> If you configure noise in the VS Code settings, the noise is applied to all Q# programs. However, the `ConfigurePauliNoise` function overrides the VS Code noise settings for the program that calls the function.

For example, in the previous program you can add noise immediately after qubit allocation.

```qsharp  
operation GHzSample(n: Int) : Result[] {
    use qs = Qubit[n];

     // 5% bit-flip noise applies to all operations
    ConfigurePauliNoise(0.05, 0.0, 0.0);

    H(qs[0]);
    ApplyCNOTChain(qs);
    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

:::image type="content" source="media/noisy-allocation.png" alt-text="Screen shot that shows histograms results with noise added after qubit allocation.":::

Or, you can add noise to only the measurement operation.

```qsharp  
operation GHzSample(n: Int) : Result[] {
    use qs = Qubit[n];
    H(qs[0]);
    ApplyCNOTChain(qs);

    // Noise applies to only the measurement operation
    ConfigurePauliNoise(0.05, 0.0, 0.0);

    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

:::image type="content" source="media/noisy-measurement.png" alt-text="Screen shot that shows histogram results with noise added just before measurement.":::

To modify or clear noise configurations at different points in your program, call `ConfigurePauliNoise` multiple times. For example, you can set 5% bit-flip noise to the Hadamard gate and then set no noise for the rest of the program.

```qsharp  
operation GHzSample(n: Int) : Result[] {
    use qs = Qubit[n];

    // Noise applies to the H operation
    ConfigurePauliNoise(0.05, 0.0, 0.0);
    
    H(qs[0]);

     // Clear the noise settings
    ConfigurePauliNoise(0.0, 0.0, 0.0);
    
    ApplyCNOTChain(qs);
    let results = MeasureEachZ(qs);
    ResetAll(qs);
    return results;
}
```

#### Other Q# noise functions

The `ConfigureNoiseFunction` function is sufficient to model any kind of Pauli noise in your program, but Q# has other noise functions that you can also use. The following functions are available in the `Std.Diagnostics` library to configure noise in Q# programs:

| Function              | Description | Example |
|-----------------------|-------------|---------|
| `ConfigurePauliNoise` | Configures Pauli noise for a simulator run. Parameters represent the probabilities of X, Y, and Z gate Pauli noise. The noise configuration applies to all subsequent gates, measurements, and qubits in a Q# program. Overrides the VS Code extension noise settings. Subsequent calls to `ConfigurePauliNoise` override the noise set by previous calls. | `ConfigurePauliNoise(0.1, 0.0, 0.5)`<br>or<br>`ConfigurePauliNoise(BitFlipNoise(0.1))` |
| `BitFlipNoise`        | Configures only X gate noise with the specified probability. | 10% bit-flip noise:<br>`ConfigurePauliNoise(BitFlipNoise(0.1))` $\equiv$ `ConfigurePauliNoise(0.1, 0.0, 0.0)` |
| `PhaseFlipNoise`      | Configures only Z gate noise with the specified probability. | 10% phase-flip noise:<br> `ConfigurePauliNoise(PhaseFlipNoise(0.1))` $\equiv$ `ConfigurePauliNoise(0.0, 0.0, 0.1)` |
| `DepolarizingNoise`   | Configures noise to be X, Y, or Z gate with equal probabilities. | 6% depolarizing noise:<br>`ConfigurePauliNoise(DepolarizingNoise(0.06))` $\equiv$ `ConfigurePauliNoise(0.2, 0.2, 0.2)` |
| `NoNoise`             | Resets the noise model to have no noise. | `ConfigurePauliNoise(NoNoise())` $\equiv$ `ConfigurePauliNoise(0.0, 0.0, 0.0)` |
| `ApplyIdleNoise`      | Applies configured noise to a single qubit during simulation. | `...`<br>`use q = Qubit[2];`<br>`ConfigurePauliNoise(0.1, 0.0, 0.0);`<br>`ApplyIdleNoise(q[0]);`<br>`...` |
