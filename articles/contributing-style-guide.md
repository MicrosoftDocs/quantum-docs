---
author: cgranade
description: Learn the naming, input, documentation and formatting conventions for Q# programming language applications and libraries.
ms.author: chgranad
ms.date: 06/27/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Q# Style Guide
uid: microsoft.quantum.contributing-qdk.overview.style
ms.custom: kr2b-contr-experiment
---

# Q# style guide #
## General conventions ##

The conventions in this guide make it easier to read and understand programs and libraries written in the Q# programming language.

## Guidance

We recommend:

- Stick to convention unless you intentionally want to provide code that is more readable and understandable for users.

## Naming conventions ##

Our goal is to aid developers who use the Quantum Development Kit. We strive to create function and operation names that help quantum developers write easy-to-read programs with minimal surprises. We have established *vocabulary* that expresses quantum concepts, such as our names for functions, operations, and types. All of this faciliates developers. Our choices either help or hinder developers in their efforts to communicate clearly. Let's offer clarity rather than obscurity.
In this section, we detail how we meet this obligation. We'll offer explicit guidance that helps the Q# development community.

### Operations and functions ###

Our name choices should first establish whether a symbol represents a function or an operation.
The difference between functions and operations indicates how a block of code behaves.
We rely on Q# models quantum operations to communicate the difference between functions and operations to users, through the use of side effects.
That is, an operation *does* something.

In contrast, functions describe the mathematical relationships between data.
The expression `Sin(PI() / 2.0)` *is* `1.0`, and implies nothing about the state of a program or its qubits.

In summary, operations do things, while functions are things.
Based on this difference, we name operations as verbs and functions as nouns.

> [!NOTE]
> When a user-defined type is declared, a new function that constructs instances of that type is implicitly defined at the same time.
> From that perspective, user-defined types should be nouns so that both the type itself and the constructor function have consistent names.

Ensure that operation names begin with verbs that clearly indicate the effect taken by the operation.
For example:

- `MeasureInteger`
- `EstimateEnergy`
- `SampleInt`

We should pay special attention when an operation takes another operation as input. Also, when the operation calls it.
In such cases, the action taken by the input operation is not clear at the time that the outer operation is defined. Therefore the right verb is not immediately clear.
We recommend the verb `Apply`, as in `ApplyIf`, `ApplyToEach`, and `ApplyToFirst`.
Other verbs may be useful in this case as well, as in `IterateThroughCartesianPower`.

| Verb | Expected Effect |
| ---- | ------ |
| Apply | An operation provided as input is called |
| Assert | A hypothesis about the outcome of a possible quantum measurement is checked by a simulator |
| Estimate | A classical value is returned, representing an estimate drawn from one or more measurements |
| Measure | A quantum measurement is performed, and its result is returned to the user |
| Prepare | A given register of qubits is initialized into a specific state |
| Sample | A classical value is returned at random from some distribution |

For functions, we recommend that you avoid use of verbs. Instead, use common nouns (see guidance on proper nouns below) or adjectives:

- `ConstantArray`
- `Head`
- `LookupFunction`

We recommend that you use past participles in every scenario possible. This strongly connects a function name to an action or side effect elsewhere in the quantum program.
As an example,  `ControlledOnInt` uses the part participle form of the verb "control" to indicate that the function acts as an adjective to modify its argument.
This name has the additional benefit of matching the semantics of the built-in `Controlled` functor, as discussed further in this article.
Similarly, _agent nouns_ can be used to construct function and UDT names from operation names. An example of this is the name `Encoder` for a UDT that is strongly associated with `Encode`.

# [Guidance](#tab/guidance)

We recommend:

- Use verbs for operation names.
- Use of nouns or adjectives for function names.
- Use of nouns for user-defined types and attributes.
- Use `CamelCase` in strong preference to `pascalCase`, `snake_case`, or `ANGRY_CASE`, for all callable names. Ensure that callable names start with uppercase letters.
- Use `pascalCase` in strong preference to `CamelCase`, `snake_case`, or `ANGRY_CASE`, for all local variables. Ensure that local variables start with lowercase letters.
- Avoid the use of underscores `_` in function and operation names; where additional levels of hierarchy are needed, use namespaces and namespace aliases.

