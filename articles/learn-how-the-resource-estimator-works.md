---
author: SoniaLopezBravo
description: Learn how the Azure Quantum Resource Estimator calculates estimates, the assumptions and some common issues.
ms.date: 11/14/2023
ms.author: sonialopez
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v', target, targets]
title: Learn How the Resource Estimator Works
uid: microsoft.quantum.learn-how-resource-estimator-works
---

# Learn how the Resource Estimator works

In this article, you'll learn the workflow of the [Azure Quantum Resource Estimator](xref:microsoft.quantum.overview.intro-resource-estimator) and how the [output data](xref:microsoft.quantum.overview.resources-estimator-output.data) is extracted at different levels of the evaluation of the quantum program. You'll also learn the assumptions taken into account for the simulation of the resource estimation.

> [!NOTE]
> If you run into any issue while working with the Resource Estimator, check out the [Troubleshooting page](xref:microsoft.quantum.azure.common-issues#azure-quantum-resource-estimator).

## Workflow of the Resource Estimator

The following diagram shows the workflow of the Resource Estimator. The resource estimation is done based on the job parameters and quantum program, and the output data is extracted at different levels of the evaluation of the quantum program.

:::image type="content" source="media/resource-estimator-workflow.png" alt-text="Diagram showing the workflow of the resource estimator. The resource estimation is done based on the job parameters and quantum program, and the output data is extracted at different levels of the evaluation of the quantum program.":::

### Code distance and T factory estimation

The Resource Estimator takes the target parameters `{qubitParams, qecScheme, errorBudget, constraints, distillationUnitSpecifications}` to compute a resource estimation of qubit technology and architecture. It calculates the QEC code distance, and from it, the number of physical qubits needed to encode one logical qubit and the runtime of one logical depth or cycle.

The Resource Estimator uses a logical layer called *planar quantum ISA* that acts as the interface between the software and hardware layers. It abstracts the details of how QEC is implemented in the layer below, retaining only a set of fault-tolerant logical operations as its instruction set. For more information, see [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629).

It is crucial that the quantum gate set of a fault-tolerant quantum computer is [universal](xref:microsoft.quantum.concepts.tfactories#universal-set-of-quantum-gates), meaning it is complete for quantum computing. In the Azure Quantum Resource Estimator, the preparation of T gates is crucial because the other quantum operations are not sufficient for universal quantum computation. This is achieved via the generation of T states using [T factories](xref:microsoft.quantum.concepts.tfactories#t-factories-in-the-azure-quantum-resource-estimator). The Resource Estimator calculates how many physical qubits are needed to run one T factory and for how long the T factory runs. These values are reserved and will be used in subsequent steps of the workflow.

### Pre-layout resource estimation

The Resource Estimator takes the quantum program and computes a pre-layout estimation of the logical resources. It calculates the number of logical qubits, T gates, rotation gates, CCZ gates, CCiX gates, and measurements in the input quantum program. The number of T gates includes all T gates and adjoint T gates, but not T gates required to implement rotation gates, CCZ gates, or CCiX gates.

### Algorithmic logical estimation

In the previous step, the Resource Estimator has calculated the number of logical qubits in the input algorithm. Laying out the logical qubits in the presence of nearest-neighbor constraints requires extra logical qubits. In this step, the Resource Estimator takes the number of pre-layout logical qubits and calculates the number of logical qubits required for the algorithm after layout.

The Resource Estimator also calculates the algorithmic logical depth, that is the number of logical cycles required to run the algorithm. To execute the algorithm using multi-qubit measurements, you need:

- 1 multi-qubit measurement for each single-qubit measurement, single-qubit rotation, and T gate.
- 3 multi-qubit measurements for each CCZ and CCiX gates.
- Same number of T gates per rotation in multi-qubit measurements for each of the logical cycle.

Finally, the Resource Estimator calculates the total number of required T states. To execute the algorithm, you need:

- 1 T state for each T gate.
- 4 T states for each CCZ and CCiX gates.
- $ 0.53 \log_2(\text{\#rotation gates(pre-layout)} / \text{Rotation synthesis error probability}) + 5.3$ for each single-qubit rotation gate.

### Algorithmic physical estimation

From the code distance of the QEC, the Resource Estimator has calculated the number of physical qubits required for one logical qubit and the runtime of one logical depth. 

In the previous step, [Algorithmic logical estimation](#algorithmic-logical-estimation), the Resource Estimator has calculated the number of logical qubits required. Then, the number of physical qubits required to run the algorithm after layout is $ \text{\# logical qubits} \times \text{\#physical qubits for one logical qubit}$.

Similarly, the runtime of the algorithm is $\text{\# algorithmic logical depths} \times \text{Runtime of one logical depth}$.

### T factory physical estimation

In the [Algorithmic logical estimation](#algorithmic-logical-estimation) step, the Resource Estimator calculates the total number of T states needed to run the algorithm. From the target parameters, the Resource Estimator has calculated the number of physical qubits for a single [T factory](xref:microsoft.quantum.concepts.tfactories) and its runtime. 

The goal is to produce all T states within the algorithm runtime with as few T factory copies as possible. The following diagram shows an example of the runtime of the algorithm (red) and the runtime of one T factory (blue). You can see that the runtime of the T factory is shorter than the runtime of the algorithm. In this example, one T factory can distill one T state. Two questions arise:

- How often can the T factory be invoked before the end of the algorithm?
- How many copies of the T factory distillation round are necessary to create the number of T states required during the algorithm's runtime?

<img src="~/media/resource-estimator-tfactory-plot.png" width="400" alt="Diagram showing the runtime of the algorithm (red) versus the runtime of one T factory (blue). Before the end of the algorithm, the T factory can run 8 times. If we need 30 T states, and T factory can run 8 times during runtime, then we need 4 copies of the T factories running in parallel to distill 30 T states.">

Before the end of the algorithm, the T factory can be invoked eight times, which is called a distillation round. For example, let's say that based on the [Algorithmic logical estimation](#algorithmic-logical-estimation) step, you need 30 T states. A single T factory is invoked eight times during runtime of the algorithm and thus, it creates eight T states. Then you need four copies of the T factory distillation round running in parallel to distill the 30 T states needed.

> [!NOTE]
> Note that T factory copies and T factory invocations aren't the same.

You can only do full invocations of a T factory. Therefore, there may be situations in which the accumulated runtime of all T factory invocations is less than the algorithm runtime. Since qubits are reused by different rounds, the number of physical qubits for one T factory is the maximum number of physical qubits used for one round. The runtime of the T factory is the sum of the runtime in all rounds.

> [!NOTE]
> If the physical T gate error rate is lower than the required logical T state error rate, the Resource Estimator cannot perform a good resource estimation. When you submit a resource estimation job, you may encounter that the T factory cannot be found because the required logical T state error rate is either too low or too high.

For more information, see Appendix C of [Assessing requirements to scale to practical quantum advantage](https://arxiv.org/abs/2211.07629).


## Assumptions

The following assumptions are taken into account for the simulation of the resource estimation.

- **Uniform independent physical noise**: The noise on physical qubits and physical qubit operations is the standard circuit noise model. In particular, it is assumed that error events at different space-time locations are independent and that error rates are uniform across the system in time and space.
- **Efficient classical computation**: Classical overhead (compilation, control, feedback, readout, decoding, etc.) doesn't dominate the overall cost of implementing the full quantum algorithm.
- **Extraction circuits for planar quantum ISA (instruction set architecture)**: Stabilizer extraction circuits with similar depth and error correction performance to those for standard surface and Floquet code patches can be constructed to implement all operations of the planar quantum ISA. 
- **Uniform independent logical noise**: The error rate of a logical operation is approximately equal to its space-time volume (the number of tiles multiplied by the number of logical cycles) multiplied by the error rate of a logical qubit in a standard one-tile patch in one logical cycle.
- **Negligible Clifford costs for synthesis**: The space overhead for synthesis and space and time overhead for transport of magic states within magic state factories and to synthesis qubits are all negligible.
- **Smooth magic state consumption rate**: The rate of T state consumption throughout the compiled algorithm is almost constant, or can be made almost constant without significantly impacting the resources.

## Next steps

- [Get the most out of the Resource Estimator](xref:microsoft.quantum.work-with-resource-estimator)
- [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator)
- [Use different SDKs and IDEs with Resource Estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Submit a QIR program to the Resource Estimator](xref:microsoft.quantum.tutorial.resource-estimator.qir)
