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

![Integrated batch quantum computing](~/media/hybrid/integrated.png)

## Supported hardware

Currently, the integrated quantum computing model in Azure Quantum is supported on [Quantinuum](https://www.quantinuum.com/) targets. Quantinuum supports the QIR Alliance [Basic Measurement Feedback](https://github.com/qir-alliance/qir-spec/blob/main/specification/v0.1/7_Profiles.md#profile-b-basic-measurement-feedback) (Profile B), which allows limited capabilities to control the execution of quantum operations based on prior measurement results. 

### Quantinuum 

|Supported feature| Notes |
|---|---|
|TBD |TBD  |
|TBD |TBD  |
|TBD |TBD  |
|TBD |TBD  |

## Cost estimation

TBD

- Can't be calculated before submission
- Samples that reduce the risk of any cost over-run?
- Does Quantinuum bill for only what is run or the entire unrolled circuit for instance?
- Ability to stop execution when cost exceeds customer limit?

## Examples

The following examples demonstrate the current feature set for integrated quantum computing. For more examples, see the **Hybrid quantum computing** notebook samples in the Azure Quantum portal, and [Integrated quantum computing programming best practices](xref:microsoft.quantum.hybrid.programming). 

> [!NOTE]
> For help setting up Azure Quantum and the Quantum Development Kit in your local environment, see [Set up the Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview). 

- Verify an entangled GHZ state. 
- Error correction with integrated hybrid. 
- Iterative phase estimation

### [Check GHZ state](#tab/tabid-ghz) 

This example verifies a 3-qubit [Greenberger-Horne-Zeilinger](https://en.wikipedia.org/wiki/Greenberger%E2%80%93Horne%E2%80%93Zeilinger_state#:~:text=In%20physics%2C%20in%20the%20area%20of%20quantum%20information,Greenberger%2C%20Michael%20Horne%20and%20Anton%20Zeilinger%20in%201989) (GHZ) state, counting how many times it sees the entanglement fail out of 10 attempts. Without noise, this would return 0 for every shot, but with noise, you can get back failures.

Feature to note about this example:

- The loop and qubit measurements happen while the qubits remain coherent.
- The routine mixes classical and quantum compute operations. 
- You do not need to learn to program for specialized high-performance hardware running next to the QPU (such as FPGAs).
- Running an equivalent program without the integrated hybrid features would require returning every intermediate measurement result and then running post-processing on the data. 

```python
import qsharp.azure

# Enter your Azure Quantum workspace details here
qsharp.azure.connect(resourceId = "", location = "")

%%qsharp
open Microsoft.Quantum.Measurement;
open Microsoft.Quantum.Arrays;
open Microsoft.Quantum.Convert;

operation CheckGHZ() : Int {
    use q = Qubit[3];
    mutable mismatch = 0;
    for _ in 1..10 {
        H(q[0]);
        CNOT(q[0], q[1]);
        CNOT(q[1], q[2]);

        // Measures and resets the 3 qubits
        let (r0, r1, r2) = (MResetZ(q[0]), MResetZ(q[1]), MResetZ(q[2]));

        // Adjusts value based on measurement results
        if not (r0 == r1 and r1 == r2) {
            set mismatch += 1;
        }
    }
    return mismatch;
}

# Set a Quantinuum target back-end with the Adaptive Execution flag
qsharp.azure.target("quantinuum.sim.h1-1e")
qsharp.azure.target_capability("AdaptiveExecution")

# Submit the job. This run will use approximately 10 EHQC's (Quantinuum emulator billing units)
result = qsharp.azure.execute(CheckGHZ, shots=50, jobName="CheckGHZ", timeout=240)
```

![GHZ output](~/media/hybrid/ghz-output.png)


### [Dynamic error correction](#tab/tabid-qec)

This error correction routine sets up two logical qubits, performs an operation on them, and then measures and error corrects using hybrid branching. 

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
    operation DynamicBitFlipCode() : (Result, Result){

        // Create two registers, each one representing a logical qubit.
        use registerA = Qubit[3];
        use registerB = Qubit[3];

        // Apply several unitary operations to the encoded qubits performing error correction between each application.
        within {

            // Encode/Decode into logical qubits.
            Encode(registerA);
            Encode(registerB);
        }
        apply {
            InitializeRegisters(registerA, registerB);
            let iterations = 5;
            for _ in 1 .. iterations {

                // Apply unitary operations.
                ApplyLogicalOperation(registerA);
                ApplyLogicalOperation(registerB);

                // Perform error correction.
                let (parityA01, parityA12) = MeasureSyndrome(registerA);
                CorrectError(registerA, parityA01, parityA12);
                let (parityB01, parityB12) = MeasureSyndrome(registerB);
                CorrectError(registerB, parityB01, parityB12);
            }
        }

        // Measure the first qubit in each register and return value.
        // N.B. This could be a majority and potentially improve results

        let resultA = MResetZ(registerA[0]);
        let resultB = MResetZ(registerB[0]);
        ResetAll(registerA);
        ResetAll(registerB);
        return (resultA, resultB);
    }

    operation InitializeRegisters(registerA : Qubit[], registerB : Qubit[]) : Unit {

        // Do nothing on first register.
        // Do a bit flip on second register.
        for qubitB in registerB {
            X(qubitB);
        }
    }

    operation ApplyLogicalOperation(register : Qubit[]) : Unit is Adj {
        let theta = PI() * 0.5;
        for i in 1 .. 8 {
            for qubit in register {
                Rx(theta, qubit);
            }
        }
    }

    operation CorrectError(register : Qubit[], parity01 : Result, parity12 : Result) : Unit {

        // Hybrid: branching based on measurement.
        if (parity01 == One and parity12 == Zero) { X(register[0]); }
        elif (parity01 == One and parity12 == One) { X(register[1]); }
        elif (parity01 == Zero and parity12 == One) { X(register[2]); }
    }

    operation Encode(register : Qubit[]) : Unit is Adj {
        CNOT(register[0], register[1]);
        CNOT(register[0], register[2]);
    }

    operation MeasureSyndrome(register : Qubit[]) : (Result, Result) {

        // Verify parity between qubits.
        let parity01 = Measure([PauliZ, PauliZ, PauliI], register);
        let parity12 = Measure([PauliI, PauliZ, PauliZ], register);
        return (parity01, parity12);
    }
}
```

### [Iterative phase estimation](#tab/tabid-qml)

#### Two Dimensional Inner Product Using Three Qubits

(This sample code courtesy of [KPMG](https://kpmg.com/xx/en/home/about/alliances/microsoft/kpmg-and-microsoft-azure-quantum.html))

This notebook demonstrates an iterative phase estimation within Q#. The basic calculation it makes will be to calculate an inner product between two 2-dimensional vectors encoded on a target qubit and an ancilla qubit. An additional control qubit is also initialised, with a subsequent H gate applied. This control qubit will be used to readout the inner product via an iterative phase estimation.

The circuit begins by encoding the pair of vectors on the target qubit and the ancilla qubit. It then applies an Oracle operator to the entire register, controlled off the control qubit. The Oracle operator generates a eigenphase on the target and ancilla qubit register, which when controlled generates a phase on the |1> state of the control qubit. This can then be read by applying another H gate to the controlled qubit to make the phase observable when measuring the Z projection.

```python
%azure.connect "<resource_id>" location = ""
```

```qsharp
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

Note that the angles represented as $\\theta_1$ and $\\theta_2$ are applied as $\\frac{\\theta_1}{2}$ and $\\frac{\\theta_2}{2}$. While the reason for this is not important, it is important to mention that coded values of  $\\theta_1=0.0$ and $\\theta_2=2.0\\pi$ will calculate the inner product between vectors with actual angles $0$ and $\\pi$ respectively (ie, anti-parallel).

```qsharp

//This is state preparation operator A for encoding the 2D vector
operation StateInitialisation(TargetReg : Qubit, AncilReg : Qubit, Theta1 : Double, Theta2 : Double) : Unit is Adj + Ctl { 
    H(AncilReg);

    // Arbitray controlled rotation based on theta. This is vector v.
    Controlled R([AncilReg], (PauliY, -Theta1, TargetReg));       
    
    // X gate on ancilla to change from |+> to |->.                                                    
    X(AncilReg);       

    // Arbitray controlled rotation based on theta. This is vector c.                                            
    Controlled R([AncilReg], (PauliY, -Theta2, TargetReg));        
    X(AncilReg);                                                  
    H(AncilReg);                                                  
}
```

#### The Oracle

An oracle G needs to be constructed such that it generates an eigenphase on the state encoded on the target qubit and the ancilla qubit. The construction of this oracle is unimportant to the demonstration within this notebook, but the operation it applies is,

$$G\\ket \\Psi = e^{2\\pi i\\theta} \\ket \\Psi.$$

where the inner product $\\braket {v|c}$ is contained within $\\theta$. When applied controlled on the control qubit which begins in that state $\\ket{\\Psi_\\text{Control Qubit}} = \\ket +$

\\begin{split}
    \\text{Controlled }G \\ket{\\Psi_\\text{Control Qubit}} \\ket \\Psi  & = \\frac {1}{\\sqrt{2}} (\\ket 0 \\ket \\Psi + e^{2\\pi i\\theta}\\ket 1 \\ket \\Psi )\\\\& =\\frac {1}{\\sqrt{2}} (\\ket 0 + e^{2\\pi i\\theta}\\ket 1) \\ket \\Psi
\\end{split}

Now the control qubit contains the phase which relates to the inner product $\\braket {v|c}$

$$\\ket{\\Psi_\\text{Control Qubit}} = \\frac {1}{\\sqrt{2}} (\\ket 0 + e^{2\\pi i\\theta}\\ket 1)$$

```qsharp
operation GOracle(TargetReg : Qubit, AncilReg : Qubit, Theta1 : Double, Theta2 : Double) : Unit is Adj + Ctl {
    Z(AncilReg);                                                      
    Adjoint StateInitialisation(TargetReg, AncilReg, Theta1, Theta2);

    // Apply X gates individually here as currently ApplyAll is not Adj + Ctl
    X(AncilReg);                                                        
    X(TargetReg);
    Controlled Z([AncilReg],TargetReg);
    X(AncilReg);
    X(TargetReg);
    StateInitialisation(TargetReg, AncilReg, Theta1, Theta2);         
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

```qsharp
operation IterativePhaseEstimation(TargetReg : Qubit, AncilReg : Qubit, Theta1 : Double, Theta2 : Double, Measurements : Int) : Int{
    use ControlReg = Qubit();

    //Set up array of measurement results of zero
    mutable MeasureControlReg = ConstantArray(Measurements, Zero);                                  
    mutable bitValue = 0;

    //Apply to initialize the state as defined by the angles theta1 and theta2
    StateInitialisation(TargetReg, AncilReg, Theta1, Theta2);                                       
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

```qsharp
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

```qsharp
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

## Next steps



