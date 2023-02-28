---
author: bradben
description: Understand the architecture and implementation of integrated quantum computing.
ms.date: 02/21/2023
ms.author: brbenefield
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: concepts
no-loc: ['Q#', '$$v']
title: Overview of integrated quantum computing
uid: microsoft.quantum.hybrid.integrated
---

# Integrated quantum computing

Integrated quantum computing brings the classical and quantum processes together, allowing classical code to control the execution of quantum operations based on mid-circuit measurements while the physical qubits remain alive. Using common programming techniques, such as nested conditionals, loops, and function calls, a single quantum program can run complex problems, reducing the number of shots needed. Leveraging qubit re-use techniques, larger programs can run on machines utilizing a smaller number of qubits. 

For more discussion, see

- [Grande & Weibe, "Using Random Walks for Iterative Phase Estimation"](https://arxiv.org/pdf/2208.04526.pdf).
- [Lubinski, et al., "Advancing Hybrid Quantum–Classical Computation with Real-Time Execution"](https://arxiv.org/pdf/2206.12950.pdf)

![Integrated batch quantum computing](~/media/hybrid/integrated.png)

## Supported hardware

Currently, the integrated quantum computing model in Azure Quantum is supported on [Quantinuum](https://www.quantinuum.com/) targets. Quantinuum supports the QIR Alliance [Basic Measurement Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) (Profile B), which allows limited capabilities to control the execution of quantum operations based on prior measurement results. 

### Quantinuum 

|Supported feature| Notes |
|---|---|
| Classical oops | Bounded loops only |
| Arbitrary control flow | Use of if/else branching  |
| Mid-circuit measurement | TBD |
| Qubit re-use | TBD |
| Classical function calls | TBD |


## Get started

To start exploring integrated hybrid programming, we suggest walking through the samples in the [Integrated hybrid](xref:microsoft.quantum.hybrid.integrated) article, or in the **Integrated hybrid** sample gallery in the Azure Portal.

To adapt your own code to run on integrated hybrid supported hardware, see the [QIR Alliance Profile B: Basic Measure Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) documentation. 

## Submitting integrated hybrid jobs

When submitting an integrated hybrid job, you need to add a *target capability* parameter after specifying the target. Other than that, integrated hybrid programs on Azure Quantum are run and managed just as regular quantum jobs. Each job has a single job ID and the result is a single histogram. 

### IQ\#

When using the IQ# kernel in a Jupyter Notebook, use the [%azure.target-capability](xref:microsoft.quantum.iqsharp.magic-ref.azure.target-capability) magic command with the `AdaptiveExecution` parameter. 

```qsharp
%azure.target quantinuum.sim.h1-1e
%azure.target-capability AdaptiveExecution
```

### Python + Q\#

When using the *quantum* Python package, use the `qsharp.azure.target_capability` function with the `AdaptiveExecution` parameter. 

```python
qsharp.azure.target("quantinuum.sim.h1-1e")
qsharp.azure.target_capability("AdaptiveExecution")
```

### Azure CLI

When using the Azure CLI to submit a program, add the `--target-capability` parameter with the value `AdaptiveExecution`.

```azurecli
az quantum job submit --target-capability AdaptiveExecution --target-id quantinuum.sim.h1-1e --job-name IterativePhaseEstimation --shots 100 --output table
```

## Estimating the cost of an integrated hybrid job

You can estimate the cost of running an integrated hybrid job on Quantinuum hardware by running it on an emulator first. 

After a successful run on the emulator:

1. In your Azure Quantum workspace, select **Job management**.
1. Select the job you just submitted. 
1. In the **Job details** popup, select **Cost Estimation** to view how many eHQC's (Quantinuum emulator credits) were used. This translates directly to the number of HQC's (Quantinnum quantum credits) that will be needed to run the job on Quantinuum hardware.

![Cost estimation](~/media/hybrid/cost-estimation.png)

> [!NOTE]
> Quantinuum unrolls the entire circuit and calculates the cost on all iterations, whether they are run or not. 

## Integrated hybrid samples

The following samples demonstrate the current feature set for integrated hybrid computing. 

- Verify an entangled GHZ state.
- Error correction with integrated hybrid.
- Iterative phase estimation

For more samples, see the **Integrated hybrid** notebook samples in the Azure Quantum portal. For known issues and best practices for working with integrated hybrid programs, see [Integrated hybrid known issues](xref:microsoft.quantum.hybrid.known-issues).

> [!NOTE]
> For help setting up Azure Quantum and the Quantum Development Kit in your local environment, see [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview). For information about submitting jobs, see [Submitting quantum jobs to Azure Quantum](xref:microsoft.quantum.submit-jobs).



### [Check GHZ state](#tab/tabid-ghz) 

This sample verifies a 3-qubit [Greenberger-Horne-Zeilinger](https://en.wikipedia.org/wiki/Greenberger%E2%80%93Horne%E2%80%93Zeilinger_state#:~:text=In%20physics%2C%20in%20the%20area%20of%20quantum%20information,Greenberger%2C%20Michael%20Horne%20and%20Anton%20Zeilinger%20in%201989) (GHZ) state, counting how many times it sees the entanglement fail out of 10 attempts. Without noise, this would return 0 for every shot, but with noise, you can get back failures.

> [!NOTE]
> This sample is set up to run on Visual Studio (VS) Code and use the built-in Azure command line interface (CLI) to submit the job to Azure Quantum. To run the Jupyter Notebook version of this sample, login in to your Azure Portal workspace and load the **Check GHZ state** sample from the **Integrated hybrid** tab. You can either run the notebook in the cloud or download it and run it locally.  

Feature to note about this sample:

- The loop and qubit measurements happen while the qubits remain coherent.
- The routine mixes classical and quantum compute operations. 
- You do not need to learn to program for specialized high-performance hardware running next to the QPU (such as FPGAs).
- Running an equivalent program without the integrated hybrid features would require returning every intermediate measurement result and then running post-processing on the data. 

```qsharp
namespace CheckGHZ {

    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Arrays;
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Math;
    
    @EntryPoint()
    operation CheckGHZ() : Int {
        use q = Qubit[3];
        mutable mismatch = 0;
        for _ in 1..10 {
            H(q[0]);
            CNOT(q[0], q[1]);
            CNOT(q[1], q[2]);

            // Measures and resets the 3 qubits
            let (r0, r1, r2) = (MResetZ(q[0]), MResetZ(q[1]), MResetZ(q[2]));

            // Adjusts classical code based on measurement results
            if not (r0 == r1 and r1 == r2) {
                set mismatch += 1;
            }
        }
        return mismatch;
    }

}
```

From a terminal window in VS Code, connect to your Azure Quantum workspace and set the default resources.

```azurecli
az login

az account set --subscription <MySubscriptionID>

az quantum workspace set --resource-group <MyResourceGroup> --workspace <MyWorkspace> --location <MyLocation>
```

Submit the job and view the results. This run will use approximately 10.65 eHQC's (Quantinuum emulator billing units)

```azurecli
az quantum job submit --target-id quantinuum.sim.h1-1e --job-name CheckGHZ --target-capability AdaptiveExecution --shots 50

az quantum job output -o table --job-id [job-id]
```

![GHZ output](~/media/hybrid/ghz-output.png)

### [Dynamic error correction](#tab/tabid-qec)

This error correction routine sets up two logical qubits, performs an operation on them, and then measures and error corrects using hybrid branching. 

> [!NOTE]
> This sample is set up to run on Visual Studio (VS) Code and use the built-in Azure command line interface (CLI) to submit the job to Azure Quantum. To run the Jupyter Notebook version of this sample, login in to your Azure Portal workspace and load the **Dynamic error correction** sample from the **Integrated hybrid** tab. You can either run the notebook in the cloud or download it and run it locally.

```xml
<Project Sdk="Microsoft.Quantum.Sdk/0.27.253010">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <ExecutionTarget>quantinuum.qpu.h1</ExecutionTarget>
  </PropertyGroup>

</Project>
```

```qsharp
namespace EC {

   open Microsoft.Quantum.Intrinsic;
   open Microsoft.Quantum.Math;
   open Microsoft.Quantum.Measurement;

   @EntryPoint()
   operation DynamicBitFlipCode() : (Result, Int) {
       // Create a register that represents a logical qubit.
       use logicalRegister = Qubit[3];

       // Apply several unitary operations to the encoded qubits performing error correction between each application.
       mutable corrections = 0;
       within {
           // Encode/Decode logical qubit.
           Encode(logicalRegister);
       }
       apply {
           LogicalX(logicalRegister); // |111⟩
           let iterations = 5;
           for _ in 1 .. iterations {
               // Apply unitary operations.
               ApplyLogicalOperation(logicalRegister);

               // Perform error correction and increase the counter if a correction was made.
               let (parity01, parity12) = MeasureSyndrome(logicalRegister);
               let correctedError = CorrectError(logicalRegister, parity01, parity12);
               if (correctedError) {
                   set corrections += 1;
               }
           }
       }

       // Measure the first qubit in each register, return the measurement result and the corrections count.
       let result = MResetZ(logicalRegister[0]);
       ResetAll(logicalRegister);
       return (result, corrections);
   }

   operation LogicalX(register : Qubit[]) : Unit
   {
       for qubit in register
       {
           X(qubit);
       }
   }

   operation ApplyLogicalOperation(register : Qubit[]) : Unit is Adj
   {
       // Rx has a 4 x pi period so this effectively leaves the qubit in the same state at the end if no noise is present.
       let theta = PI() * 0.5;
       for i in 1 .. 8 {
           for qubit in register
           {
               Rx(theta, qubit);
           }
       }
   }

   operation CorrectError(register : Qubit[], parity01 : Result, parity12 : Result) : Bool
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

   operation MeasureSyndrome(register : Qubit[]) : (Result, Result)
   {
       // Verify parity between qubits.
       let parity01 = Measure([PauliZ, PauliZ, PauliI], register);
       let parity12 = Measure([PauliI, PauliZ, PauliZ], register);
       return (parity01, parity12);
   }
}
```

From a terminal window in VS Code, connect to your Azure Quantum workspace and set the default resources.

```azurecli
az login

az account set --subscription <MySubscriptionID>

az quantum workspace set --resource-group <MyResourceGroup> --workspace <MyWorkspace> --location <MyLocation>
```

Submit the job and view the results. This run will use approximately 11.31 eHQC's (Quantinuum emulator billing units)

```azurecli
az quantum job submit --target-id quantinuum.sim.h1-1e --job-name ErrorCorrection --target-capability AdaptiveExecution --shots 50

az quantum job output -o table --job-id [job-id]
```


### [Iterative phase estimation](#tab/tabid-qml)

#### Two Dimensional Inner Product Using Three Qubits

(This sample code courtesy of [KPMG](https://kpmg.com/xx/en/home/about/alliances/microsoft/kpmg-and-microsoft-azure-quantum.html))

This notebook demonstrates an iterative phase estimation within Q#. The basic calculation it makes will be to calculate an inner product between two 2-dimensional vectors encoded on a target qubit and an ancilla qubit. An additional control qubit is also initialized, with a subsequent H gate applied. This control qubit will be used to readout the inner product via an iterative phase estimation.

The circuit begins by encoding the pair of vectors on the target qubit and the ancilla qubit. It then applies an Oracle operator to the entire register, controlled off the control qubit. The Oracle operator generates a eigenphase on the target and ancilla qubit register, which when controlled generates a phase on the |1> state of the control qubit. This can then be read by applying another H gate to the controlled qubit to make the phase observable when measuring the Z projection.

> [!NOTE]
> This sample is set up to run as a Jupyter Notebook in your local environment and submit the job to Azure Quantum. Optionally, you can run this program from your Azure Portal workspace by loading the **Iterative phase estimation** sample from the **Integrated hybrid** tab.

First, connect to your Azure Quantum workspace and load the necessary libraries. 

```python
%azure.connect "<resource_id>" location = ""
```

```python
%%qsharp
open Microsoft.Quantum.Convert;
open Microsoft.Quantum.Math;
open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Measurement;
```

#### Encoding vectors

The vectors v and c are to be encoded onto the target qubit. In two dimensions, the vectors are the angle about the Y axis on the Bloch Sphere. The state to be created is

$$\\ket{\\Psi}=\\frac{1}{\\sqrt{2}}(\\ket{+}\\ket{v}+\\ket{-}\\ket{c},$$

which also takes the more readable form

$$\\ket{\\Psi} = \\frac{1}{2}(\\ket{v}+\\ket{c})\\ket{0}+\\frac{1}{2}(\\ket{v}-\\ket{c})\\ket{1}.$$

Note that the angles represented as $\\theta_1$ and $\\theta_2$ are applied as $\\frac{\\theta_1}{2}$ and $\\frac{\\theta_2}{2}$. While the reason for this is not important, it is important to note that coded values of  $\\theta_1=0.0$ and $\\theta_2=2.0\\pi$ will calculate the inner product between vectors with actual angles $0$ and $\\pi$ respectively (that is, anti-parallel).

```python
%%qsharp
//This is state preparation operator A for encoding the 2D vector
operation StateInitialization(TargetReg : Qubit, AncilReg : Qubit, Theta1 : Double, Theta2 : Double) : Unit is Adj + Ctl { 
    H(AncilReg);

    // Arbitray controlled rotation based on theta. This is vector v.
    Controlled R([AncilReg], (PauliY, -Theta1, TargetReg));       
    
    // X gate on ancilla to change from |+> to |->                                                   
    X(AncilReg);       

    // Arbitray controlled rotation based on theta. This is vector c.                                            
    Controlled R([AncilReg], (PauliY, -Theta2, TargetReg));        
    X(AncilReg);                                                  
    H(AncilReg);                                                  
}
```

#### The Oracle

An oracle G needs to be constructed such that it generates an eigenphase on the state encoded on the target qubit and the ancilla qubit. The construction of this oracle is unimportant to the demonstration within this notebook, but the operation it applies is

$$G\\ket \\Psi = e^{2\\pi i\\theta} \\ket \\Psi.$$

where the inner product $\\braket {v|c}$ is contained within $\\theta$. When applied controlled on the control qubit which begins in that state $\\ket{\\Psi_\\text{Control Qubit}} = \\ket +$

\\begin{split}
    \\text{Controlled }G \\ket{\\Psi_\\text{Control Qubit}} \\ket \\Psi  & = \\frac {1}{\\sqrt{2}} (\\ket 0 \\ket \\Psi + e^{2\\pi i\\theta}\\ket 1 \\ket \\Psi )\\\\& =\\frac {1}{\\sqrt{2}} (\\ket 0 + e^{2\\pi i\\theta}\\ket 1) \\ket \\Psi
\\end{split}

Now the control qubit contains the phase which relates to the inner product $\\braket {v|c}$

$$\\ket{\\Psi_\\text{Control Qubit}} = \\frac {1}{\\sqrt{2}} (\\ket 0 + e^{2\\pi i\\theta}\\ket 1)$$

```python
%%qsharp
operation GOracle(TargetReg : Qubit, AncilReg : Qubit, Theta1 : Double, Theta2 : Double) : Unit is Adj + Ctl {
    Z(AncilReg);                                                      
    Adjoint StateInitialization(TargetReg, AncilReg, Theta1, Theta2);

    // Apply X gates individually here as currently ApplyAll is not Adj + Ctl
    X(AncilReg);                                                        
    X(TargetReg);
    Controlled Z([AncilReg],TargetReg);
    X(AncilReg);
    X(TargetReg);
    StateInitialization(TargetReg, AncilReg, Theta1, Theta2);         
}
```

Now for the iterative part of the circuit. For *n* measurements, consider that the phase can be represented as a binary value $\\theta$, and that applying $2^n$ oracles makes the *nth* binary point of the phase observable (through simple binary multiplication, and modulus $2\\pi$). The value of the control qubit can be readout, placed in a classical register, and then reset for use in the next iteration. The next iteration applies $2^{n-1}$ oracles, correcting phase on the control qubit dependent on the *nth* measurement. The state on the control qubit can be represented as

$$ \\ket {\\Psi_{\\text{Control Qubit}}} = \\ket 0 + e^{2\\pi i\\theta}\\ket 1 $$

where $\\theta = 0.\\theta_0\\theta_1\\theta_2\\theta_3...$.

Applying $2^n$ oracles gives

$$ O^{2^n}\\ket {\\Psi_{\\text{Control Qubit}}} = \\ket 0 + e^{2\\pi i 0.\\theta_n\\theta_{n+1}\\theta_{n+2}\\theta_{n+3}...}\\ket 1 $$

Consider that the phase has no terms deeper than $\\theta_n$ (ie, terms $\\theta_{n+1},\\theta_{n+2}, \\text{etc}$),

$$ O^{2^n}\\ket {\\Psi_{\\text{Control Qubit}}} = \\ket 0 + e^{2\\pi i 0.\\theta_n}\\ket 1 $$

Now the value $\\theta_n$ can be observed with an H gate and a measurement projecting along the Z axis. Resetting the control qubit and applying the oracle $2^{n-1}$ times

$$ O^{2^{n-1}}\\ket {\\Psi_{\\text{Control Qubit}}} = \\ket 0 + e^{2\\pi i 0.\\theta_{n-1}\\theta_n}\\ket 1 $$

Using the previous measured value for $\\theta_n$, the additional binary point can be rotated out.

$$ RZ(-2\\pi \\times 0.0\\theta_n)O^{n-1}\\ket {\\Psi_{\\text{Control Qubit}}} = \\ket 0 + e^{2\\pi i 0.\\theta_{n-1}}\\ket 1 $$

This process is iteratively applied for some bit precision *n* to obtain the phase $0.\\theta_0\\theta_1\\theta_2...\\theta_{n}$. The value is stored as a binary value $x = \\theta_0\\theta_1\\theta_2...\\theta_{n}$, as only integers are currently manipulatable at runtime.

As the readout tells nothing of either vector except the inner product between them, the states on the target qubit and ancilla qubit **remain in the same state** throughout the process!

```python
%%qsharp
operation IterativePhaseEstimation(TargetReg : Qubit, AncilReg : Qubit, Theta1 : Double, Theta2 : Double, Measurements : Int) : Int{
    use ControlReg = Qubit();

    //Set up array of measurement results of zero
    mutable MeasureControlReg = ConstantArray(Measurements, Zero);                                  
    mutable bitValue = 0;

    //Apply to initialize the state as defined by the angles theta1 and theta2
    StateInitialization(TargetReg, AncilReg, Theta1, Theta2);                                       
    for index in 0 .. Measurements - 1{                                                             
        H(ControlReg);        

        //Don't apply rotation on first set of oracles                                                               
        if index > 0 {          

            //Loop through previous results                                                       
            for index2 in 0 .. index - 1{                                                           
                if MeasureControlReg[Measurements - 1 - index2] == One{                             
                    R(PauliZ, -IntAsDouble(2^(index2))*PI()/(2.0^IntAsDouble(index)), ControlReg);  
                }
            }
            
        }
        let powerIndex = (1 <<< (Measurements - 1 - index));

        //Apply a number of oracles equal to 2^index, where index is the number of measurements left
        for _ in 1 .. powerIndex{                                                                   
                Controlled GOracle([ControlReg],(TargetReg, AncilReg, Theta1, Theta2));
            }
        H(ControlReg);

        //Make a measurement mid circuit
        set MeasureControlReg w/= (Measurements - 1 - index) <- MResetZ(ControlReg);                 
        if MeasureControlReg[Measurements - 1 - index] == One{

            //Assign bitValue based on previous measurement
            set bitValue += 2^(index);                                                              
                                                                                                    
        }
    }

    //Reset qubits for end of circuit.
    Reset(ControlReg);                                                                             
    Reset(TargetReg);                                           
    Reset(AncilReg); 
    return bitValue;
}
```

Finally, calculate the inner product from the measured value

$$\\braket {v|c} = -cos(2\\pi x / 2^n)$$

where $x = \\theta_0\\theta_1\\theta_2...\\theta_{n}$. The denominator within the cosine function is to shift the binary point to match the original value $\\theta$.

> [!NOTE] 
> For measured values that are not $\\ket {000...000} \\text{ or } \\ket  {111...111}$, the solutions are paired with a value difference of $2^{n-1}$. For example, for three measurements, the measured value of *2* would also have a pair solution of *6*. Either of these values produces the same value of the inner product when passed as the variable to the even function cosine (resulting in an inner product of 0 in this example).

> For inner product solutions between the discrete bit precision, a distribution of results will be produced based on where the inner product lies between the discrete bit value.

```python
%%qsharp
operation SimulateInnerProduct() : Int{

    //Specify the angles for inner product
    let Theta1 = 0.0;                                                                           
    let Theta2 = 0.0;

    //Specify the bit resolution in the iterative phase estimation
    //For Jobs on hardware the suggested number of measurements is 3
    let Measurements = 3;                                                                       
                                  
    //TargetReg has states v and c qubits contained on it                                                              
    use TargetReg = Qubit();                 

    //Create ancilla                                                   
    use AncilReg = Qubit();        

    //This runs iterative phase estimation                                                             
    let Results = IterativePhaseEstimation(TargetReg, AncilReg, Theta1, Theta2, Measurements);  
    

    let DoubleVal = PI() * IntAsDouble(Results) / IntAsDouble(2 ^ (Measurements-1));

    //Convert to the final inner product
    let InnerProductValue = -Cos(DoubleVal);                                                      
    Message("The Inner Product is:");
    Message($"{InnerProductValue}");
    Message("The True Inner Product is:");
    Message($"{Cos(Theta1/2.0)*Cos(Theta2/2.0)+Sin(Theta1/2.0)*Sin(Theta2/2.0)}");
    Message("The Bit Value measured is");

    //Return Measured values                                                                            
    return Results;                                                                             
}
```

```python
%simulate SimulateInnerProduct
```

The inner product operation is reconstructed to fit within the requirements of the target. In this case, calls like `Message` and manipulation of doubles is not allowed. Therefore, the output will be the bit value as generated by the `IterativePhaseEstimation` operation.

```python
%%qsharp
operation InnerProduct() : Int{

    //Specify the angles for inner product
    let Theta1 = 0.0;                                                                           
    let Theta2 = 0.0;

    //Specify the bit resolution in the iterative phase estimation
    //For Jobs on hardware the suggested number of measurements is 3
    let Measurements = 3;                                                                       
                                                                                                

    //TargetReg has states v and c qubits contained on it
    use TargetReg = Qubit();         
                                                           
    //Create ancilla
    use AncilReg = Qubit();      
                                                              
    //This runs iterative phase estimation
    let Results = IterativePhaseEstimation(TargetReg, AncilReg, Theta1, Theta2, Measurements);  
    
/    /Return Measured values                                                                       
    return Results;                                                                             
}
```

Specify the target. The target requires a target execution profile that supports basic measurement feedback.

```python
%azure.target quantinuum.sim.h1-1e
```

```python
%azure.target-capability AdaptiveExecution
%azure.shots 100
```

Submit the job to the target.

> [!NOTE]
> The cost of this job is approximately 610 eHQC's (Quantinuum emulator units).

```python
%azure.submit InnerProduct
```

Check the status of the job.

```python
%azure.status
```

When the job is complete, output a histogram of results.

```python
%azure.output
```

***