# [Examples](#tab/examples)

| &nbsp;  | Name | Description |
|---|------|-------------|
| ☑ | `operation ReflectAboutStart` | Clear use of a verb ("reflect") to indicate the effect of the operation. |
| ☒ | <s>`operation XRotation`</s> | Use of noun phrase suggests function, rather than operation. |
| ☒ | <s>`operation search_oracle`</s> | Use of `snake_case` contravenes Q# notation. |
| ☒ | <s>`operation Search_Oracle`</s> | Use of underscores internal to operation name contravenes Q# notation. |
| ☑ | `function StatePreparationOracle` | Use of noun phrase suggests that the function returns an operation. |
| ☑ | `function EqualityFact` | Clear use of noun ("fact") to indicate that this is a function, while the adjective. |
| ☒ | <s>`function GetRotationAngles`</s> | Use of verb ("get") suggests that this is an operation. |
| ☑ | `newtype GeneratorTerm` | Use of noun phrase clearly refers to the result of calling the UDT constructor. |
| ☒ | <s>`@Attribute() newtype RunOnce()`</s> | Use of verb phrase suggests that the UDT constructor is an operation. |
| ☑ | `@Attribute() newtype Deprecated(Reason : String)` | Use of noun phrase communicates the use of the attribute. |

***

### Entry points

When you define entry points for Q# programs, the Q# compiler recognizes the [`@EntryPoint()` attribute](xref:Microsoft.Quantum.Core.EntryPoint). Entry points should have a specifc name (for example: `main`, `Main`, or `__main__`).
From the Q# developer perspective, entry points are ordinary operations annotated with `@EntryPoint()`.
Moreover, Q# entry points may be entry points for an entire application (for example, in Q# standalone executable programs), or may be an interface between a Q# program and the host program for an application (for example, when you use Q# with Python or .NET), such that the name "main" could be misleading when applied to a Q# entry point.

We recommend that you use naming entry points that reflect the use of the `@EntryPoint()` attribute by using the general advice for naming operations listed above.


# [Guidance](#tab/guidance)

We recommend:

- Do not name entry point operations as "main."
- Name entry point operations as ordinary operations.

# [Examples](#tab/examples)

| &nbsp;  | Name | Description |
|---|------|-------------|
| ☑ | `@EntryPoint() operation RunSimulation` | Clearly communicates purpose of entry point through operation name. |
| ☒ | <s>`@EntryPoint() operation Main`</s> | Use of `Main` doesn't clearly communicate purpose of entry point, and is redundant with `@EntryPoint()` attribute. |

***

### Shorthand and abbreviations ###

The above advice notwithstanding, many forms of shorthand are commonly used in quantum computing.
We recommend that you use common shorthand where it exists, especially for operations that are intrinsic to the operation of a target machine.
For example, we choose the name `X` instead of `ApplyX`, and `Rz` instead of `RotateAboutZ`.
When you use such shorthand, operation names should be all uppercase (for example, `MAJ`).

Pay attention when you apply this convention in the case of commonly used acronyms and initialisms such as "QFT" for "quantum Fourier transform."
We recommend following general .NET conventions for the use of acronyms and initialisms in full names, which recommend that:

- two-letter acronyms and initialisms are named in upper case (for example, `BE` for "big-endian"),
- all longer acronyms and initialisms are named in `CamelCase` (for example, `Qft` for "quantum Fourier transform")

An operation that implements the QFT could either be called `QFT` as shorthand, or written out as `ApplyQft`.

For commonly used operations and functions, you may want to provide a shorthand name as an _alias_ for a longer form:

```qsharp
operation CCNOT(control0 : Qubit, control1 : Qubit, target : Qubit)
is Adj + Ctl {
    Controlled X([control0, control1], target);
}
```

