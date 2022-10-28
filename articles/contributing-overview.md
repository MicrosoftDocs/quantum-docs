---
author: bradben
description: Learn how to contribute to Azure Quantum, the Azure Quantum documentation, and the quantum development community.
ms.author: brbenefield
ms.date: 10/28/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: contributor-guide
no-loc: ['Q#', '$$v']
title: Contributing
uid: microsoft.quantum.contributing-qdk.overview
---

# Contributing to Azure Quantum

As part of the Azure Quantum service, the Azure Quantum documentation set and the Quantum Development Kit (QDK) are more than a collection of tools and resources for writing quantum programs.
They're part of a broad community of people discovering quantum computing, performing research in quantum algorithms, developing new applications for quantum devices, and otherwise working to make the most out of the quantum programming.

As a member of that community, Azure Quantum aims to offer quantum developers across a wide range of backgrounds with the features they need.
Your contributions to Azure Quantum help in realizing that goal by improving the tools used by other quantum developers, how those tools are documented, and even by creating new features and functionality that helps make the entire quantum programming community a better place to discover and create.

This article provides some advice on how to make your contribution as useful as possible to the broader quantum programming community.

## Building community

The first thing when making a contribution is to always keep in mind the community that you are contributing to.
By acting respectfully and professionally towards your peers in the quantum programming community and more broadly, you can help to make sure that your efforts build the best and most welcoming community possible.

As a part of that effort, all Azure Quantum projects have adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information, please see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## What kinds of contributions help the community?

There are lots of different ways to help the quantum programming community through your contributions.
This guide focuses on three ways that are especially relevant to Azure Quantum.
All of these ways are critical to building a quantum community that empowers people.
That said, this is definitely not an exhaustive list — you are encouraged to explore other ways to help the community build on the promise of quantum programming!

- **[Reporting bugs](xref:microsoft.quantum.contributing-qdk.overview.reporting)** - The first step in fixing bugs and other kinds of problems is to identify them. If you've found a bug in Azure Quantum, reporting it helps make a better set of tools for the quantum programming community.
- **[Improving documentation](xref:microsoft.quantum.contributing-qdk.overview.docs)** - Any documentation set can always be better, can cover more details, and be made more accessible.
- **[Contributing code](xref:microsoft.quantum.contributing-qdk.overview.code)** - Of course, one of the most direct ways to contribute is by adding new code to the Quantum Development Kit.

## Where do contributions go?

The Quantum Development Kit includes a number of different pieces that all work together to realize a platform for writing quantum programs.
Each of these different pieces finds its home in a different GitHub repository, so the one of the earlier things to sort out is where each contribution best belongs.

- [**microsoft/Quantum**](https://github.com/Microsoft/Quantum): Samples and tools to help get started with the Quantum Development Kit.
- [**microsoft/QuantumLibraries**](https://github.com/Microsoft/QuantumLibraries): Standard and domain-specific libraries for the Quantum Development Kit.
- [**microsoft/QuantumKatas**](https://github.com/Microsoft/QuantumKatas): Self-paced programming exercises for learning quantum computing and the Q# programming language.
- [**microsoft/qsharp-compiler**](https://github.com/microsoft/qsharp-compiler): The Q# compiler, Visual Studio extension, and Visual Studio Code extension.
- [**microsoft/qsharp-runtime**](https://github.com/microsoft/qsharp-runtime): Simulation framework, code generation, and simulation target machines for the Quantum Development Kit.
- [**microsoft/iqsharp**](https://github.com/microsoft/iqsharp): Jupyter kernel and Python host functionality for Q#, as well as Docker images for using IQ# in cloud environments.
- [**microsoft/qdk-python**](https://github.com/microsoft/qdk-python): Python packages `qdk` and `azure-quantum`.
- [**microsoft/qsharp-language**](https://github.com/microsoft/qsharp-language): This is where new Q# features are developed and specified, and where you can share ideas and suggestions about the future evolution of the Q# language and core libraries.
- [**MicrosoftDocs/quantum-docs**](https://github.com/MicrosoftDocs/quantum-docs): Source code for [Azure Quantum documentation](xref:microsoft.quantum.azure-quantum-overview).

> [!NOTE]
> Unfortunately, code and documentation contributions cannot be accepted on the [**microsoft/Quantum-NC**](https://github.com/microsoft/Quantum-NC) repository at this time, but  bug reports are still very much appreciated.

There are also a few other, more specialized repositories focusing on auxiliary functionality related to Azure Quantum.

- [**msr-quarc/qsharp.sty**](https://github.com/msr-quarc/qsharp.sty): LaTeX formatting support for Q# syntax.
- [**microsoft/quantum-viz.js**](https://github.com/microsoft/quantum-viz.js): A tool for rendering quantum circuits using pure HTML, used in Q# Jupyter Notebooks.

## Next steps

Thanks for being a part of the Azure Quantum community!
If you'd like to learn more about contributing, please continue with one of the following guides.

- [Learn how to report bugs](xref:microsoft.quantum.contributing-qdk.overview.reporting)
- [Learn how to contribute documentation](xref:microsoft.quantum.contributing-qdk.overview.docs)
- [Learn how to open pull requests](xref:microsoft.quantum.contributing-qdk.overview.pulls)
