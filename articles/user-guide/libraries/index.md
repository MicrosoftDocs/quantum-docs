---
author: bradben
description: Overview of the standard, chemistry, numerics, and machine learning libraries included in the Quantum Development Kit (QDK).
ms.author: brbenefield
ms.date: 03/30/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Quantum Development Kit Libraries
uid: microsoft.quantum.libraries.overview
---

# The Q# Libraries

The Quantum Development Kit (QDK) provides additional domain-specific functionality through _NuGet packages_ that can be added to your Q# projects.

| Q# Library  | NuGet package | Notes |
|---------|---------|--------|
| [Q# standard libraries](xref:microsoft.quantum.libraries.overview.standard.intro) | [**Microsoft.Quantum.Standard**](https://www.nuget.org/packages/Microsoft.Quantum.Standard) | Included by default |
| [Quantum chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview) | [**Microsoft.Quantum.Chemistry**](https://www.nuget.org/packages/Microsoft.Quantum.Chemistry) | |
| [Quantum machine learning library](xref:microsoft.quantum.libraries.overview.machine-learning.intro) | [**Microsoft.Quantum.MachineLearning**](https://www.nuget.org/packages/Microsoft.Quantum.MachineLearning) | |
| [Quantum numerics library](xref:microsoft.quantum.libraries-numerics.usage) | [**Microsoft.Quantum.Numerics**](https://www.nuget.org/packages/Microsoft.Quantum.Numerics) | |

## Standard Libraries

The [`Microsoft.Quantum.Sdk` NuGet package](https://www.nuget.org/packages/Microsoft.Quantum.Sdk/) installed during [installation and validation](xref:microsoft.quantum.install-qdk.overview) automatically provides the Q# standard library. The standard libraries provide a set of essential and very useful functions and operations that can be used when writing quantum programs in Q#.

The functionality of the standard libraries includes classical mathematics, type conversions between various Q# data types, diagnostic of mistakes and errors in quantum programs, quantum error correction, characterization of the effects of operations in order to develop useful quantum algorithms, and many more features. 

For more information, see [Standard Libraries](xref:microsoft.quantum.libraries.overview.standard.intro).

## Quantum Chemistry Library

Simulation of physical systems has long played a central role in quantum computing. This is because quantum dynamics are widely believed to be intractable to simulate on classical computers, meaning that the complexity of simulating the system scales exponentially with the size of the quantum system in question. Simulating problems in chemistry and material science remains perhaps the most evocative application of quantum computing and would allow us to probe chemical reaction mechanisms that hitherto were beyond our ability to measure or simulate. It would also allow us to simulate correlated electronic materials such as high-temperature superconductors. The list of applications in this space is vast.

The documentation of the quantum chemistry library for the Quantum Development Kit provides an introduction and several examples to simulating electronic structure problems on quantum computers in order to help the reader understand the role that many aspects of the Hamiltonian simulation library play within the space. For more information, see [Quantum Chemistry Library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview).

The quantum chemistry library for the Quantum Development Kit is designed to work well with computational chemistry packages, most notably the [**NWChem**](http://www.nwchem-sw.org/) computational chemistry platform developed by the Environmental Molecular Sciences Laboratory (EMSL) at Pacific Northwest National Laboratory.
For more information, see [Installation of quantum chemistry library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.installation).

## Quantum Machine Learning Library

The Quantum Machine Learning Library is an API, written in Q#, that gives you the ability to run hybrid quantum/classical machine learning experiments. The library gives you the ability to:

- Load your own data to classify with quantum simulators
- Use samples and tutorials to get introduced to the field of quantum machine learning

You can expect low performance compared to current classical machine learning frameworks (remember that everything is running on top of the simulation of a quantum device that is already computationally expensive). The model implemented in this library is based on the quantum-classical training scheme presented in [Circuit-centric quantum classifiers](https://arxiv.org/abs/1804.00633).

The quantum machine learning library documentation provides an implementation of the sequential classifiers that take advantage of quantum computing to understand data. In this documentation you will find:

- An [introduction to quantum machine learning concepts](xref:microsoft.quantum.libraries.overview.machine-learning.intro), and specifically their realization in quantum circuit centric classifiers (also known as quantum sequential classifiers).
- A [basic classification with QDK](xref:microsoft.quantum.libraries.overview.machine-learning.basics), to run quantum sequential classifier written in Q# using the Quantum Machine Learning library of the QDK. To do that, you will train a simple sequential model using a classifier structure defined in Q#.
- How to [design your own classifier with Q#](xref:microsoft.quantum.libraries.overview.machine-learning.design), learning the basic concepts behind the design of circuit models for the quantum circuit centric classifier.
- How to [load your own data sets](xref:microsoft.quantum.libraries.overview.machine-learning.load) to train a classifier model with the Quantum Development Kit (QDK).
- Finally, a [quantum machine learning glossary](xref:microsoft.quantum.libraries.overview.machine-learning.training), with the main concepts and ingredients of the training process.

## Quantum Numerics Library

Many quantum algorithms rely on [oracles](xref:microsoft.quantum.concepts.oracles) that evaluate mathematical functions on a superposition of inputs.
The main component of Shor's algorithm, for example, evaluates $f(x) = a^x\operatorname{mod} N$ for a fixed $a$, the number to factor $N$, and $x$ a $2n$-qubit integer in a uniform superposition over all $2n$-bit strings.

To run Shor's algorithm on an actual quantum computer, this function has to be written in terms of the native operations of the target machine.
Using the binary representation of $x$ with $x_i$ denoting the $i$-th bit counting from the least-significant bit, $f(x)$ can be written as $f(x) = a^{\sum_{i=0}^{2n-1} x_i 2^i} \operatorname{mod} N$.

In turn, this can be written as a product (mod N) of terms $a^{2^i x_i}=(a^{2^i})^{x_i}$. The function $f(x)$ can thus be implemented using a sequence of $2n$ (modular) multiplications by $a^{2^i}$ conditional on $x_i$ being nonzero. The constants $a^{2^i}$ can be precomputed and reduced modulo N before running the algorithm.

This sequence of controlled modular multiplications can be simplified further: Each multiplication can be performed using a sequence of $n$ controlled modular additions; and each modular addition can be built from a regular addition and a comparator.

Given that so many steps are necessary to arrive at an actual implementation, it would be extremely helpful to have such functionality available from the start.
This is why the Quantum Development Kit provides support for a wide range of numerics functionality.

Besides the integer arithmetic mentioned thus far, the [numerics library](xref:microsoft.quantum.libraries-numerics.usage) provides:

- (Un)signed integer functionality (multiply, square, division with remainder, inversion, ...) with one or two quantum integer numbers as input.
- Fixed-point functionality (add / subtract, multiply, square, 1/x, polynomial evaluation) with one or two quantum fixed-point numbers as input.

## Installation

Once you have installed the Quantum Development Kit for use with your preferred environment and host language, you can easily add libraries to individual Q# projects without any further installation.

> [!NOTE]
> Some Q# libraries may work well with additional tools that work alongside your Q# programs, or that integrate with your host applications.
> For example, the [chemistry library installation instructions](xref:microsoft.quantum.libraries.overview-chemistry.concepts.installation) describe how to use the [**Microsoft.Quantum.Chemistry** package](https://www.nuget.org/packages/Microsoft.Quantum.Chemistry) together with the NWChem computational chemistry platform, and how to install the `qdk-chem` command-line tools for working with quantum chemistry data.

## [Q# applications or .NET interopability](#tab/tabid-csproj)

**Command prompt or Visual Studio Code:** Using the command prompt on its own or from within Visual Studio Code, you can use the `dotnet` command to add a NuGet package reference to your project.
For example, to add the [**Microsoft.Quantum.Numerics**](https://www.nuget.org/packages/Microsoft.Quantum.Numerics) package, run the following command:

```dotnetcli
dotnet add package Microsoft.Quantum.Numerics
```

**Visual Studio:** If you are using Visual Studio 2022 or later, you can add additional Q# packages using the NuGet Package Manager.
To load a package: 
1. With a project open in Visual Studio, select **Manage NuGet Packages...** from the **Project** menu.

2. Click **Browse**, select **Include prerelease** and search for the package name "Microsoft.Quantum.Numerics". 
This will list the packages available for download.

3. Hover over **Microsoft.Quantum.Numerics** and click the downward-pointing arrow to the right of the version number to install the numerics package.

For more details, see the [Package Manager UI guide](/nuget/tools/package-manager-ui).

Alternatively, you can use the Package Manager Console to add the numerics library to your project via the command line interface.

![Use the Package Manager Console from the command prompt](~/media/vs2017-nuget-console-menu.png)

From the Package Manager Console, run the following:

```
Install-Package Microsoft.Quantum.Numerics
```

For more details, see the [Package Manager Console guide](/nuget/tools/package-manager-console).

## [IQ# Notebooks](#tab/tabid-notebook)

You can make additional packages available for use in an IQ# Notebook by using the [`%package` magic command](xref:microsoft.quantum.iqsharp.magic-ref.package).
For example, to add the [**Microsoft.Quantum.Numerics**](https://www.nuget.org/packages/Microsoft.Quantum.Numerics) package for use in an IQ# Notebook, run the following command in a notebook cell:

```
%package Microsoft.Quantum.Numerics
```

Following this command, the package is available to any cells within the notebook.
To make the package available from Q# code in the current workspace, reload the workspace after adding your package:

```
%workspace reload
```

## [Python interoperability](#tab/tabid-python)


You can make additional packages available for use in a Python host program by using the [`qsharp.packages.add`](/python/qsharp-core/qsharp.packages.packages) method.
For example, to add the [**Microsoft.Quantum.Numerics**](https://www.nuget.org/packages/Microsoft.Quantum.Numerics) package for use in an IQ# Notebook, run the following Python code:

```python
import qsharp
qsharp.packages.add("Microsoft.Quantum.Numerics")
```

Following this command, the package will be made available to any Q# code compiled using `qsharp.compile`.
To make the package available from Q# code in the current workspace, reload the workspace after adding your package:

```python
qsharp.reload()
```

***


## Next Steps

Sources of the libraries as well as code samples can be obtained from GitHub. See [Licensing](xref:microsoft.quantum.libraries.overview.licensing) for further information. Note that package references ("binaries") are available also for the libraries and offer another way of including the libraries in projects.

- [Ways to run a Q# program](xref:microsoft.quantum.user-guide-qdk.overview.host-programs)
- [Testing and debugging quantum programs](xref:microsoft.quantum.user-guide-qdk.overview.testingdebugging)
- [Standard Libraries](xref:microsoft.quantum.libraries.overview.standard.intro)
- [Quantum Chemistry Library](xref:microsoft.quantum.libraries.overview-chemistry.concepts.overview)
- [Quantum Machine Learning Library](xref:microsoft.quantum.libraries.overview.machine-learning.intro)
- [Quantum Numerics Library](xref:microsoft.quantum.libraries-numerics.usage)
- [Quantum Simulators](xref:microsoft.quantum.machines.overview)