# [Guidance](#tab/guidance)

We recommend:

- Commonly accepted and widely used shorthand names when appropriate.
- Use uppercase for shorthand.
- Use uppercase for short (two-letter) acronyms and initialisms.
- Use `CamelCase` for longer (three or more letter) acronyms and initialisms.

# [Examples](#tab/examples)

| &nbsp;   | Name | Description |
|---|------|-------------|
| ☑ | `X` | Well-understood shorthand for "apply an $X$ transformation" |
| ☑ | `CNOT` | Well-understood shorthand for "controlled-NOT" |
| ☒ | <s>`Cnot`</s> | Shorthand should not be in `CamelCase`. |
| ☑ | `ApplyQft` | Common initialism "QFT" appears as a part of a long-form name. |
| ☑ | `QFT` | Common initialism "QFT" appears as a part of a shorthand name. |



***


### Proper nouns in names ###

In physics it is common to name things after the first person that published information about it. HOever, most non-physicists aren’t familiar with the important names and history of physics.
Don't rely too heavily on naming conventions from physics since they can create barriers to entry. They require users from other backgrounds to learn a large number of names just to use common operations and concepts.
<!-- Reduce confusion by making code more accessible.
Quantum computing is rich with domain expertise. We must be conscienscious of the demands we place on that expertise as we design quantum software.
Be aware of conventions from physics of the names of algorithms and operations being the names of their original publishers.
We must maintain the history and intellectual provenance of quantum computing concepts, but to demand that all users learn the history of physics creates barriers to entry that are severe enough to present an ethical compromise. -->
We recommend that wherever reasonable, common nouns that describe a concept be adopted. This is preferrable over proper nouns that describe the publication history of a concept.
As an example, the singly controlled SWAP and doubly controlled NOT operations are often called the "Fredkin" and "Toffoli" operations in academic literature, but are identified in Q# primarily as `CSWAP` and `CCNOT`.
In both cases, API documentation comments provide synonymous names based on proper nouns, along with all appropriate citations.

This option is especially important since some use of proper nouns will always be necessary — Q# follows the tradition set by many classical languages, for instance, and refers to `Bool` types in reference to Boolean logic, which is in turn named in honor of George Boole.
A few quantum concepts similarly are named in a similar fashion, including the `Pauli` type built-in to the Q# language.

# [Guidance](#tab/guidance) 

We recommend:

- Avoid use of proper nouns in names.

# [Examples](#tab/examples)

***

### Type conversions ###

Since Q# is a strongly and statically typed language, a value of one type can only be used as a value of another type by using an explicit call to a type conversion function.
This is in contrast to languages which allow for values to change types implicitly (for example, type promotion), or through casting.
As a result, type conversion functions play an important role in Q# library development, and comprise one of the more commonly encountered decisions about naming.
We note, however, that since type conversions are always _deterministic_, they can be written as functions and fall under the advice above.
We recommend that type conversion functions never be named as verbs (for example, `ConvertToX`) or adverb prepositional phrases (`ToX`), but should be named as adjective prepositional phrases that indicate the source and destination types (`XAsY`).
When you list array types in type conversion function names, we recommend the shorthand `Arr`.
We recommend that all type conversion functions be named using `As` so that they are quickly identified.

# [Guidance](#tab/guidance)

We recommend:

- If a function converts a value of type `X` to a value of type `Y`, use either the name `AsY` or `XAsY`.

# [Examples](#tab/examples)

| &nbsp;   | Name | Description |
|---|------|-------------|
| ☒ | <s>`ToDouble`</s> | The preposition "to" results in a verb phrase, indicating an operation and not a function. |
| ☒ | <s>`AsDouble`</s> | The input type is not clear from the function name. |
| ☒ | <s>`PauliArrFromBoolArr`</s> | The input and output types appear in the wrong order. |
| ☑ | `ResultArrAsBoolArr` | Both the input types and output types are clear. |

***

### Private or internal names ###

