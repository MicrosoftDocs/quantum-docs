---
author: bradben
description: Understand the architecture and implementation of integrated hybrid quantum computing.
ms.date: 03/17/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Working with integrated hybrid computing
uid: microsoft.quantum.hybrid.integrated
---

# Integrated hybrid computing

Integrated hybrid computing brings the classical and quantum processes together, allowing classical code to control the execution of quantum operations based on mid-circuit measurements while the physical qubits remain alive. Using common programming techniques, such as nested conditionals, loops, and function calls, a single quantum program can run complex problems, reducing the number of shots needed. Using qubit reuse techniques, larger programs can run on machines utilizing a smaller number of qubits.

For more discussion, see:

- [Granade & Weibe, "Using Random Walks for Iterative Phase Estimation"](https://arxiv.org/pdf/2208.04526.pdf).
- [Lubinski, et al., "Advancing Hybrid Quantum–Classical Computation with Real-Time Execution"](https://arxiv.org/pdf/2206.12950.pdf)

![Integrated hybrid quantum computing](~/media/hybrid/integrated.png)

## Supported hardware

Currently, the integrated hybrid computing model in Azure Quantum is supported on [Quantinuum](xref:microsoft.quantum.providers.quantinuum) targets.

### Quantinuum

|Supported feature| Notes |
|---|---|
| Classical loops | Bounded loops only |
| Arbitrary control flow | Use of if/else branching  |
| Mid-circuit measurement | Utilizes classical register resources |
| Qubit reuse | N/A |
| Real-time classical compute| 32-bit unsigned integer arithmetic <br>Utilizes classical register resources |

## Get started

To start exploring integrated hybrid programming, we suggest walking through the [samples](#integrated-hybrid-samples) in this article, or explore the **Hybrid quantum computing** tab in the Samples gallery of the Azure Quantum portal.

## Submitting integrated hybrid jobs

When submitting an integrated hybrid job, you need to add a *target capability* parameter after specifying the target. Other than that, integrated hybrid programs on Azure Quantum are run and managed just as regular quantum jobs. Each job has a single job ID and the result is a single histogram.

### IQ\#

When using the IQ# kernel in a Jupyter Notebook, use the [%azure.target-capability](xref:microsoft.quantum.iqsharp.magic-ref.azure.target-capability) magic command with the `AdaptiveExecution` parameter.

```qsharp
%azure.target quantinuum.sim.h1-1e
%azure.target-capability AdaptiveExecution
```

### Python + Q\#

When using the *qsharp* Python package, use the `qsharp.azure.target_capability` function with the `AdaptiveExecution` parameter.

```python
qsharp.azure.target("quantinuum.sim.h1-1e")
qsharp.azure.target_capability("AdaptiveExecution")
```

### Azure CLI

When using the Azure CLI to submit a job, add the `--target-capability` parameter with the value `AdaptiveExecution`.

```azurecli
az quantum job submit --target-capability AdaptiveExecution --target-id quantinuum.sim.h1-1e --job-name IterativePhaseEstimation --shots 100 --output table
```

### Submitting integrated hybrid jobs within a session

You can combine multiple integrated hybrid jobs within a [session](xref:microsoft.quantum.hybrid.interactive) using Q# and Python. When submitting a session, add the `targetCapability` input parameter with the value `AdaptiveExecution`. 

```python
with target.open_session(name="Q# session") as session:
    target.submit(input_data=QuantumOperation, name="Job 1", input_params={"count":100, "targetCapability":"AdaptiveExecution"}) # First job submission
    target.submit(input_data=QuantumOperation, name="Job 2", input_params={"count":200, "targetCapability":"AdaptiveExecution"}) # Second job submission
    target.submit(input_data=QuantumOperation, name="Job 3", input_params={"count":300, "targetCapability":"AdaptiveExecution"}) # Third job submission
```

For more information, see [Get started with sessions](xref:microsoft.quantum.hybrid.interactive#get-started-with-sessions).

## Estimating the cost of an integrated hybrid job

You can estimate the cost of running an integrated hybrid job on Quantinuum hardware by running it on an emulator first.

After a successful run on the emulator:

1. In your Azure Quantum workspace, select **Job management**.
1. Select the job you submitted.
1. In the **Job details** popup, select **Cost Estimation** to view how many eHQC's (Quantinuum emulator credits) were used. This number translates directly to the number of HQC's (Quantinnum quantum credits) that are needed to run the job on Quantinuum hardware.

![Cost estimation](~/media/hybrid/cost-estimation.png)

> [!NOTE]
> Quantinuum unrolls the entire circuit and calculates the cost on all code paths, whether they are conditionally executed or not.

## Integrated hybrid samples

The following samples demonstrate the current feature set for integrated hybrid computing.

- Verify an entangled GHZ state
- Three-qubit repetition
- Iterative phase estimation

### Prerequisites

- If you are new to Azure Quantum, you will need an Azure subscription and an Azure Quantum workspace to run the samples against quantum hardware. For more information, see [Create an Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- VS Code and the Quantum Development Kit set up in your local environment. For more information, see [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview#use-q-and-python-with-visual-studio-and-visual-studio-code).
- Ensure that VS Code has latest version of the Quantum Development Kit (0.27.258160).
  - In VS Code, select **Ctrl + Shift + X** and search for "Microsoft Quantum Development Kit".

The samples in this article are set up to run on Visual Studio (VS) Code and use the built-in Azure command line interface (CLI) to submit the job to Azure Quantum. To run the Jupyter Notebook version of these and other samples, login in to your Azure Portal workspace and view the samples from the **Hybrid quantum computing** tab in the Samples gallery. You can either run the notebook in the cloud or download it and run it locally.

To troubleshooting issues with integrated hybrid programs, see [Troubleshooting integrated hybrid](xref:microsoft.quantum.hybrid.troubleshooting).

### [Check GHZ state](#tab/tabid-ghz)

In this sample, you will discover how to blend classical and quantum instructions in the same program, all fully processed by the quantum computing backend.

Features to note about this sample:

- The loop and qubit measurements happen while the qubits remain coherent.
- The routine mixes classical and quantum compute operations.
- You do not need to learn to program for specialized high-performance hardware running next to the QPU (such as FPGAs).
- Running an equivalent program without the integrated hybrid features would require returning every intermediate measurement result and then running post-processing on the data.

### Create a VS Code project

1. In VS Code, create a new Q# standalone console application project named **CheckGHZ**.
    1. Select **View > Command Pallete > Q#: Create new project > Standalone console application**
1. Replace the configuration in **CheckGHZ.csproj** with the following:

    ```xml
    <Project Sdk="Microsoft.Quantum.Sdk/0.27.258160">
      <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <ExecutionTarget>quantinuum</ExecutionTarget>
        <TargetCapability>AdaptiveExecution</TargetCapability>
      </PropertyGroup>
    </Project>
    ```

1. Replace the code in **Program.qs** with the following:

    ```qsharp
    namespace Microsoft.Quantum.Samples {

        open Microsoft.Quantum.Measurement;
        open Microsoft.Quantum.Intrinsic;

        /// # Summary
        /// Counts the number of times measurements of a prepared GHZ state did not match the expected correlations.
        @EntryPoint() // The EntryPoint attribute is used to mark that this operation is where a quantum program will start running.
        operation CheckGHZ() : Int {
            use q = Qubit[3];
            mutable mismatch = 0;
            for _ in 1..10 {
                // Prepare the GHZ state.
                H(q[0]);
                CNOT(q[0], q[1]);
                CNOT(q[1], q[2]);

                // Measures and resets the 3 qubits
                let (r0, r1, r2) = (MResetZ(q[0]), MResetZ(q[1]), MResetZ(q[2]));

                // Adjusts classical value based on qubit measurement results
                if not (r0 == r1 and r1 == r2) {
                    set mismatch += 1;
                }
            }
            return mismatch;
        }
    }
    ```

1. From a terminal window in VS Code, connect to your Azure Quantum workspace and set the default resources.

    ```azurecli
    az login
    ```

    > [!NOTE]
    > Your Azure *subscription ID*, *resource group*, and *workspace name* can be listed in the terminal window after logging in by running *az quantum workspace list*. Alternately, you can find them in the Azure Portal on the **Overview** page of your Azure Quantum workspace.

    ```azurecli
    az account set --subscription <MySubscriptionID>

    az quantum workspace set --resource-group <MyResourceGroup> --workspace <MyWorkspace> --location <MyLocation>
    ```

1. Submit the job and view the results. This run uses approximately 10.65 eHQC's (Quantinuum emulator billing units)

    ```azurecli
    az quantum job submit --target-id quantinuum.sim.h1-1e --job-name CheckGHZ --target-capability AdaptiveExecution --shots 50

    az quantum job output -o table --job-id [job-id]
    ```

![GHZ output](~/media/hybrid/ghz-output.png)

### [Three-qubit repetition code](#tab/tabid-qec)

This sample demonstrates how to create a 3-qubit repetition code that can be used to detect and correct bit flip errors.

It leverages integrated hybrid computing features to count the number of times error correction was performed while the state of a logical qubit register is coherent.

### Create a VS Code project

1. In VS Code, create a new Q# standalone console application project named **ThreeQubit**.
    1. Select **View > Command Pallete > Q#: Create new project > Standalone console application**
1. Replace the configuration in **ThreeQubit.csproj** with the following:

    ```xml
    <Project Sdk="Microsoft.Quantum.Sdk/0.27.258160">

      <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <ExecutionTarget>quantinuum</ExecutionTarget>
        <TargetCapability>AdaptiveExecution</TargetCapability>
      </PropertyGroup>

    </Project>
    ```

1. Replace the code in **Program.qs** with the following:

    ```qsharp
    namespace Microsoft.Quantum.Samples {

        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Math;
        open Microsoft.Quantum.Measurement;

        @EntryPoint()
        operation ThreeQubitRepetitionCode() : (Bool, Int) {
            // Use two qubit registers, one for encoding and an auxiliary one for syndrome measurements.
            use encodedRegister = Qubit[3];
            use auxiliaryRegister = Qubit[2];

            // Initialize the first qubit in the register to a |-〉 state.
            H(encodedRegister[0]);
            Z(encodedRegister[0]);

            // Apply several unitary operations to the encoded qubits performing bit flip detection and correction between
            // each application.
            mutable bitFlipCount = 0;
            within {
                // The 3 qubit register is used as a repetition code.
                Encode(encodedRegister);
            }
            apply {
                let iterations = 5;
                for _ in 1 .. iterations {
                    // Apply a sequence of rotations to the encoded register that effectively perform an identity operation.
                    ApplyRotationalIdentity(encodedRegister);

                    // Measure the bit flip error syndrome, revert the bit flip if needed, and increase the count if a bit flip occurred.
                    let (parity01, parity12) = MeasureBitFlipSyndrome(encodedRegister, auxiliaryRegister);
                    let bitFlipReverted = RevertBitFlip(encodedRegister, parity01, parity12);
                    if (bitFlipReverted) {
                        set bitFlipCount += 1;
                    }
                }
            }

            // Transform the qubit to the |1〉 state and measure it in the computational basis.
            H(encodedRegister[0]);
            let result = MResetZ(encodedRegister[0]) == One;
            ResetAll(encodedRegister);

            // The output of the program is a boolean-integer tuple where the boolean represents whether the qubit
            // measurement result was the expected one and the integer represents the number of times bit flips occurred
            // throughout the program.
            return (result, bitFlipCount);
        }

        operation ApplyRotationalIdentity(register : Qubit[]) : Unit is Adj
        {
            // This operation implements an identity operation using rotations about the x-axis.
            // The Rx operation has a period of $2\pi$ (given that it is not possible to measure the difference between
            // states $|\\psi〉$ and $-|\\psi〉$). Using it to apply 4 $\frac{\pi}{2}$ rotations about the x-axis, effectively
            // leaves the qubit register in its original state.
            let theta = PI() * 0.5;
            for i in 1 .. 4 {
                for qubit in register
                {
                    Rx(theta, qubit);
                }
            }
        }

        operation RevertBitFlip(register : Qubit[], parity01 : Result, parity12 : Result) : Bool
        {
            if (parity01 == One and parity12 == Zero) {
                X(register[0]);
            }
            elif (parity01 == One and parity12 == One) {
                X(register[1]);
            }
            elif (parity01 == Zero and parity12 == One) {
                X(register[2]);
            }

            return parity01 == One or parity12 == One;
        }

        operation Encode(register : Qubit[]) : Unit is Adj
        {
            CNOT(register[0], register[1]);
            CNOT(register[0], register[2]);
        }

        operation MeasureBitFlipSyndrome(encodedRegister : Qubit[], auxiliaryRegister : Qubit[]) : (Result, Result)
        {
            // Measure the bit flip syndrome by checking the parities between qubits 0 and 1, and between qubits 1 and 2.
            ResetAll(auxiliaryRegister);
            CNOT(encodedRegister[0], auxiliaryRegister[0]);
            CNOT(encodedRegister[1], auxiliaryRegister[0]);
            CNOT(encodedRegister[1], auxiliaryRegister[1]);
            CNOT(encodedRegister[2], auxiliaryRegister[1]);
            let parity01 = MResetZ(auxiliaryRegister[0]);
            let parity12 = MResetZ(auxiliaryRegister[1]);
            return (parity01, parity12);
        }
    }
    ```

1. From a terminal window in VS Code, connect to your Azure Quantum workspace and set the default resources.

    ```azurecli
    az login
    ```

    > [!NOTE]
    > Your Azure *subscription ID*, *resource group*, and *workspace name* can be listed in the terminal window after logging in by running *az quantum workspace list*. Alternately, you can find them in the Azure Portal on the **Overview** page of your Azure Quantum workspace.

    ```azurecli
    az account set --subscription <MySubscriptionID>

    az quantum workspace set --resource-group <MyResourceGroup> --workspace <MyWorkspace> --location <MyLocation>
    ```

1. Submit the job and view the results. This run uses approximately 11.31 eHQC's (Quantinuum emulator billing units)

    ```azurecli
    az quantum job submit --target-id quantinuum.sim.h1-1e --job-name ErrorCorrection --target-capability AdaptiveExecution --shots 50

    az quantum job output -o table --job-id [job-id]
    ```

### [Iterative phase estimation](#tab/tabid-qml)

*This sample code was written by members of [KPMG](https://kpmg.com/xx/en/home/about/alliances/microsoft/kpmg-and-microsoft-azure-quantum.html) Quantum team in Australia and falls under an MIT License. It aims to demonstrate expanded capabilities of Basic Measurement Feedback targets and makes use of bounded loops, classical function calls at run time, nested conditional if statements, mid circuit measurements, and qubit reuse.*

## Two dimensional inner product calculation using iterative phase estimation on three qubits

This sample program demonstrates an iterative phase estimation within Q#. It uses iterative phase estimation to calculate an inner product between two 2-dimensional vectors encoded on a target qubit and an ancilla qubit. An additional control qubit is also initialized which will be the only qubit used for measurement.

The circuit begins by encoding the pair of vectors on the target qubit and the ancilla qubit. It then applies an Oracle operator to the entire register, controlled off the control qubit, which is set up in the $\ket +$ state. The controlled Oracle operator generates a phase on the $\ket 1$ state of the control qubit. This can then be read by applying an H gate to the control qubit to make the phase observable when measuring.

### Create a VS Code project

1. In VS Code, create a new Q# standalone console application project named **IPE**.
    1. Select **View > Command Pallete > Q#: Create new project > Standalone console application**
1. Replace the configuration in **IPE.csproj** with the following:

    ```xml
    <Project Sdk="Microsoft.Quantum.Sdk/0.27.253010">

      <PropertyGroup>
        <OutputType>Exe</OutputType>
        <TargetFramework>net6.0</TargetFramework>
        <ExecutionTarget>quantinuum.sim.h1-1e</ExecutionTarget>
      </PropertyGroup>

    </Project>
    ```

1. Replace the code in **Program.qs** with the following:

    ```qsharp
    namespace IPE {

        //IMPORT LIBRARIES
        open Microsoft.Quantum.Intrinsic;
        open Microsoft.Quantum.Math;
        open Microsoft.Quantum.Arrays;
        open Microsoft.Quantum.Measurement;
        open Microsoft.Quantum.Convert;


        // additional code added here


    }
    ```

### Encoding vectors

The vectors v and c are to be encoded onto the target qubit and the ancilla qubit. The vector $v = (cos(\frac{\theta_1}{2}),sin(\frac{\theta_1}{2}))$ can be represented by the quantum state $\ket v = cos(\frac{\theta_1}{2})\ket 0 + sin(\frac{\theta_1}{2})\ket 1$, similarly $c$ can be constructed using $\theta_2$.

A Y rotation applied to a target qubit in the $\ket 0$ state:

$$RY(\theta)\ket 0 = e^{iY\theta/2}\ket 0 = cos(\frac{\theta}{2})\ket 0 + sin(\frac{\theta}{2})\ket 1$$

> [!NOTE]
> **A factor of 2** is present here on theta. An application of a $RY(2\pi)$ gate on $\ket 0$ gives the state $-\ket 0$ and would encode the vector $(-1,0)$. This phase cannot be considered a global phase and is removed as the entire register will be entangled.

The register of the target qubit and ancilla qubit is

$$\ket  \Psi = \ket {\Psi_\text{Target qubit}}\ket {\Psi_\text{Ancilla qubit}}$$

The state to be created is on the target qubit and the ancilla qubit is

$$\ket{\Psi}=\frac{1}{\sqrt{2}}(\ket{v}\ket{+}+\ket{c}\ket{-}),$$

which also takes the form

$$\ket{\Psi} = \frac{1}{2}(\ket{v}+\ket{c})\ket{0}+\frac{1}{2}(\ket{v}-\ket{c})\ket{1}.$$

Add the following operation to the **Program.qs** file.

```qsharp
//This is state preparation operator A for encoding the 2D vector
operation StateInitialisation(TargetReg : Qubit, AncilReg : Qubit, theta_1 : Double, theta_2 : Double) : Unit is Adj + Ctl {
    H(AncilReg);

    // Arbitray controlled rotation based on theta. This is vector v.
    Controlled R([AncilReg], (PauliY, theta_1, TargetReg));

    // X gate on ancilla to change from |+> to |->
    X(AncilReg);

    // Arbitray controlled rotation based on theta. This is vector c.
    Controlled R([AncilReg], (PauliY, theta_2, TargetReg));
    X(AncilReg);
    H(AncilReg);
}
```

### The Oracle

An oracle G needs to be constructed such that it generates an eigenphase on the state encoded on the target qubit and the ancilla qubit. The construction of this oracle is unimportant to the demonstration within this example, but the operation it applies is

$$G\ket \Psi = e^{2\pi i\phi} \ket \Psi.$$

where the inner product $\braket {v|c}$ is contained within the phase $\phi$, which is bound between [0,1]. When applied controlled on the control qubit which begins in that state $\ket{\Psi_\text{Control Qubit}} = \ket +$

$$\begin{aligned}
    \text{Controlled }G \ket{\Psi_\text{Control Qubit}} \ket \Psi  & = \frac {1}{\sqrt{2}} (\ket 0 \ket \Psi + e^{2\pi i\phi}\ket 1 \ket \Psi )\\
    & =\frac {1}{\sqrt{2}} (\ket 0 + e^{2\pi i\phi}\ket 1) \ket \Psi
\end{aligned}$$

Now the control qubit contains the phase which relates to the inner product $\\braket {v|c}$

$$\ket{\Psi_\text{Control Qubit}} = \frac {1}{\sqrt{2}} (\ket 0 + e^{2\pi i\phi}\ket 1)$$

Add the following operation to the **Program.qs** file.

```qsharp
operation GOracle(TargetReg : Qubit, AncilReg : Qubit, theta_1 : Double, theta_2 : Double) : Unit is Adj + Ctl {
    Z(AncilReg);
        within {
            Adjoint StateInitialisation(TargetReg, AncilReg, theta_1, theta_2);

            // Apply X gates individually here as currently ApplyAll is not Adj + Ctl
            X(AncilReg);
            X(TargetReg);
        }
        apply {
            Controlled Z([AncilReg],TargetReg);
        }
    }
```

### Iteration

Now for the iterative part of the circuit. For n measurements, consider that the phase can be represented as a binary value $\phi$, and that applying $2^n$ oracles makes the nth binary point of the phase observable (through simple binary multiplication, and modulus $2\pi$). The value of the control qubit can be readout, placed in a classical register and the qubit reset for use in the next iteration. The next iteration applies $2^{n-1}$ oracles, correcting phase on the control qubit dependent on the nth measurement. The state on the control qubit can be represented as

$$ \ket {\Psi_{\text{Control Qubit}}} = \ket 0 + e^{2\pi i\phi}\ket 1 $$

where $\phi = 0.\phi_0\phi_1\phi_2\phi_3$...

Applying $2^n$ controlled oracles gives the state on the control qubit

$$ G^{2^n}\ket {\Psi_{\text{Control Qubit}}} = \ket 0 + e^{2\pi i 0.\phi_n\phi_{n+1}\phi_{n+2}\phi_{n+3}...}\ket 1 $$

Consider that the phase has no terms deeper than $\phi_n$ (ie, terms $\phi_{n+1},\phi_{n+2}, \text{etc}$)

$$ G^{2^n}\ket {\Psi_{\text{Control Qubit}}} = \ket 0 + e^{2\pi i 0.\phi_n}\ket 1 $$

Now the value $\phi_n$ can be observed with an H gate and a measurement projecting along the Z axis. Resetting the control qubit and applying the oracle $2^{n-1}$ times

$$ G^{2^{n-1}}\ket {\Psi_{\text{Control Qubit}}} = \ket 0 + e^{2\pi i 0.\phi_{n-1}\phi_n}\ket 1 $$

Using the previous measured value for $\phi_n$, the additional binary point can be rotated out

$$ RZ(-2\pi \times 0.0\phi_n)G^{n-1}\ket {\Psi_{\text{Control Qubit}}} = \ket 0 + e^{2\pi i 0.\phi_{n-1}}\ket 1 $$

This process is iteratively applied for some bit precision n to obtain the phase $0.\phi_0\phi_1\phi_2...\phi_{n}$. The value is stored as a binary value $x = \phi_0\phi_1\phi_2...\phi_{n}$, as only integers are manipulatable at runtime currently.

As the readout tells nothing of either vector, only the inner product between them, the states on the target qubit and ancilla qubit *remain in the same state* throughout the process!

Add the following operation to the **Program.qs** file.

```qsharp
operation IterativePhaseEstimation(TargetReg : Qubit, AncilReg : Qubit, theta_1 : Double, theta_2 : Double, Measurements : Int) : Int{
    use ControlReg = Qubit();
    mutable MeasureControlReg = [Zero, size = Measurements];
    mutable bitValue = 0;

    //Apply to initialise state, this is defined by the angles theta_1 and theta_2
    StateInitialisation(TargetReg, AncilReg, theta_1, theta_2);
    for index in 0 .. Measurements - 1{
        H(ControlReg);

        //Don't apply rotation on first set of oracles
        if index > 0 {

            //Loop through previous results
            for index2 in 0 .. index - 1{
                if MeasureControlReg[Measurements - 1 - index2] == One{
                    let angle = -IntAsDouble(2^(index2))*PI()/(2.0^IntAsDouble(index));

                    //Rotate control qubit dependent on previous measurements and number of measurements
                    R(PauliZ, angle, ControlReg);
                }
            }
        }
        let powerIndex = (1 <<< (Measurements - 1 - index));

        //Apply a number of oracles equal to 2^index, where index is the number or measurements left
        for _ in 1 .. powerIndex{
                Controlled GOracle([ControlReg],(TargetReg, AncilReg, theta_1, theta_2));
            }
        H(ControlReg);

        //Make a measurement mid circuit
        set MeasureControlReg w/= (Measurements - 1 - index) <- MResetZ(ControlReg);
        if MeasureControlReg[Measurements - 1 - index] == One{

            //Assign bitValue based on previous measurement
            set bitValue += 2^(index);

        }
    }
    return bitValue;
}
```

### Calculate the inner product

Finally, calculate the inner product from the measured value

$$\braket {v|c} = -cos(2\pi x / 2^n)$$

where $x = \phi_0\phi_1\phi_2...\phi_{n}$. The denominator within the cosine function is to shift the binary point to match the original value $\phi$.

> [!NOTE]
> For inner product that are not -1 or 1, the solutions are paired with a value difference of $2^{n-1}$. For example for n=3 measurements, the measured bit value of 2 would also have a pair solution of 6. Either of these values produce the same value of the inner product when input as the variable to the even function cosine (resulting in an inner product of 0 in this example).

> For inner product solutions between the discrete bit precision, a distribution of results will be produced based on where the inner product lies between the discrete bit value.

Add the following operation to the **Program.qs** file.

```qsharp
function CalculateInnerProduct(Results : Int, theta_1 : Double, theta_2 : Double, Measurements : Int): Unit{
    let DoubleVal = PI() * IntAsDouble(Results) / IntAsDouble(2 ^ (Measurements-1));

    //Convert to the final inner product
    let InnerProductValue = -Cos(DoubleVal);
    Message("The Bit Value measured is:");
    Message($"{Results}");
    Message("The Inner Product is:");
    Message($"{InnerProductValue}");
    Message("The True Inner Product is:");
    Message($"{Cos(theta_1/2.0)*Cos(theta_2/2.0)+Sin(theta_1/2.0)*Sin(theta_2/2.0)}");
}

```

### Run the program

Now, you can test the program. First, you'll run the program using a simulation operation locally, and then you'll connect to Azure Quantum and run it against a hardware target.

#### Simulating iterative phase estimation

Q# programs require an `@EntryPoint()` to tell the compiler where to start the execution of the program. Add the following code to **Programs.qs** to start the program with the `SimulateInnerProduct()` operation.  This version of the inner product operation outputs additional information, including the manipulation of doubles of which the output is displayed in the terminal.

```qsharp
@EntryPoint()

//Operation for calculating the inner product on local simulators
operation SimulateInnerProduct() : Unit{

    //This operation will output additional classical calculations
    let (Results, theta_1, theta_2, Measurements) = InnerProduct();
    CalculateInnerProduct(Results, theta_1, theta_2, Measurements);
}

operation InnerProduct() : (Int, Double, Double, Int){

    //Specify the angles for inner product
    let theta_1 = 0.0;
    let theta_2 = 0.0;
    let Measurements = 3;

    //Create target register
    use TargetReg = Qubit();

    //Create ancilla register
    use AncilReg = Qubit();

    //This runs iterative phase estimation
    let Results = IterativePhaseEstimation(TargetReg, AncilReg, theta_1, theta_2, Measurements);
    Reset(TargetReg);
    Reset(AncilReg);
    return (Results, theta_1, theta_2, Measurements);
}
```

To run the program, open a terminal window in VS Code and run

```azurecli
    dotnet run
```

#### Running on an Azure Quantum target

To run against a hardware target, replace the `SimulateInnerProduct()` operation with the following `HardwareInnerProduct()` operation:

```qsharp
//Operation for calculating the inner product on hardware or emulators
operation HardwareInnerProduct() : Int{
    let (Results,_,_,_) = InnerProduct();
    return Results;
}
```

Next, connect to your Azure Quantum workspace and set the default resources.

```azurecli
az login
```

> [!NOTE]
> Your Azure *subscription ID*, *resource group*, and *workspace name* can be listed in the terminal window after logging in by running *az quantum workspace list*. Alternately, you can find them in the Azure Portal on the **Overview** page of your Azure Quantum workspace.

```azurecli
az account set --subscription <MySubscriptionID>

az quantum workspace set --resource-group <MyResourceGroup> --workspace <MyWorkspace> --location <MyLocation>
```

Submit the job with the following parameters:

```azurecli
az quantum job submit --target-id quantinuum.sim.h1-1e --target-capability AdaptiveExecution --shots 50 --job-name IterativePhaseEstimation
```

> [!NOTE]
> The specified target requires a target execution profile that supports [basic measurement feedback](xref:microsoft.quantum.target-profiles#create-and-run-applications-for-basic-measurement-feedback-profile-targets).

> [!IMPORTANT]
> It is not recommended to increase the value of `Measurements` beyond **3** when running on Azure targets as the EHQCs can increase significantly.

You can view the status of the job with

```azurecli
az quantum job output -o table --job-id [job-id]
```

replacing \[job-id\] with the displayed job id. The results show a solution in the state with the majority population. The final inner product from the integer results can be calculated by $\braket {v|c} = -cos(2\pi x / 2^n)$, where n is the number of measurements specified in the job.

> [!NOTE]
> Selecting input parameters which only have one solution state (inner products of -1 or 1) are ideal for visibility when using a low number of shots.

***

## Next steps

[Distributed hybrid computing](xref:microsoft.quantum.hybrid.distributed)
