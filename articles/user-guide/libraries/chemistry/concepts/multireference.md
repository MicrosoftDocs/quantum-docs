---
author: bradben
description: Learn about dynamic and non-dynamic correlations in wavefunctions using the Azure Quantum chemistry library.
ms.author: brbenefield
ms.date: 07/29/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Correlated wavefunctions
uid: microsoft.quantum.libraries.overview-chemistry.concepts.multireference
---

# Correlated wavefunctions

For many systems, particularly those near the equilibrium geometry, [Hartree–Fock](xref:microsoft.quantum.libraries.overview-chemistry.concepts.hartreefock) theory provides a qualitative description of molecular properties through a single-determinant reference state.
However, in order to achieve quantitative accuracy, one must also consider correlation effects.

In this context, it's important to distinguish between dynamic and non-dynamic correlations.
Dynamical correlations arise from the tendency of electrons to stay apart, such as due to interelectronic repulsion.
This effect can be modeled by considering excitations of electrons out of the reference state.
Non-dynamic correlations arise when the wavefunction is dominated by two or more configurations at zeroth order, even to achieve only a qualitative description of the system.
This scenario necessitates a superposition of determinants and is an example of a multireference wavefunction.

The chemistry library provides a way to specify a zeroth order wavefunction for the multireference problem as a superposition of determinants.
This approach, which we call sparse multireference wavefunctions, is effective when only a few components suffice to specify the superposition.
The library also provides a method to include dynamic correlations on top of a single-determinant reference via the generalized unitary coupled-cluster ansatz. Furthermore, it also constructs quantum circuits that generate these states on a quantum computer. These states may be specified in the [Broombridge schema](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge), and we also provide the functionality to manually specify these states through the chemistry
library.

## Sparse multi-reference wavefunction

A multi-reference state $\ket{\psi_{\rm {MCSCF}}}$ may be specified explicitly as a linear combination of $N$-electron Slater determinants.

\begin{align}
    \ket{\psi_{\rm {MCSCF}}} \propto \sum_{i_1 < i_2 < \cdots < i_N} \lambda_{i_1,i_2,\cdots,i_N} a^\dagger_{i_1}a^\dagger_{i_2}\cdots a^\dagger_{i_N}\ket{0}.
\end{align}

For example, the state $\propto(0.1 a^\dagger_1a^\dagger_2a^\dagger_6 - 0.2 a^\dagger_2a^\dagger_1a^\dagger_5)\ket{0}$ may be specified in the chemistry library as follows.

```csharp
// Make sure to include this namespace at the top of your file or namespace.
using Microsoft.Quantum.Chemistry.Fermion;
```

```csharp
    // Create a list of tuples where the first item of each 
    // tuple are indices to the creation operators acting on the
    // vacuum state, and the second item is the coefficient
    // of that basis state.
    var superposition = new[] {
        (new[] {1, 2, 6}, 0.1),
        (new[] {2, 1, 5}, -0.2) };

    // Create a fermion wavefunction object that represents the superposition.
    var wavefunction = new FermionWavefunction<int>(superposition);
```

This explicit representation of the superposition components is effective when only a few components need to be specified.
You should avoid using this representation when many components are required to accurately capture the desired state.
The reason for this is the gate cost of the quantum circuit that prepares this state on a quantum computer. The gate cost scales at least linearly with the number of superposition components, and at most quadratically with the one-norm of the superposition amplitudes.

## Unitary coupled-cluster wavefunction

It's also possible to specify a unitary coupled-cluster wavefunction $\ket{\psi_{\rm {UCC}}}$ using the chemistry library.
In this situation, we have a single-determinant reference state, say, $\ket{\psi_{\rm{SCF}}}$.
The components of the unitary coupled-cluster wavefunction are then specified implicitly through a unitary operator acting on a reference state.
This unitary operator is commonly written as $e^{T-T^\dagger}$, where $T-T^\dagger$ is the anti-Hermitian cluster operator.
Thus

\begin{align}
    \ket{\psi_{\rm {UCC}}} = e^{T-T^\dagger}\ket{\psi_{\rm{SCF}}}.
\end{align}

It's also common to split the cluster operator $T = T_1 + T_2 + \cdots$ into parts, where each part $T_j$ contains $j$-body terms. In generalized coupled-cluster theory, the one-body cluster operator (singles) is of the form

\begin{align}
    T_1 = \sum_{pq}t^{p}_{q} a^\dagger_p a_q,
\end{align}

and two-body cluster operator (doubles) is of the form

\begin{align}
    T_2 = \sum_{pqrs}t^{pq}_{rs} a^\dagger_p a^\dagger_q a_r a_s.
\end{align}

Higher-order terms (triples, quadruples, etc.) are possible, but not currently supported by the chemistry library.

For example, let $\ket{\psi_{\rm{SCF}}} = a^\dagger_1 a^\dagger_2\ket{0}$, and let $T= 0.123 a^\dagger_0 a_1 + 0.456 a^\dagger_0a^\dagger_3 a_1 a_2 - 0.789 a^\dagger_3a^\dagger_2 a_1 a_0$. Then this state is instantiated in the chemistry library as follows.