In many cases, a name is intended strictly for internal use in a library or project. It is not a guaranteed part of the API that a library offers.
It is helpful to clearly indicate that this is the case when naming functions and operations so that accidental dependencies on internal-only code are made obvious.
There are operations and functions that aren't intended for direct use. They can be used by a matching callable which acts by partial application. Then consider using a name that starts with the `internal` keyword for the callable that is partially applied.

# [Guidance](#tab/guidance)

We recommend:

- When functions, operations, or user-defined types are not part of the public API for a Q# library or program, mark it as internal by placing the `internal` keyword before the `function`, `operation`, or `newtype` declaration.

# [Examples](#tab/examples)

| &nbsp;  | Name | Description |
|---|------|-------------|
| ☒ | <s>`operation _ApplyDecomposedOperation`</s> | Do not use an underscore `_` to indicate that this operation is for internal use only. |
| ☑ | `internal operation ApplyDecomposedOperation` | The `internal` keyword at the beginning clearly indicates that this operation is for internal use only. |

***
### Variants ###

There are often groups of related operations or functions that are identified by which functors their inputs support. They can also be identified by the concrete types of their arguments. This limitation may not persist in future versions of Q#.
These groups can be identified by using the same root name, followed by one or two letters that indicate its variant.

| Suffix | Meaning |
|--------|---------|
| `A` | Input expected to support `Adjoint` |
| `C` | Input expected to support `Controlled` |
| `CA` | Input expected to support `Controlled` and `Adjoint` |
| `I` | Input or inputs are of type `Int` |
| `D` | Input or inputs are of type `Double` |
| `L` | Input or inputs are of type `BigInt` |

# [Guidance](#tab/guidance)

We recommend:

- If a function or operation is not related to any similar functions or operations by the types and functor support of their inputs, do not use a suffix.
- If a function or operation is related to any similar functions or operations by the types and functor support of their inputs, use suffixes as in the table above to identify variants.

# [Examples](#tab/examples)

***

### Arguments and variables ###

A key goal of the Q# code for a function or operation is for it to be easily read and understood.
Similarly, the names of inputs and type arguments should communicate how a function or argument will be used once provided.


# [Guidance](#tab/guidance)

We recommend:

- For all variable and input names, use `pascalCase` in strong preference to `CamelCase`, `snake_case`, or `ANGRY_CASE`.
- Input names should be descriptive; avoid one or two letter names where possible.
- Operations and functions that accept one type argument should denote that type argument by `T` when its role is obvious.
- If a function or operation takes multiple type arguments, or if the role of a single type argument is not obvious, consider using a short capitalized word prefaced by `T` (for example, `TOutput`) for each type.
- Do not include type names in argument and variable names; this information can and should be provided by your development environment.
- Denote scalar types by their literal names (`flagQubit`), and array types by a plural (`measResults`).
  For arrays of qubits, consider denoting such types by `Register` where the name refers to a sequence of qubits that are closely related in some way.
- Variables used as indices into arrays should begin with `idx` and should be singular (for example, `things[idxThing]`).
  Avoid using single-letter variable names as indices; consider using `idx` at a minimum.
- Variables used to hold lengths of arrays should begin with `n` and should be pluralized (for example, `nThings`).

# [Examples](#tab/examples)

***

### User-defined type named items ###

Named items in user-defined types should be named as `CamelCase`, even in input to UDT constructors.
This helps in order to clearly separate named items from references to locally scoped variables when using accessor notation (for example, `callable::Apply`) or copy-and-update notation (`set arr w/= Data <- newData`).

# [Guidance](#tab/guidance)

We recommend:

- Named items in UDT constructors should be named as `CamelCase`; that is, they should begin with an initial uppercase.
- Named items that resolve to operations should be named as verb phases.
- Named items that do not resolve to operations should be named as noun phrases.
- For UDTs that wrap operations, a single named item called `Apply` should be defined.

# [Examples](#tab/examples)

