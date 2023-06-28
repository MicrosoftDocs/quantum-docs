---
author: bradben
description: Learn about the resources available on the Azure Quantum website.
ms.author: brbenefield
ms.date: 06/21/2023
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: quickstart
no-loc: ['Q#', '$$v', target, targets]
title: Azure Quantum
uid: microsoft.quantum.get-started.azure-quantum
---

# Explore Azure Quantum

Get started with quantum computing, discover the latest quantum breakthroughs, and create and run quantum programs with the help of the Copilot in Azure Quantum on the [Azure Quantum website](https://quantum.microsoft.com/). 

Azure Quantum features:

- **Copilot in Azure Quantum** - AI meets the world of quantum. With a built-in code window and Q# compiler, the Copilot in Azure Quantum can not only run your code, but also generate Q# code from your prompts, and engage in conversations about quantum computing.
- **Quantum Elements** - One of the most important applications of quantum computing will be in the field of chemistry. Currently in private preview, Quantum Elements uses the Copilot in Azure Quantum to design, code, and render molecular models.
- **Code samples** - The Azure Quantum code library is a rich set of samples using Q#, Python, and Qiskit code to demonstrate quantum scenarios.
- **Quantum concepts** - From the basics of quantum theory to advanced techniques of quantum computing, the Concepts library is a crash course to bring you up to speed on quantum computing. 
- **Videos** - Browse the video library for interviews with leading quantum computing researchers and innovators.
- **Azure Quantum blogs** - Stay up to date with the latest quantum computing research and innovations. 

All you need to start exploring Azure Quantum is a Microsoft (MSA) email account. You can create an MSA for free at [https://account.microsoft.com/](https://account.microsoft.com/).
 
## Run a Q# program 

To start exploring the Copilot in Azure Quantum, you can copy and paste a simple Q# program into the code window.

1. Navigate to the [Copilot in Azure Quantum](https://quantum.microsoft.com/en-us/experience/quantum-coding) using any Microsoft (MSA) account.
1. Copy and paste the following code into the code window. This program generates a random integer between 0 and 50.

    ```qsharp
    namespace Qrng {
        open Microsoft.Quantum.Canon;
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Measurement;
        open Microsoft.Quantum.Math;
        open Microsoft.Quantum.Convert;
    
        operation SampleQuantumRandomNumberGenerator() : Result {
            // Allocate a qubit.
            use q = Qubit();
            // Put the qubit to superposition.
            H(q);
            // It now has a 50% chance of being measured 0 or 1.
            // Measure the qubit value.
            return MResetZ(q);
        }
        operation SampleRandomNumberInRange(max : Int) : Int {
            mutable output = 0; 
            repeat {
                mutable bits = []; 
                for idxBit in 1..BitSizeI(max) {
                    set bits += [SampleQuantumRandomNumberGenerator()]; 
                }
                set output = ResultArrayAsInt(bits);
            } until (output <= max);
            return output;
        }
        @EntryPoint()
        operation SampleRandomNumber() : Int {
            let max = 50;
            Message($"Sampling a random number between 0 and {max}: ");
            return SampleRandomNumberInRange(max);
        }
    }
    ```

1. Click **Run**.

- The results are displayed in the **Results** field, and a histogram of the results is displayed below the code window. 
- You can move the slider for **Select number of shots** to specify how many times the program is run.
- The **Shots** field displays the result for each shot. 
- Click **Explain code** to prompt the Copilot in Azure Quantum to generate an analysis of the code sample.

You can prompt the Copilot in Azure Quantum for almost anything quantum related, for example:

- "Explain the MResetZ operation"
- "Write Q# code that entangles two qubits"
- "Explain quantum interference"

## Next steps

You can also run quantum programs using the Azure portal or by setting up a local development environment. 

- [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace) 
- [Get started with an Azure Quantum notebook](xref:microsoft.quantum.get-started.notebooks) 
- [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview)