---
author: bradben
description: Learn about the flow control operations and functions in the Microsoft Q# standard library.
ms.author: brbenefield
ms.date: 06/12/2023
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v', target, targets]
title: Flow controls in the Q# standard libararies
uid: microsoft.quantum.libraries.overview-standard.control-flow
---

# Higher-order control flow 

One of the primary roles of the standard library is to make it easier to express high-level algorithmic ideas as [quantum programs](https://en.wikipedia.org/wiki/Quantum_programming).
Thus, the Q# canon provides a variety of different flow control constructs, each implemented using partial application of functions and operations.
Jumping immediately into an example, consider the case in which you want to construct a "CNOT ladder" on a register:

```qsharp
let nQubits = Length(register);
CNOT(register[0], register[1]);
CNOT(register[1], register[2]);
// ...
CNOT(register[nQubits - 2], register[nQubits - 1]);
```

You can express this pattern by using iteration and `for` loops:

```qsharp
for idxQubit in 0..nQubits - 2 {
    CNOT(register[idxQubit], register[idxQubit + 1]);
}
```

Expressed in terms of the [ApplyToEachCA](xref:Microsoft.Quantum.Canon.ApplyToEachCA) operation and array manipulation functions such as the [Zipped](xref:Microsoft.Quantum.Arrays.Zipped) function, however, this is much shorter and easier to read:

```qsharp
ApplyToEachCA(CNOT, Zip(register[0..nQubits - 2], register[1..nQubits - 1]));
```

In the rest of this section, you'll provide a number of examples of how to use the various flow control operations and functions provided by the canon to compactly express quantum programs.

## Applying operations and functions over arrays and ranges

One of the primary abstractions provided by the canon is that of iteration.
For instance, consider a unitary of the form $U \otimes U \otimes \cdots \otimes U$ for a single-qubit unitary $U$.
In Q#, you can use the [IndexRange](xref:Microsoft.Quantum.Arrays.IndexRange) function to represent this as as a `for` loop over a register:

```qsharp
/// # Summary
/// Applies $H$ to all qubits in a register.
operation ApplyHadamardToAll(
    register : Qubit[])
: Unit is Adj + Ctl {
    for qubit in register {
        H(qubit);
    }
}
```

You can then use this new operation as `HAll(register)` to apply $H \otimes H \otimes \cdots \otimes H$.

This is cumbersome to do, however, especially in a larger algorithm.
Moreover, this approach is specialized to the particular operation that you wish to apply to each qubit.
You can use the fact that operations are first-class to express this algorithmic concept more explicitly:

```qsharp
ApplyToEachCA(H, register);
```

Here, the suffix `CA` indicates that the call to `ApplyToEach` is itself adjointable and controllable.
Thus, if `U` supports `Adjoint` and `Controlled`, the following lines are equivalent:

```qsharp
Adjoint ApplyToEachCA(U, register);
ApplyToEachCA(Adjoint U, register);
```

In particular, this means that calls to `ApplyToEachCA` can appear in operations for which an adjoint specialization is auto-generated.
Similarly, the [ApplyToEachIndex](xref:Microsoft.Quantum.Canon.ApplyToEachIndex) operation is useful for representing patterns of the form `U(0, targets[0]); U(1, targets[1]); ...`, and offers versions for each combination of functors supported by its input.

> [!TIP]
> `ApplyToEach` is type-parameterized such that it can be used with operations that take inputs other than `Qubit`.
> For example, suppose that `codeBlocks` is an array of [LogicalRegister](xref:Microsoft.Quantum.ErrorCorrection.LogicalRegister) user defined type values that need to be recovered.
> Then `ApplyToEach(Recover(code, recoveryFn, _), codeBlocks)` applies the error-correcting code `code` and recovery function `recoveryFn` to each block independently.
> This holds even for classical inputs: `ApplyToEach(R(_, _, qubit), [(PauliX, PI() / 2.0); (PauliY(), PI() / 3.0]))` applies a rotation of $\pi / 2$ about $X$ followed by a rotation of $pi / 3$ about $Y$.

The Q# canon also provides support for classical enumeration patterns familiar to functional programming.
For instance, the [Fold](xref:Microsoft.Quantum.Arrays.Fold) function implements the pattern $f(f(f(s\_{\text{initial}}, x\_0), x\_1), \dots)$ for reducing a function over a list.
This pattern can be used to implement sums, products, minima, maxima and other such functions:

```qsharp
open Microsoft.Quantum.Arrays;
function Plus(a : Int, b : Int) : Int { return a + b; }
function Sum(xs : Int[]) {
    return Fold(Sum, 0, xs);
}
```

Similarly, functions like [Mapped](xref:Microsoft.Quantum.Arrays.Mapped) and [MappedByIndex](xref:Microsoft.Quantum.Arrays.MappedByIndex) can be used to express functional programming concepts in Q#.

## Composing operations and functions

The control flow constructs offered by the canon take operations and functions as their inputs, such that it is helpful to be able to compose several operations or functions into a single callable.
For instance, the pattern $UVU^{\dagger}$ is extremely common in quantum programming, such that the canon provides the  [ApplyWith](xref:Microsoft.Quantum.Canon.ApplyWith) operation as an abstraction for this pattern.
This abstraction also allows for more efficient compilation into circuits, as `Controlled` acting on the sequence `U(qubit); V(qubit); Adjoint U(qubit);` does not need to act on each `U`.
To see this, let $c(U)$ be the unitary representing `Controlled U([control], target)` and let $c(V)$ be defined in the same way.
Then for an arbitrary state $\ket{\psi}$,
\begin{align}
    c(U) c(V) c(U)^\dagger \ket{1} \otimes \ket{\psi}
        & = \ket{1} \otimes (UVU^{\dagger} \ket{\psi}) \\\\
        & = (\boldone \otimes U) (c(V)) (\boldone \otimes U^\dagger) \ket{1} \otimes \ket{\psi}.
\end{align}
by the definition of `Controlled`.
On the other hand,
\begin{align}
    c(U) c(V) c(U)^\dagger \ket{0} \otimes \ket{\psi}
        & = \ket{0} \otimes \ket{\psi} \\\\
        & = \ket{0} \otimes (UU^\dagger \ket{\psi}) \\\\
        & = (\boldone \otimes U) (c(V)) (\boldone \otimes U^\dagger) \ket{0} \otimes \ket{\psi}.
\end{align}
By linearity, you can conclude that you can factor $U$ out in this way for all input states.
That is, $c(UVU^\dagger) = U c(V) U^\dagger$.
Since controlling operations can be expensive in general, using controlled variants such as `WithC` and `WithCA` can help reduce the number of control functors that need to be applied.

> [!NOTE]
> One other consequence of factoring out $U$ is that you need not even know how to apply the `Controlled` functor to `U`.
> `ApplyWithCA` therefore has a weaker signature than might be expected:
> ```qsharp
> ApplyWithCA<'T> : (('T => Unit is Adj),
>     ('T => Unit is Adj + Ctl), 'T) => Unit
> ```

Similarly, the [Bound](xref:Microsoft.Quantum.Canon.Bound) function produces operations which apply a sequence of other operations in turn.
For instance, the following are equivalent:

```qsharp
H(qubit); X(qubit);
Bound([H, X], qubit);
```

Combining with iteration patterns can make this especially useful:

```qsharp
// Bracket the quantum Fourier transform with $XH$ on each qubit.
ApplyWith(ApplyToEach(Bound([H, X]), _), QFT, _);
```

### Time-ordered composition

You can go still further by thinking of flow control in terms of partial application and classical functions, and can model even fairly sophisticated quantum concepts in terms of classical flow control.
This analogy is made precise by the recognition that unitary operators correspond exactly to the side effects of calling operations, such that any decomposition of unitary operators in terms of other unitary operators corresponds to constructing a particular calling sequence for classical subroutines which emit instructions to act as particular unitary operators.
Under this view, `Bound` is precisely the representation of the matrix product, since `Bound([A, B])(target)` is equivalent to `A(target); B(target);`, which in turn is the calling sequence corresponding to $BA$.

A more sophisticated example is the [Trotter–Suzuki expansion](https://arxiv.org/abs/math-ph/0506007v1).
As discussed in [Dynamical Generator Representation](xref:microsoft.quantum.libraries.overview.data-structures#dynamical-generator-representation), the Trotter–Suzuki expansion provides a particularly useful way of expressing matrix exponentials.
For instance, applying the expansion at its lowest order yields that for any operators $A$ and $B$ such that $A = A^\dagger$ and $B = B^\dagger$,
\begin{align}
    \tag{★} \label{eq:trotter-suzuki-0}
    \exp(i [A + B] t) = \lim_{n\to\infty} \left(\exp(i A t / n) \exp(i B t / n)\right)^n.
\end{align}
Colloquially, this says that you can approximately evolve a state under $A + B$ by alternately evolving under $A$ and $B$ alone.
If you represent evolution under $A$ by an operation `A : (Double, Qubit[]) => Unit` that applies $e^{i t A}$, then the representation of the Trotter–Suzuki expansion in terms of rearranging calling sequences becomes clear.
Concretely, given an operation `U : ((Int, Double, Qubit[]) => Unit is Adj + Ctl` such that `A = U(0, _, _)` and `B = U(1, _, _)`, you can define a new operation representing the integral of `U` at time $t$ by generating sequences of the form

```qsharp
U(0, time / Float(nSteps), target);
U(1, time / Float(nSteps), target);
U(0, time / Float(nSteps), target);
U(1, time / Float(nSteps), target);
// ...
```

At this point, you can now reason about the Trotter–Suzuki expansion *without reference to quantum mechanics at all*.
The expansion is effectively a very particular iteration pattern motivated by $\eqref{eq:trotter-suzuki-0}$.
This iteration pattern is implemented by the [DecomposedIntoTimeStepsCA](xref:Microsoft.Quantum.Canon.DecomposedIntoTimeStepsCA) function:

```qsharp
// The 2 indicates how many terms you need to decompose,
// while the 1 indicates that you are using the
// first-order Trotter–Suzuki decomposition.
DecomposeIntoTimeStepsCA((2, U), 1);
```

The signature of `DecomposeIntoTimeStepsCA` follows a common pattern in Q#, where collections that may be backed either by arrays or by something which compute elements on the fly are represented by tuples whose first elements are `Int` values indicating their lengths.

## Putting it together: Controlling operations

Finally, the canon builds on the `Controlled` functor by providing additional ways to condition quantum operations.
It is common, especially in quantum arithmetic, to condition operations on computational basis states other than $\ket{0\cdots 0}$.
Using the control operations and functions introduced earlier, you can have more general quantum conditions in a single statement.
For example, look at how the the [ControlledOnBitString](xref:Microsoft.Quantum.Canon.ControlledOnBitString) function does it (without type parameters), and break down the pieces one by one.
The first thing you'll need to do is to define an operation which actually does the heavy lifting of implementing the control on arbitrary computational basis states.
You won't call this operation directly, however, and so you add `_` to the beginning of the name to indicate that it's an implementation of another construct elsewhere.

```qsharp
operation _ControlledOnBitString(
    bits : Bool[],
    oracle: (Qubit[] => Unit is Adj + Ctl),
    controlRegister : Qubit[],
    targetRegister: Qubit[])
: Unit is Adj + Ctl
```

Note that you take a string of bits, represented as a `Bool` array, that you use to specify the conditioning that you want to apply to the operation `oracle` that you are given.
Since this operation actually does the application directly, you also need to take the control and target registers, both represented here as `Qubit[]`.

Next, you note that controlling on the computational basis state $\ket{\vec{s}} = \ket{s\_0 s\_1 \dots s\_{n - 1}}$ for a bit string $\vec{s}$ can be realized by transforming $\ket{\vec{s}}$ into $\ket{0\cdots 0}$.
In particular, $\ket{\vec{s}} = X^{s\_0} \otimes X^{s\_1} \otimes \cdots \otimes X^{s\_{n - 1}} \ket{0\cdots 0}$.
Since $X^{\dagger} = X$, this implies that $\ket{0\dots 0} = X^{s\_0} \otimes X^{s\_1} \otimes \cdots \otimes X^{s\_{n - 1}} \ket{\vec{s}}$.
Thus, you can apply $P = X^{s\_0} \otimes X^{s\_1} \otimes \cdots \otimes X^{s\_{n - 1}}$, apply `Controlled oracle`, and transform back to $\vec{s}$.
This construction is precisely `ApplyWith`, so you write the body of the new operation accordingly:

```qsharp
{
    ApplyWithCA(
        ApplyPauliFromBitString(PauliX, false, bits, _),
        (Controlled oracle)(_, targetRegister),
        controlRegister
    );
}
```

Here, you have used the [ApplyPauliFromBitString](xref:Microsoft.Quantum.Canon.ApplyPauliFromBitString) operation to apply $P$, partially applying over its target for use with `ApplyWith`.
Note, however, that you need to transform the *control* register to the desired form, so you partially apply the inner operation `(Controlled oracle)` on the *target*.
This leaves `ApplyWith` acting to bracket the control register with $P$, as desired.

At this point, you could be done, but it is somehow unsatisfying that your new operation does not "feel" like applying the `Controlled` functor.
Thus, you finish defining your new control flow concept by writing a function that takes the oracle to be controlled and that returns a new operation.
In this way, your new function looks and feels very much like `Controlled`, illustrating that you can easily define powerful new control flow constructs using Q# and the canon together:

```qsharp
function ControlledOnBitString(
    bits : Bool[],
    oracle: (Qubit[] => Unit is Adj + Ctl))
: ((Qubit[], Qubit[]) => Unit is Adj + Ctl) {
    return _ControlledOnBitString(bits, oracle, _, _);
}
```