| &nbsp;  | Snippet | Description |
|---|---------|-------------|
| ☑ | `newtype Oracle = (Apply : Qubit[] => Unit is Adj + Ctl)` | The name `Apply` is a `CamelCase`-formatted verb phrase, suggesting that the named item is an operation. |
| ☒ | <s>`newtype Oracle = (apply : Qubit[] => Unit is Adj + Ctl) `</s> | Named items should begin with an initial uppercase letter. |
| ☒ | <s>`newtype Collection = (Length : Int, Get : Int -> (Qubit => Unit)) `</s> | Named items which resolve to functions should be named as noun phrases, not as verb phrases. |

***

## Input conventions ##

When a developer calls an operation or function, input parameters must be specified in a specific order. This increases the cognitive load that a developer faces to be able to use a library.
Remembering the order of input parameters is often a distraction from the task at hand: programming an implementation of a quantum algorithm.
Though rich IDE support can mitigate this to a large extent, good design and adherence to common conventions can also help to minimize the cognitive load imposed by an API.

Reduce the number of inputs expected by an operation or function. This way the role of each input is more immediately obvious both to developers that call the operation or function, and to developers that read the code later.
When it is not possible or reasonable to reduce the number of arguments in an operation or function, be consistent with the order of arguments. This minimizes surprises as users predict input order.

We recommend an input order convention. Create this by thinking of partial application as a generalization of currying 𝑓(𝑥, 𝑦) ≡ 𝑓(𝑥)(𝑦).
Partially apply the first arguments which results in a callable that is useful in its own right whenever that is reasonable.
Also consider using the following order of arguments:

- Classical non-callable arguments such as angles, vectors of powers, etc.
- Callable arguments (functions and arguments).
  If both functions and operations are taken as arguments, consider placing operations after functions.
- Collections acted upon by callable arguments in a similar way to `Map`, `Iter`, `Enumerate`, and `Fold`.
- Qubit arguments used as controls.
- Qubit arguments used as targets.

Consider an operation `ApplyPhaseEstimationIteration` for use in phase estimation that takes an angle and an oracle, passes the angle to `Rz` modified by an array of different scaling factors, and then controls applications of the oracle.
We would order inputs to `ApplyPhaseEstimationIteration` in the following fashion:

```qsharp
operation ApplyPhaseEstimationIteration(
    angle : Double,
    callable : (Qubit => () is Ctl),
    scaleFactors : Double[],
    controlQubit : Qubit,
    targetQubits : Qubit[]
)
: Unit
...
```
Some functions and operations mimic the behavior of the built-in functors `Adjoint` and `Controlled`.
For instance, `ControlledOnInt<'T>` has type `(Int, ('T => Unit is Adj + Ctl)) => ((Qubit[], 'T) => Unit is Adj + Ctl)`, such that `ControlledOnInt<Qubit[]>(5, _)` acts like the `Controlled` functor, but on the condition that the control register represents the state $\ket{5} = \ket{101}$.
Developers expect that input to `ControlledOnInt` places the callable that is being transformed, last in the queue. They also assume that the resulting operation accepts `(Qubit[], 'T)` as its input--- the same order as followed by the output of the `Controlled` functor.

# [Guidance](#tab/guidance)

We recommend:

- Order your inputs to be consistent with use of partial application.
- Order your inputs to be consistent with built-in functors.
- Place all classical inputs before any quantum inputs.

# [Examples](#tab/examples)

***

## Documentation conventions ##

