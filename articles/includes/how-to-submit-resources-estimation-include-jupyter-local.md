---
author: SoniaLopezBravo
ms.author: sonialopez
ms.date: 01/07/2024
ms.service: azure-quantum
ms.subservice: computing
ms.topic: include
no-loc: [target, targets]
---

## Prerequisites for Jupyter Notebook in VS Code

- A Python environment with [Python and Pip](https://apps.microsoft.com/detail/9NRWMJP3717K) installed.
- The latest version of [Visual Studio Code](https://code.visualstudio.com/download) or open [VS Code on the Web](https://vscode.dev/quantum).
- VS Code with the [Azure Quantum Development Kit](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode), [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python), and [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions installed.
- The latest Azure Quantum `qsharp` and `qsharp-widgets` packages.  

    ```bash
    python -m pip install --upgrade qsharp qsharp-widgets 
    ```

> [!TIP]
> You don't need to have an Azure account to run the local Resource Estimator.

## Create the quantum algorithm

1. In VS Code, select **View > Command palette** and select **Create: New Jupyter Notebook**. 
1. In the top-right, VS Code will detect and display the version of Python and the virtual Python environment that was selected for the notebook. If you have multiple Python environments, you may need to select a kernel using the kernel picker in the top right. If no environment was detected, see [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks#_setting-up-your-environment) for setup information. 
1. In the first cell of the notebook, import the `qsharp` package.

    ```python
    import qsharp
    ```

1. Add a new cell and copy the following code.

    ```qsharp
    %%qsharp
    open Microsoft.Quantum.Arrays;
    open Microsoft.Quantum.Canon;
    open Microsoft.Quantum.Convert;
    open Microsoft.Quantum.Diagnostics;
    open Microsoft.Quantum.Intrinsic;
    open Microsoft.Quantum.Math;
    open Microsoft.Quantum.Measurement;
    open Microsoft.Quantum.Unstable.Arithmetic;
    open Microsoft.Quantum.ResourceEstimation;
    
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
                set frequencyEstimate += 1 <<< (bitsPrecision - 1 - idx);
            }
        }
    
        // Return all the qubits used for oracle eigenstate back to 0 state
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
    /// Register interpreted as LittleEndian which is multiplied by
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
        // encoding by using the `LittleEndian` type.
        ModularMultiplyByConstant(modulus,
                                    ExpModI(generator, power, modulus),
                                    target);
    }
    
    /// # Summary
    /// Performs modular in-place multiplication by a classical constant.
    ///
    /// # Description
    /// Given the classical constants `c` and `modulus`, and an input
    /// quantum register (as LittleEndian) |𝑦⟩, this operation
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
    /// quantum register (as LittleEndian) |𝑦⟩, this operation
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
            set nZeroes += 1;
            set copy /= 2;
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

## Estimate the quantum algorithm

Now, you estimate the physical resources for the `RunProgram` operation using the default assumptions. Add a new cell and copy the following code.

```python
result = qsharp.estimate("RunProgram()")
result
```

The `qsharp.estimate` function creates a result object, which can be used to display a table with the overall physical resource counts. You can inspect cost details by collapsing the groups, which have more information. For more information, see [the full report data of the Resource Estimator](xref:microsoft.quantum.overview.resources-estimator-output.data#report-data).

For example, collapse the **Logical qubit parameters** group to see that the code distance is 21 and the number of physical qubits is 882.

|Logical qubit parameter| Value |
|----|---|
|QEC scheme                                                |                           surface_code |
|Code distance                                                                       |            21 |
|Physical qubits                                                                   |            882 |
|Logical cycle time                                                                   |   8 milisecs |
|Logical qubit error rate                                                            |     3.00E-13 |
|Crossing prefactor                                                                    |       0.03|
|Error correction threshold                                                             |      0.01|
|Logical cycle time formula    | (4 * `twoQubitGateTime` + 2 * `oneQubitMeasurementTime`) * `codeDistance`|
|Physical qubits formula     |                                      2 * `codeDistance` * `codeDistance`|

> [!TIP]
> For a more compact version of the output table, you can use `result.summary`.

### Space diagram

The distribution of physical qubits used for the algorithm and the T factories is a factor which may impact the design of your algorithm. You can use the `qsharp-widgets` package to visualize this distribution to better understand the estimated space requirements for the algorithm.

```python
from qsharp_widgets import SpaceChart, EstimateDetails
SpaceChart(result)
```

In this example, the number of physical qubits required to run the algorithm are 829766, 196686 of which are algorithm qubits and 633080 of which are T factory qubits.

:::image type="content" source="../media/resource-estimator-diagram-jupyter.png" alt-text="Screen shot showing the space diagram of the Resource Estimator.":::

## Change the default values and estimate the algorithm

When submitting a resource estimate request for your program, you can specify some optional parameters. Use the `jobParams` field to access all the target parameters that can be passed to the job execution and see which default values were assumed:

```python
result['jobParams']
```

```output
{'errorBudget': 0.001,
 'qecScheme': {'crossingPrefactor': 0.03,
  'errorCorrectionThreshold': 0.01,
  'logicalCycleTime': '(4 * twoQubitGateTime + 2 * oneQubitMeasurementTime) * codeDistance',
  'name': 'surface_code',
  'physicalQubitsPerLogicalQubit': '2 * codeDistance * codeDistance'},
 'qubitParams': {'instructionSet': 'GateBased',
  'name': 'qubit_gate_ns_e3',
  'oneQubitGateErrorRate': 0.001,
  'oneQubitGateTime': '50 ns',
  'oneQubitMeasurementErrorRate': 0.001,
  'oneQubitMeasurementTime': '100 ns',
  'tGateErrorRate': 0.001,
  'tGateTime': '50 ns',
  'twoQubitGateErrorRate': 0.001,
  'twoQubitGateTime': '50 ns'}}
 ```

You can see that the Resource Estimator takes the `qubit_gate_ns_e3` qubit model, the `surface_code` error correction code, and 0.001 error budget as default values for the estimation.

These are the target parameters that can be customized:

* `errorBudget` - the overall allowed error budget for the algorithm 
* `qecScheme` - the quantum error correction (QEC) scheme 
* `qubitParams` - the physical qubit parameters 
* `constraints` - the constraints on the component-level
* `distillationUnitSpecifications` - the specifications for T factories distillation algorithms

For more information, see [Target parameters](xref:microsoft.quantum.overview.resources-estimator#target-parameters) for the Resource Estimator.

### Change qubit model

You can estimate the cost for the same algorithm using the Majorana-based qubit parameter, `qubitParams`, "qubit_maj_ns_e6".

```python
result_maj = qsharp.estimate("RunProgram()", params={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                }})
EstimateDetails(result_maj)
```

### Change quantum error correction scheme

You can rerun the resource estimation job for the same example on the Majorana-based qubit parameters with a floqued QEC scheme, `qecScheme`.

```python
result_maj = qsharp.estimate("RunProgram()", params={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                },
                "qecScheme": {
                    "name": "floquet_code"
                }})
EstimateDetails(result_maj)
```

### Change error budget

Next, rerun the same quantum circuit with an `errorBudget` of 10%.

```python
result_maj = qsharp.estimate("RunProgram()", params={
                "qubitParams": {
                    "name": "qubit_maj_ns_e6"
                },
                "qecScheme": {
                    "name": "floquet_code"
                },
                "errorBudget": 0.1})
EstimateDetails(result_maj)
```

## Batching with the Resource Estimator

The Azure Quantum Resource Estimator allows you to run multiple configuration of target parameters, and compare the results. This is useful when you want to compare the cost of different qubit models, QEC schemes, or error budgets. 

1. You can perform a batch estimation by passing a list of target parameters to the `params` parameter of the `qsharp.estimate` function. For example, run the same algorithm with the default parameters and the Majorana-based qubit parameters with a floqued QEC scheme.

    ```python
    result_batch = qsharp.estimate("RunProgram()", params=
                    [{}, # Default parameters
                    {
                        "qubitParams": {
                            "name": "qubit_maj_ns_e6"
                        },
                        "qecScheme": {
                            "name": "floquet_code"
                        }
                    }])
    result_batch.summary_data_frame(labels=["Gate-based ns, 10⁻³", "Majorana ns, 10⁻⁶"])
    ```

    |Model|Logical qubits |	Logical depth|	T states|	Code distance|	T factories|	T factory fraction|	Physical qubits	|rQOPS	|Physical runtime|
    |----|----|----|----|----|----|----|----|----|----|
    |Gate-based ns, 10⁻³	|223|	3.64M|	4.70M|	21|	19|	76.30 %|	829.77k|	26.55M|	31 secs|
    |Majorana ns, 10⁻⁶	|223	|3.64M	|4.70M	|5	|19|	63.02 %|	79.60k|	148.67M|	5 secs|


1. You can also construct a list of estimation parameters using the `EstimatorParams` object.

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
    ```
    
    ```python
    qsharp.estimate("RunProgram()", params=params).summary_data_frame(labels=labels)
    ```

    |Model|Logical qubits|	Logical depth|	T states|	Code distance|	T factories|	T factory fraction|	Physical qubits|	rQOPS	|Physical runtime|
    |----|----|----|----|----|----|----|----|----|----|
    |Gate-based µs, 10⁻³|	223	3.64M|	4.70M|	17|	13	|40.54 %	|216.77k|	21.86k|	10 hours|
    |Gate-based µs, 10⁻⁴	|223	|3.64M	|4.70M|	9|	14|	43.17 %|	63.57k|	41.30k|	5 hours|
    |Gate-based ns, 10⁻³|	223	3.64M|	4.70M|	17|	16|	69.08 %	|416.89k|	32.79M|	25 secs|
    |Gate-based ns, 10⁻⁴|	223	3.64M	|4.70M|	9|	14|	43.17 %|	63.57k|	61.94M|	13 secs|
    |Majorana ns, 10⁻⁴|	223	3.64M|	4.70M|	9|	19|	82.75 %	|501.48k|	82.59M	|10 secs|
    |Majorana ns, 10⁻⁶|	223	3.64M|	4.70M|	5|	13|	31.47 %|	42.96k|	148.67M	|5 secs|
