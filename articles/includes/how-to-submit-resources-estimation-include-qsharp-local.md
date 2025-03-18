---
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 01/13/2025
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites for VS Code

- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- The latest version of the [Quantum Development Kit extension](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For installation details, see [Set up the QDK extension](xref:microsoft.quantum.install-qdk.overview).

> [!TIP]
> You don't need to have an Azure account to run the Resource Estimator. 

## Create a new Q# file

1. Open Visual Studio Code and select **File > New Text File** to create a new file.
1. Save the file as `ShorRE.qs`. This file will contain the Q# code for your program.

## Create the quantum algorithm

Copy the following code into the `ShorRE.qs` file:

```qsharp

    import Std.Arrays.*;
    import Std.Canon.*;
    import Std.Convert.*;
    import Std.Diagnostics.*;
    import Std.Math.*;
    import Std.Measurement.*;
    import Microsoft.Quantum.Unstable.Arithmetic.*;
    import Std.ResourceEstimation.*;

    operation Main() : Unit {
        let bitsize = 31;

        // When choosing parameters for `EstimateFrequency`, make sure that
        // generator and modules are not co-prime
        let _ = EstimateFrequency(11, 2^bitsize - 1, bitsize);
    }

    // In this sample we concentrate on costing the `EstimateFrequency`
    // operation, which is the core quantum operation in Shors algorithm, and
    // we omit the classical pre- and post-processing.

    /// # Summary
    /// Estimates the frequency of a generator
    /// in the residue ring Z mod `modulus`.
    ///
    /// # Input
    /// ## generator
    /// The unsigned integer multiplicative order (period)
    /// of which is being estimated. Must be co-prime to `modulus`.
    /// ## modulus
    /// The modulus which defines the residue ring Z mod `modulus`
    /// in which the multiplicative order of `generator` is being estimated.
    /// ## bitsize
    /// Number of bits needed to represent the modulus.
    ///
    /// # Output
    /// The numerator k of dyadic fraction k/2^bitsPrecision
    /// approximating s/r.
    operation EstimateFrequency(
        generator : Int,
        modulus : Int,
        bitsize : Int
    )
    : Int {
        mutable frequencyEstimate = 0;
        let bitsPrecision =  2 * bitsize + 1;

        // Allocate qubits for the superposition of eigenstates of
        // the oracle that is used in period finding.
        use eigenstateRegister = Qubit[bitsize];

        // Initialize eigenstateRegister to 1, which is a superposition of
        // the eigenstates we are estimating the phases of.
        // We first interpret the register as encoding an unsigned integer
        // in little endian encoding.
        ApplyXorInPlace(1, eigenstateRegister);
        let oracle = ApplyOrderFindingOracle(generator, modulus, _, _);

        // Use phase estimation with a semiclassical Fourier transform to
        // estimate the frequency.
        use c = Qubit();
        for idx in bitsPrecision - 1..-1..0 {
            within {
                H(c);
            } apply {
                // `BeginEstimateCaching` and `EndEstimateCaching` are the operations
                // exposed by Azure Quantum Resource Estimator. These will instruct
                // resource counting such that the if-block will be executed
                // only once, its resources will be cached, and appended in
                // every other iteration.
                if BeginEstimateCaching("ControlledOracle", SingleVariant()) {
                    Controlled oracle([c], (1 <<< idx, eigenstateRegister));
                    EndEstimateCaching();
                }
                R1Frac(frequencyEstimate, bitsPrecision - 1 - idx, c);
            }
            if MResetZ(c) == One {
                frequencyEstimate += 1 <<< (bitsPrecision - 1 - idx);
            }
        }

        // Return all the qubits used for oracles eigenstate back to 0 state
        // using Microsoft.Quantum.Intrinsic.ResetAll.
        ResetAll(eigenstateRegister);

        return frequencyEstimate;
    }

    /// # Summary
    /// Interprets `target` as encoding unsigned little-endian integer k
    /// and performs transformation |k⟩ ↦ |gᵖ⋅k mod N ⟩ where
    /// p is `power`, g is `generator` and N is `modulus`.
    ///
    /// # Input
    /// ## generator
    /// The unsigned integer multiplicative order ( period )
    /// of which is being estimated. Must be co-prime to `modulus`.
    /// ## modulus
    /// The modulus which defines the residue ring Z mod `modulus`
    /// in which the multiplicative order of `generator` is being estimated.
    /// ## power
    /// Power of `generator` by which `target` is multiplied.
    /// ## target
    /// Register interpreted as little endian encoded which is multiplied by
    /// given power of the generator. The multiplication is performed modulo
    /// `modulus`.
    internal operation ApplyOrderFindingOracle(
        generator : Int, modulus : Int, power : Int, target : Qubit[]
    )
    : Unit
    is Adj + Ctl {
        // The oracle we use for order finding implements |x⟩ ↦ |x⋅a mod N⟩. We
        // also use `ExpModI` to compute a by which x must be multiplied. Also
        // note that we interpret target as unsigned integer in little-endian
        // encoding.
        ModularMultiplyByConstant(modulus,
                                    ExpModI(generator, power, modulus),
                                    target);
    }

    /// # Summary
    /// Performs modular in-place multiplication by a classical constant.
    ///
    /// # Description
    /// Given the classical constants `c` and `modulus`, and an input
    /// quantum register  |𝑦⟩, this operation
    /// computes `(c*x) % modulus` into |𝑦⟩.
    ///
    /// # Input
    /// ## modulus
    /// Modulus to use for modular multiplication
    /// ## c
    /// Constant by which to multiply |𝑦⟩
    /// ## y
    /// Quantum register of target
    internal operation ModularMultiplyByConstant(modulus : Int, c : Int, y : Qubit[])
    : Unit is Adj + Ctl {
        use qs = Qubit[Length(y)];
        for (idx, yq) in Enumerated(y) {
            let shiftedC = (c <<< idx) % modulus;
            Controlled ModularAddConstant([yq], (modulus, shiftedC, qs));
        }
        ApplyToEachCA(SWAP, Zipped(y, qs));
        let invC = InverseModI(c, modulus);
        for (idx, yq) in Enumerated(y) {
            let shiftedC = (invC <<< idx) % modulus;
            Controlled ModularAddConstant([yq], (modulus, modulus - shiftedC, qs));
        }
    }

    /// # Summary
    /// Performs modular in-place addition of a classical constant into a
    /// quantum register.
    ///
    /// # Description
    /// Given the classical constants `c` and `modulus`, and an input
    /// quantum register  |𝑦⟩, this operation
    /// computes `(x+c) % modulus` into |𝑦⟩.
    ///
    /// # Input
    /// ## modulus
    /// Modulus to use for modular addition
    /// ## c
    /// Constant to add to |𝑦⟩
    /// ## y
    /// Quantum register of target
    internal operation ModularAddConstant(modulus : Int, c : Int, y : Qubit[])
    : Unit is Adj + Ctl {
        body (...) {
            Controlled ModularAddConstant([], (modulus, c, y));
        }
        controlled (ctrls, ...) {
            // We apply a custom strategy to control this operation instead of
            // letting the compiler create the controlled variant for us in which
            // the `Controlled` functor would be distributed over each operation
            // in the body.
            //
            // Here we can use some scratch memory to save ensure that at most one
            // control qubit is used for costly operations such as `AddConstant`
            // and `CompareGreaterThenOrEqualConstant`.
            if Length(ctrls) >= 2 {
                use control = Qubit();
                within {
                    Controlled X(ctrls, control);
                } apply {
                    Controlled ModularAddConstant([control], (modulus, c, y));
                }
            } else {
                use carry = Qubit();
                Controlled AddConstant(ctrls, (c, y + [carry]));
                Controlled Adjoint AddConstant(ctrls, (modulus, y + [carry]));
                Controlled AddConstant([carry], (modulus, y));
                Controlled CompareGreaterThanOrEqualConstant(ctrls, (c, y, carry));
            }
        }
    }

    /// # Summary
    /// Performs in-place addition of a constant into a quantum register.
    ///
    /// # Description
    /// Given a non-empty quantum register |𝑦⟩ of length 𝑛+1 and a positive
    /// constant 𝑐 < 2ⁿ, computes |𝑦 + c⟩ into |𝑦⟩.
    ///
    /// # Input
    /// ## c
    /// Constant number to add to |𝑦⟩.
    /// ## y
    /// Quantum register of second summand and target; must not be empty.
    internal operation AddConstant(c : Int, y : Qubit[]) : Unit is Adj + Ctl {
        // We are using this version instead of the library version that is based
        // on Fourier angles to show an advantage of sparse simulation in this sample.

        let n = Length(y);
        Fact(n > 0, "Bit width must be at least 1");

        Fact(c >= 0, "constant must not be negative");
        Fact(c < 2 ^ n, $"constant must be smaller than {2L ^ n}");

        if c != 0 {
            // If c has j trailing zeroes than the j least significant bits
            // of y won't be affected by the addition and can therefore be
            // ignored by applying the addition only to the other qubits and
            // shifting c accordingly.
            let j = NTrailingZeroes(c);
            use x = Qubit[n - j];
            within {
                ApplyXorInPlace(c >>> j, x);
            } apply {
                IncByLE(x, y[j...]);
            }
        }
    }

    /// # Summary
    /// Performs greater-than-or-equals comparison to a constant.
    ///
    /// # Description
    /// Toggles output qubit `target` if and only if input register `x`
    /// is greater than or equal to `c`.
    ///
    /// # Input
    /// ## c
    /// Constant value for comparison.
    /// ## x
    /// Quantum register to compare against.
    /// ## target
    /// Target qubit for comparison result.
    ///
    /// # Reference
    /// This construction is described in [Lemma 3, arXiv:2201.10200]
    internal operation CompareGreaterThanOrEqualConstant(c : Int, x : Qubit[], target : Qubit)
    : Unit is Adj+Ctl {
        let bitWidth = Length(x);

        if c == 0 {
            X(target);
        } elif c >= 2 ^ bitWidth {
            // do nothing
        } elif c == 2 ^ (bitWidth - 1) {
            ApplyLowTCNOT(Tail(x), target);
        } else {
            // normalize constant
            let l = NTrailingZeroes(c);

            let cNormalized = c >>> l;
            let xNormalized = x[l...];
            let bitWidthNormalized = Length(xNormalized);
            let gates = Rest(IntAsBoolArray(cNormalized, bitWidthNormalized));

            use qs = Qubit[bitWidthNormalized - 1];
            let cs1 = [Head(xNormalized)] + Most(qs);
            let cs2 = Rest(xNormalized);

            within {
                for i in IndexRange(gates) {
                    (gates[i] ? ApplyAnd | ApplyOr)(cs1[i], cs2[i], qs[i]);
                }
            } apply {
                ApplyLowTCNOT(Tail(qs), target);
            }
        }
    }

    /// # Summary
    /// Internal operation used in the implementation of GreaterThanOrEqualConstant.
    internal operation ApplyOr(control1 : Qubit, control2 : Qubit, target : Qubit) : Unit is Adj {
        within {
            ApplyToEachA(X, [control1, control2]);
        } apply {
            ApplyAnd(control1, control2, target);
            X(target);
        }
    }

    internal operation ApplyAnd(control1 : Qubit, control2 : Qubit, target : Qubit)
    : Unit is Adj {
        body (...) {
            CCNOT(control1, control2, target);
        }
        adjoint (...) {
            H(target);
            if (M(target) == One) {
                X(target);
                CZ(control1, control2);
            }
        }
    }


    /// # Summary
    /// Returns the number of trailing zeroes of a number
    ///
    /// ## Example
    /// ```qsharp
    /// let zeroes = NTrailingZeroes(21); // = NTrailingZeroes(0b1101) = 0
    /// let zeroes = NTrailingZeroes(20); // = NTrailingZeroes(0b1100) = 2
    /// ```
    internal function NTrailingZeroes(number : Int) : Int {
        mutable nZeroes = 0;
        mutable copy = number;
        while (copy % 2 == 0) {
            nZeroes += 1;
            copy /= 2;
        }
        return nZeroes;
    }

    /// # Summary
    /// An implementation for `CNOT` that when controlled using a single control uses
    /// a helper qubit and uses `ApplyAnd` to reduce the T-count to 4 instead of 7.
    internal operation ApplyLowTCNOT(a : Qubit, b : Qubit) : Unit is Adj+Ctl {
        body (...) {
            CNOT(a, b);
        }

        adjoint self;

        controlled (ctls, ...) {
            // In this application this operation is used in a way that
            // it is controlled by at most one qubit.
            Fact(Length(ctls) <= 1, "At most one control line allowed");

            if IsEmpty(ctls) {
                CNOT(a, b);
            } else {
                use q = Qubit();
                within {
                    ApplyAnd(Head(ctls), a, q);
                } apply {
                    CNOT(q, b);
                }
            }
        }

        controlled adjoint self;
    }
```

## Run the Resource Estimator

The Resource Estimator offers [six predefined qubit parameters](xref:microsoft.quantum.overview.resources-estimator#physical-qubit-parameters), four of which have gate-based instruction sets and two that have a Majorana instruction set. It also offers two [quantum error correction codes](xref:microsoft.quantum.overview.resources-estimator#quantum-error-correction-codes), `surface_code` and `floquet_code`.

In this example, you run the Resource Estimator using the `qubit_gate_us_e3` qubit parameter and the `surface_code` quantum error correction code. 

1. Select **View -> Command Palette**, and type “resource” which should bring up the **Q#: Calculate Resource Estimates** option. You can also click on **Estimate** from the list of commands displayed right before the `Main` operation. Select this option to open the Resource Estimator window.

    :::image type="content" source="../media/codelens-estimate-shorRE.png" alt-text="Screenshot showing how to select the estimate command from the code lens list.":::

1. You can select one or more **Qubit parameter + Error Correction code** types to estimate the resources for. For this example, select **qubit_gate_us_e3** and click **OK**.

    :::image type="content" source="../media/estimate-dropdown-shorRE.png" alt-text="Screenshot showing how to select the qubit parameter from the resource estimate menu.":::

1. Specify the **Error budget** or accept the default value 0.001. For this example, leave the default value and press **Enter**.
1. Press **Enter** to accept the default result name based on the filename, in this case, **ShorRE**.

## View the results

The Resource Estimator provides multiple estimates for the same algorithm, each showing tradeoffs between the number of qubits and the runtime. Understanding the tradeoff between runtime and system scale is one of the more important aspects of resource estimation.  

The result of the resource estimation is displayed in the **Q# Estimate** window. 

1. The **Results** tab displays a summary of the resource estimation. **Click the icon** next to the first row to select the columns you want to display. You can select from run name, estimate type, qubit type, qec scheme, error budget, logical qubits, logical depth, code distance, T states, T factories, T factory fraction, runtime, rQOPS, and physical qubits.

    :::image type="content" source="../media/vscode-estimates-local-results-tab-shorRE.png" alt-text="Screenshot showing how to display the menu to select the resource estimate outputs of your choice.":::

    In the **Estimate type** column of the results table, you can see the number of optimal combinations of *{number of qubits, runtime}* for your algorithm. These combinations can be seen in the space-time diagram.

1. The **Space-time diagram** shows the tradeoffs between the number of physical qubits and the runtime of the algorithm. In this case, the Resource Estimator finds 13 different optimal combinations out of many thousands possible ones. You can hover over each {number of qubits, runtime} point to see the details of the resource estimation at that point.

    :::image type="content" source="../media/qubit-time-diagram-shorRE.png" alt-text="Screenshot showing the space-time diagram of the Resource Estimator.":::

    For more information, see [Space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram).

    > [!NOTE]
    > You need to **click on one point** of the space-time diagram, that is a {number of qubits, runtime} pair, to see the space diagram and the details of the resource estimation corresponding to that point.
    
1. The **Space diagram** shows the distribution of physical qubits used for the algorithm and the [T factories](xref:microsoft.quantum.concepts.tfactories), corresponding to a {number of qubits, runtime} pair. For example, if you select the leftmost point in the space-time diagram, the number of physical qubits required to run the algorithm are 427726, 196686 of which are algorithm qubits and 231040 of which are T factory qubits.

    :::image type="content" source="../media/vscode-estimates-local-diagram-shorRE.png" alt-text="Screenshot showing the space diagram of the Resource Estimator.":::

1. Finally, the **Resource Estimates** tab displays the full list of output data for the Resource Estimator corresponding to a *{number of qubits, runtime}* pair. You can inspect cost details by collapsing the groups, which have more information. For example, select the leftmost point in the space-time diagram and collapse the **Logical qubit parameters** group. 

    |Logical qubit parameter| Value |
    |----|---|
    |QEC scheme                                                |                           surface_code |
    |Code distance                                                                       |            21 |
    |Physical qubits                                                                   |            882 |
    |Logical cycle time                                                                   |   13 millisecs |
    |Logical qubit error rate                                                            |     3.00E-13 |
    |Crossing prefactor                                                                    |       0.03|
    |Error correction threshold                                                             |      0.01|
    |Logical cycle time formula    | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
    |Physical qubits formula     |                                      2 * `codeDistance` * `codeDistance`|

    > [!TIP]
    > Click **Show detailed rows** to display the description of each output of the report data. 
    
    For more information, see [the full report data of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data#report-data).

## Change the target parameters

You can estimate the cost for the same Q# program using other qubit type, error correction code, and error budget. Open the Resource Estimator window by select **View -> Command Palette**, and type `Q#: Calculate Resource Estimates`.

Select any other configuration, for example the Majorana-based qubit parameter, `qubit_maj_ns_e6`. Accept the default error budget value or enter a new one, and press **Enter**. The Resource Estimator reruns the estimation with the new target parameters.

For more information, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters) for the Resource Estimator.

## Run multiple configurations of parameters

The Azure Quantum Resource Estimator can run multiple configurations of target parameters and compare the resource estimation results.

1. Select **View -> Command Palette**, or press **Ctrl+Shift+P**, and type `Q#: Calculate Resource Estimates`.
1. Select **qubit_gate_us_e3**, **qubit_gate_us_e4**, **qubit_maj_ns_e4 + floquet_code**, and **qubit_maj_ns_e6 + floquet_code**, and click **OK**.
1. Accept the default error budget value 0.001 and press **Enter**.
1. Press **Enter** to accept the input file, in this case, **ShorRE.qs**.
1. In the case of multiple configurations of parameters, the results are displayed in different rows in the **Results** tab. 
1. The **Space-time diagram** shows the results for all the configurations of parameters. The first column of the results table displays the legend for each configuration of parameters. You can hover over each point to see the details of the resource estimation at that point.

    :::image type="content" source="../media/multiple-configurations-frontier-shorRE.png" alt-text="Screenshot showing the space-time diagram and the table of results when running multiple configurations of parameter in the Resource Estimator.":::

1. Click on a **{number of qubits, runtime} point** of the space-time diagram to bring up the corresponding space diagram and report data.