```csharp
// The code snippets in this section require the following namespaces.
// Make sure to include these at the top of your file or namespace.
using Microsoft.Quantum.Chemistry;
using Microsoft.Quantum.Chemistry.OrbitalIntegrals;
using Microsoft.Quantum.Chemistry.LadderOperators;
using Microsoft.Quantum.Chemistry.Fermion;
// We load this namespace for convenience methods for manipulating arrays.
using System.Linq;
```

```csharp
    // Create a list of indices of the creation operators
    // for the single-reference state
    var reference = new[] { 1, 2 };

    // Create a list describing the cluster operator
    // The first half of each list of integers will be
    // associated with the creation operators, and
    // the second half with the annihilation operators.
    var clusterOperator = new[]
    {
        (new [] {0, 1}, 0.123),
        (new [] {0, 3, 1, 2}, 0.456),
        (new [] {3, 2, 1, 0}, 0.789)
    };

    // Create a fermion wavefunction object that represents the 
    // unitary coupled-cluster wavefunction. It's assumed implicitly
    // that the exponent of the unitary coupled-cluster operator
    // is the cluster operator minus its Hermitian conjugate.
    var wavefunction = new FermionWavefunction<int>(reference, clusterOperator);
```

Spin conservation may be made explicit by instead specifying `SpinOrbital` indices instead of integer indices. For example, let $\ket{\psi_{\rm{SCF}}} = a^\dagger_{1,\uparrow} a^\dagger_{2, \downarrow}\ket{0}$, and let $T= 0.123 a^\dagger_{0, \uparrow} a_{1, \uparrow} + 0.456 a^\dagger_{0, \uparrow} a^\dagger_{3, \downarrow} a_{1, \uparrow} a_{2, \downarrow} - 0.789 a^\dagger_{3,\uparrow} a^\dagger_{2,\uparrow} a_{1,\uparrow} a_{0, \uparrow}$ be spin conserving. Then this state is instantiated in the chemistry library as follows.

```csharp
    // Create a list of indices of the creation operators
    // for the single-reference state
    var reference = new[] { (1, Spin.u), (2, Spin.d) }.ToSpinOrbitals();

    // Create a list describing the cluster operator
    // The first half of each list of integers will be
    // associated with the creation operators, and
    // the second half with the annihilation operators.
    var clusterOperator = new[]
    {
        (new [] {(0, Spin.u), (1, Spin.u)}, 0.123),
        (new [] {(0, Spin.u), (3, Spin.d), (1, Spin.u), (2, Spin.d)}, 0.456),
        (new [] {(3, Spin.u), (2, Spin.u), (1, Spin.u), (0, Spin.u)}, 0.789)
    }.Select(o => (o.Item1.ToSpinOrbitals(), o.Item2));

    // Create a fermion wavefunction object that represents the
    // unitary coupled-cluster wavefunction. It's assumed implicitly
    // that the exponent of the unitary coupled-cluster operator
    // is the cluster operator minus its Hermitian conjugate.
    var wavefunctionSpinOrbital = new FermionWavefunction<SpinOrbital>(reference, clusterOperator);

    // Convert the wavefunction indexed by spin-orbitals to one indexed
    // by integers
    var wavefunctionInteger = wavefunctionSpinOrbital.ToIndexing(IndexConvention.UpDown);
```

We also provide a convenience function that enumerates over all spin-conversing cluster operators that annihilate only occupied spin-orbitals and excite to only unoccupied spin-orbitals.

```csharp
    // Create a list of indices of the creation operators
    // for the single-reference state
    var reference = new[] { (1, Spin.u), (2, Spin.d) }.ToSpinOrbitals();

    // Generate all spin-conversing excitations from spin-orbitals
    // occupied by the reference state to virtual orbitals.
    var generatedExcitations = reference.CreateAllUCCSDSingletExcitations(nOrbitals: 3).Excitations;

    // This is the list of expected spin-conserving excitations
    var expectedExcitations = new[]
    {
        new []{ (0, Spin.u), (1,Spin.u)},
        new []{ (2, Spin.u), (1,Spin.u)},
        new []{ (0, Spin.d), (2,Spin.d)},
        new []{ (1, Spin.d), (2,Spin.d)},
        new []{ (0, Spin.u), (0, Spin.d), (2, Spin.d), (1,Spin.u)},
        new []{ (0, Spin.u), (1, Spin.d), (2, Spin.d), (1,Spin.u)},
        new []{ (0, Spin.d), (2, Spin.u), (2, Spin.d), (1,Spin.u)},
        new []{ (1, Spin.d), (2, Spin.u), (2, Spin.d), (1,Spin.u)}
    }.Select(o => new IndexOrderedSequence<SpinOrbital>(o.ToLadderSequence()));

    // The following two assertions are true, and verify that the generated
    // excitations exactly match the expected excitations.
    var bool0 = generatedExcitations.Keys.All(expectedExcitations.Contains);
    var bool1 = generatedExcitations.Count() == expectedExcitations.Count();
```