The Q# language allows you to attach documentation to operations, functions, and user-defined types through use of specially formatted documentation comments.
Denoted by triple-slashes (`///`), these documentation comments are small [DocFX-flavored Markdown](https://dotnet.github.io/docfx/spec/docfx_flavored_markdown.html) documents that describe the purpose of operations, functions, and user-defined types, expected inputs, etc.
The Quantum Development Kit compiler extracts these comments and uses them to help typeset documentation similar to that at [docs.microsoft.com](/documentation/).
Similarly, the Quantum Development Kit language server uses these comments to help users when they hover over symbols in their Q# code.
Documentation comments can help users to make sense of code. 

> [!div class="nextstepaction"]
> [Documentation comment syntax reference](xref:microsoft.quantum.qsharp.comments#documentation-comments).

Keep a few things in mind as you write documentation comments:

# [Guidance](#tab/guidance)

We recommend:

- Each public function, operation, and user-defined type should be immediately preceded by a documentation comment.
- At a minimum, each documentation comment should include the following sections:
    - Summary
    - Input
    - Output (if applicable)
- Ensure that all summaries are two sentences or less. If more room is needed, provide a `# Description` section immediately following `# Summary` with complete details.
- Where reasonable, do not include math in summaries, as not all clients support TeX notation in summaries. Note that when you write prose documents (for example, TeX or Markdown), it may be preferable to use longer line lengths.
- Provide all relevant mathematical expressions in the `# Description` section.
- When you describe inputs, do not repeat the types of each input as these can be inferred by the compiler and risk being inconsistent.
- Provide examples as appropriate, each in their own `# Example` section.
- Briefly describe each example before you list code.
- Cite all relevant academic publications (for example: papers, proceedings, blog posts, and alternative implementations) in a `# References` section as a bulleted list of links.
- Ensure that, where possible, all citation links are to permanent and immutable identifiers (DOIs or versioned arXiv numbers).
- When an operation or function is related to other operations or functions by functor variants, list other variants as bullets in the `# See Also` section.
- Leave a blank comment line between level-1 (`/// #`) sections, but do not leave a blank line between level-2 (`/// ##`) sections.

# [Examples](#tab/examples)

#### ☑ ####

```
/// # Summary
/// Applies a rotation about the X-axis by a given angle.
///
///
/// # Description
/// This operation rotates a single qubit by the unitary operation
/// \begin{align}
///     R_x(\theta) \mathrel{:=} e^{-i \theta \sigma_x / 2}.
/// \end{align}
///
/// # Input
/// ## theta
/// Angle about which the qubit is to be rotated.
/// ## qubit
/// Qubit to which the gate should be applied.
///
/// # Remarks
/// Equivalent to:
/// ```qsharp
/// R(PauliX, theta, qubit);
/// ```
///
/// # See Also
/// - Ry
/// - Rz
operation Rx(theta : Double, qubit : Qubit) : Unit
is Adj + Ctl {
    body (...) { R(PauliX, theta, qubit); }
    adjoint (...) { R(PauliX, -theta, qubit); }
}
```

***

## Formatting conventions ##

In addition to the preceding recommendations, make code as legible as possible for consistent formatting rules.
Such formatting rules by nature tend to be arbitrary and strongly up to personal aesthetics.
Nonetheless, we recommend that you maintain a consistent set of formatting conventions within a group of collaborators, and especially for large Q# projects.
These rules can be automatically applied by using the formatting tool that is integrated with the Q# compiler.

# [Guidance](#tab/guidance) 

We recommend:

- Use four spaces instead of tabs for portability.
  For instance, in VS Code:
  ```json
    "editor.insertSpaces": true,
    "editor.tabSize": 4
  ```
- Line wrap at 79 characters where reasonable.
- Use spaces around binary operators.
- Use spaces on either side of colons used for type annotations.
- Use a single space after commas used in array and tuple literals (for example, in inputs to functions and operations).
- Do not use spaces after function, operation, or UDT names in calls and declarations, or after the `@` in attribute declarations.
- Each attribute declaration should be on its own line.

# [Examples](#tab/examples)

| &nbsp; | Snippet | Description |
|---|---------|-------------|
| ☒ | <s>`2+3`</s> | Use spaces around binary operators. |
| ☒ | <s>`target:Qubit`</s> | Use spaces around type annotation colons. |
| ☑ | `Example(a, b, c)` | Items in input tuple are correctly spaced for readability. |
| ☒ | <s>`Example (a, b, c)`</s> | Spaces should be suppressed after function, operation, or UDT names in calls. |
| ☒ | <s>`operation GenerateRandomBit ()`</s> | Spaces should be suppressed after function, operation, or UDT names in declaration. |

***
