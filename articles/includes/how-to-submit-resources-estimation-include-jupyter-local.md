---
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 02/11/2026
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites for Jupyter Notebook in VS Code

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [QDK](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest `qdk` Python library with the optional `jupyter` extra.  

    ```bash
    pip install --upgrade "qdk[jupyter]"
    ```

> [!TIP]
> You don't need to have an Azure account to run the resource estimator.

## Create the quantum algorithm

1. In VS Code, open the **View** menu and choose **Command Palette**.
1. Enter and select **Create: New Jupyter Notebook**.

    VS Code detects and displays the version of Python and the virtual Python environment that you selected for the notebook. If you have multiple Python environments, then use the kernel picker to select that kernel that you want to use. If VS Code doesn't detect a Python environment, then see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information.

1. In the first cell of the notebook, import the `qsharp` package.

    ```python
    from qdk import qsharp
    ```

1. Run the following Q# code in a new cell:

    ```qsharp
    %%qsharp

    import Std.Arrays.*;
    import Std.Canon.*;
    import Std.Convert.*;
    import Std.Diagnostics.*;
    import Std.Math.*;
    import Std.Measurement.*;
    import Std.Arithmetic.*;
    import Std.ResourceEstimation.*; 
    
    operation RunProgram() : Unit {
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
                // exposed by Microsoft Quantum resource estimator. These will instruct
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
    
        // Return all the qubits used for oracle eigenstate back to 0 state
        // using Std.Intrinsic.ResetAll
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
    /// quantum register |𝑦⟩, this operation
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
            // of y will not be affected by the addition and can therefore be
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

## Estimate the required resources to run your quantum algorithm

Estimate the physical resources required for the `RunProgram` operation with the default resource estimator input parameter values. Run the following code in a new cell:

```python
result = qsharp.estimate("RunProgram()")
result
```

The `qsharp.estimate` function creates a result object that displays a table with the estimated physical resource requirements. To inspect the results, expand the dropdown groups in the output. For more information, see [Retrieve the output of the Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data).

For example, expand the **Logical qubit parameters** group to see the following estimation results:

| Logical qubit parameter   | Value                                                                       |
|---------------------------|-----------------------------------------------------------------------------|
|QEC scheme                 | `surface_code`                                                              |
|Code distance              | 21                                                                          |
|Physical qubits            | 882                                                                         |
|Logical cycle time         | 8 microsecs                                                                 |
|Logical qubit error rate   | 3.00e-13                                                                    |
|Crossing prefactor         | 0.03                                                                        |
|Error correction threshold | 0.01                                                                        |
|Logical cycle time formula | (4 \* `twoQubitGateTime` + 2 \* `oneQubitMeasurementTime`) * `codeDistance` |
|Physical qubits formula    | 2 \* `codeDistance` * `codeDistance`                                        |

> [!TIP]
> For a more compact version of the output table, use `result.summary`.

### Space diagram

Your algorithm design might depend on how the physical qubits are distributed between algorithm qubits and T factory qubits. To visualize this distribution and better understand the estimated space requirements for your algorithm, use tools from the `qdk.widgets` module. Run the following code in a new cell:

```python
from qdk.widgets import SpaceChart, EstimateDetails

SpaceChart(result)
```

:::image type="content" source="../media/resource-estimator-diagram-jupyter.png" alt-text="Screen shot that shows the space diagram of the resource estimator.":::

The space diagram shows the proportion of algorithm qubits and T factory qubits. The number of T factory copies, in this case 19, contributes to the number of physical qubits that are used for T factories according to the following equation:

$$\text{T factories} \cdot \text{physical qubit per T factory}= 19 \cdot 33,320 = 633,080$$$

For more information, see [T factory physical estimation](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-microsoft-quantum-resource-estimator).

## Change the input parameters and compare resource estimates

When you submit a resource estimate request for your program, you can specify some optional parameters. To see all the parameters that you can pass to the job run, along with the default values that are used for each parameter, use the `jobParams` field.

Run the following code in a new cell:

```python
result['jobParams']
```

```output
{'qecScheme': {'name': 'surface_code',
  'errorCorrectionThreshold': 0.01,
  'crossingPrefactor': 0.03,
  'distanceCoefficientPower': 0,
  'logicalCycleTime': '(4 * twoQubitGateTime + 2 * oneQubitMeasurementTime) * codeDistance',
  'physicalQubitsPerLogicalQubit': '2 * codeDistance * codeDistance',
  'maxCodeDistance': 50},
 'errorBudget': 0.001,
 'qubitParams': {'instructionSet': 'GateBased',
  'name': 'qubit_gate_ns_e3',
  'oneQubitMeasurementTime': '100 ns',
  'oneQubitGateTime': '50 ns',
  'twoQubitGateTime': '50 ns',
  'tGateTime': '50 ns',
  'oneQubitMeasurementErrorRate': 0.001,
  'oneQubitGateErrorRate': 0.001,
  'twoQubitGateErrorRate': 0.001,
  'tGateErrorRate': 0.001,
  'idleErrorRate': 0.001},
 'constraints': {'maxDistillationRounds': 3},
 'estimateType': 'singlePoint'}
 ```

The output is a dictionary of parameter names and values. For example, the resource estimator takes the `qubit_gate_ns_e3` qubit model, the `surface_code` error correction scheme, and 0.001 error budget as default values for the estimation.

You can pass custom values for the following target parameters:

| Customizable input parameter     | Description                                              |
|----------------------------------|----------------------------------------------------------|
| `errorBudget`                    | The overall allowed error budget                         |
| `qecScheme`                      | The quantum error correction (QEC) scheme                |
| `qubitParams`                    | The physical qubit parameters                            |
| `constraints`                    | The component-level constraints                          |
| `distillationUnitSpecifications` | The specifications for T factory distillation algorithms |

For more information on resource estimator parameters, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters) and the `qdk.qsharp.estimator` [API reference](https://learn.microsoft.com/python/qsharp/qsharp.estimator).

### Change the qubit model

Estimate the cost for the same algorithm, but use the Majorana-based qubit parameter `qubit_maj_ns_e6` instead. Run the following code in a new cell:

```python
inputParams = {"qubitParams": {"name": "qubit_maj_ns_e6"}}

result_maj = qsharp.estimate("RunProgram()", params=inputParams)

EstimateDetails(result_maj)
```

### Change quantum error correction scheme

Rerun the resource estimation job for the same example on the Majorana-based qubit parameter, but with a Floquet QEC scheme instead. Run the following code in a new cell:

```python
inputParams = {"qubitParams": {"name": "qubit_maj_ns_e6"},
               "qecScheme": {"name": "floquet_code"}
               }

result_maj = qsharp.estimate("RunProgram()", params=inputParams)

EstimateDetails(result_maj)
```

### Change the error budget

Rerun the same quantum circuit with an `errorBudget` of 10%.

```python
inputParams = {"qubitParams": {"name": "qubit_maj_ns_e6"},
               "qecScheme": {"name": "floquet_code"},
                "errorBudget": 0.1
               }

result_maj = qsharp.estimate("RunProgram()", params=inputParams)

EstimateDetails(result_maj)
```

## Run batch resource estimates

The Microsoft Quantum resource estimator allows you to run multiple configurations of target parameters and compare the results for each configuration. To run a batch resource estimate, follow these steps:

1. Pass a list of target parameters to the `params` parameter of the `qsharp.estimate` function. For example, run your algorithm with the default parameters and with the Majorana-based qubit parameter with a Floquet QEC scheme. Run the following code in a new cell:

    ```python
    inputParams = {"qubitParams": {"name": "qubit_maj_ns_e6"},
               "qecScheme": {"name": "floquet_code"}
               }

    # An empty dictionary sets all parameters to their default values
    result_batch = qsharp.estimate("RunProgram()", params=[{}, inputParams])

    result_batch.summary_data_frame(labels=["Gate-based ns, 10⁻³", "Majorana ns, 10⁻⁶"])
    ```

    | Model               | Logical qubits | Logical depth | T states | Code distance | T factories | T factory fraction | Physical qubits | rQOPS   | Physical runtime |
    |---------------------|----------------|---------------|----------|---------------|-------------|--------------------|-----------------|---------|------------------|
    | Gate-based ns, 10⁻³ | 223            | 3.64M         | 4.70M    | 21            | 19          | 76.30 %            | 829.77k         | 26.55M  | 31 secs          |
    | Majorana ns, 10⁻⁶   | 223            | 3.64M         | 4.70M    | 5             | 19          | 63.02 %            | 79.60k          | 148.67M | 5 secs           |

1. You can also construct a list of estimation parameters by using the [`EstimatorParams` class](xref:qsharp.estimator.EstimatorParams). Run the following code in a new cell:

    ```python
    from qsharp.estimator import EstimatorParams, QubitParams, QECScheme, LogicalCounts
    
    labels = ["Gate-based µs, 10⁻³", "Gate-based µs, 10⁻⁴", "Gate-based ns, 10⁻³", "Gate-based ns, 10⁻⁴", "Majorana ns, 10⁻⁴", "Majorana ns, 10⁻⁶"]
    
    params = EstimatorParams(num_items=6)
    params.error_budget = 0.333
    params.items[0].qubit_params.name = QubitParams.GATE_US_E3
    params.items[1].qubit_params.name = QubitParams.GATE_US_E4
    params.items[2].qubit_params.name = QubitParams.GATE_NS_E3
    params.items[3].qubit_params.name = QubitParams.GATE_NS_E4
    params.items[4].qubit_params.name = QubitParams.MAJ_NS_E4
    params.items[4].qec_scheme.name = QECScheme.FLOQUET_CODE
    params.items[5].qubit_params.name = QubitParams.MAJ_NS_E6
    params.items[5].qec_scheme.name = QECScheme.FLOQUET_CODE
 
    qsharp.estimate("RunProgram()", params=params).summary_data_frame(labels=labels)
    ```

    | Model              | Logical qubits | Logical depth | T states | Code distance | T factories | T factory fraction | Physical qubits | rQOPS   | Physical runtime |
    |--------------------|----------------|---------------|----------|---------------|-------------|--------------------|-----------------|---------|------------------|
    |Gate-based µs, 10⁻³ | 223            | 3.64M         | 4.70M    | 17            | 13          | 40.54 %            | 216.77k         | 21.86k  | 10 hours         |
    |Gate-based µs, 10⁻⁴ | 223            | 3.64M         | 4.70M    | 9             | 14          | 43.17 %            | 63.57k          | 41.30k  | 5 hours          |
    |Gate-based ns, 10⁻³ | 223            | 3.64M         | 4.70M    | 17            | 16          | 69.08 %            | 416.89k         | 32.79M  | 25 secs          |
    |Gate-based ns, 10⁻⁴ | 223            | 3.64M         | 4.70M    | 9             | 14          | 43.17 %            | 63.57k          | 61.94M  | 13 secs          |
    |Majorana ns, 10⁻⁴   | 223            | 3.64M         | 4.70M    | 9             | 19          | 82.75 %            | 501.48k         | 82.59M  | 10 secs          |
    |Majorana ns, 10⁻⁶   | 223            | 3.64M         | 4.70M    | 5             | 13          | 31.47 %            | 42.96k          | 148.67M | 5 secs           |

## Run a Pareto frontier estimation

When you estimate the resources required to run an algorithm, it's important to consider the tradeoff between the number of physical qubits and the runtime of the algorithm. If you use more qubits, then you can probably reduce the runtime of your algorithm. However, the number of physical qubits that you can use is limited by the the hardware design.

The Pareto frontier estimation provides multiple estimates for the same algorithm, each with a tradeoff between the number of qubits and the runtime. To perform a Pareto frontier estimation, follow these steps:

1. Pass the value `"frontier"` to the `"estimateType"` target parameter when you call the `qsharp.estimate` function. For example, perform a Pareto frontier estimate for an algorithm with the Majorana-based qubit parameter with a surface code.

    ```python
    inputParams = {"qubitParams": {"name": "qubit_maj_ns_e4"},
               "qecScheme": {"name": "surface_code"},
                "estimateType": "frontier"
               }

    result = qsharp.estimate("RunProgram()", params=inputParams)
    ```

1. To display a table with the estimation results, use the `EstimatesOverview` function from the `qdk.widgets` module. Run the following code in a new cell:

    ```python
    from qdk.widgets import EstimatesOverview

    EstimatesOverview(result)
    ```

1. Choose the menu icon to select the columns that you want to display.

    :::image type="content" source="../media/qubit-time-frontier-estimation-jupyter-shorRE.png" alt-text="Screenshot that shows the space-time diagram with frontier estimation of the resource estimator.":::

In the **Estimate type** column of the results table, you can see the number of different combinations of {number of qubits, runtime} for your algorithm. In this case, the resource estimator finds 22 different optimal combinations out of many thousands of possible combinations.

### Space-time diagram

The `EstimatesOverview` function also displays the [space-time diagram](xref:microsoft.quantum.overview.resources-estimator-output.data#space-time-diagram) of the resource estimator.

The space-time diagram shows the number of physical qubits and the runtime of the algorithm for each optimal pair of {number of qubits, runtime}. Hover over a point to see a summary of the resource estimation results for that point.

### Run a batch Pareto frontier estimation

1. To estimate and compare multiple configurations of target parameters with frontier estimation, include `"frontier"` for the `"estimateType"` parameter in each parameter set. For example, run the following code in a new cell to perform a batch frontier estimation for two different parameter sets:

    ```python
    inputParams1 = {"qubitParams": {"name": "qubit_maj_ns_e4"},
                    "qecScheme": {"name": "surface_code"},
                    "estimateType": "frontier" # Pareto frontier estimation
                }   
    inputParams2 = {"qubitParams": {"name": "qubit_maj_ns_e6"},
                    "qecScheme": {"name": "floquet_code"},
                    "estimateType": "frontier" # Pareto frontier estimation
                }

    result = qsharp.estimate("RunProgram()", params=[inputParams1, inputParams2])

    EstimatesOverview(result, colors=["#1f77b4", "#ff7f0e"], runNames=["e4 Surface Code", "e6 Floquet Code"])
    ```

    :::image type="content" source="../media/qubit-time-frontier-multiple-config-shorRE.png" alt-text="Screenshot that shows the space-time diagram of the resource estimator when you use Pareto frontier estimation and multiple configurations of parameters.":::

    > [!NOTE]
    > To define colors and run names for the qubit-time diagram, use the `EstimatesOverview` function.

1. When you run multiple configurations of target parameters for Pareto frontier estimations, you can programmatically access the resource estimates for a specific point in the space-time diagram. For example, run the following code in a new cell to show the estimation results for the second (estimate index = 0) run and the fourth (point index = 3) shortest runtime.

    ```python
    EstimateDetails(result[1], 4)
    ```

1. You can also see the space diagram for a specific point of the space-time diagram. For example, run the following code in a new cell to show the space diagram for the first run of combinations (estimate index = 0) and the third shortest runtime (point index = 2).

    ```python
    SpaceChart(result[0], 2)
    ```
