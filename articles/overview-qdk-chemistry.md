---
author: azure-quantum-content
description: This article gives an overview of the features and benefits that QDK/Chemistry offers to quantum chemistry researchers.
ms.date: 01/23/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: core
ms.topic: overview
no-loc: [Azure, Microsoft, Azure Quantum, Microsoft Quantum, Microsoft Quantum Development Kit, QDK, "QDK/Chemistry", Jupyter, MOs, Python, Pip, Visual Studio Code, VS Code, para-benzyne, "Jupyter Notebook", GitHub, API]
title: Simulate jobs on neutral atom quantum computers in the QDK
uid: microsoft.quantum.overview.qdk-chemistry
#customer intent: As a quantum chemistry researcher, I want know what QDK for chemistry offers me for my research
---

# Welcome to QDK for chemistry 

> [!div class="nextstepaction"]
> [Get started here](xref:microsoft.quantum.how-to.install-qdk-chemistry)

QDK for chemistry (QDK/Chemistry) is an open-source Python package within the Microsoft Quantum Development Kit (QDK). It provides a set of tools and libraries to enable cutting-edge quantum chemistry workflows on quantum computers by bridging the gap between classical electronic structure calculations and quantum circuit execution.  

Quantum applications pipelines depend on robust, efficient classical data preparation and post-processing. QDK/Chemistry addresses these needs through a modular architecture that separates data representations from computational methods. This modularity allows researchers to compose flexible workflows from interchangeable components. The toolkit provides native implementations of key quantum-classical algorithms and integrates seamlessly with widely used open-source quantum chemistry packages and quantum computing frameworks via a plugin system. By offering a unified interface to diverse methods and tools, QDK/Chemistry serves as a platform for innovation and a foundation for reproducible, scalable quantum chemistry experiments.

## Why use QDK for chemistry?

### Integration / Familiarity

QDK/Chemistry is seamlessly integrated with first- and third-party quantum chemistry tools and quantum programming languages, enabling flexible use of preferred tools and environments. AI-assisted coding and debugging can be carried out in VS Code, while development with Python can be performed in Jupyter Notebook.

### Accessibility

QDK/Chemistry is accessible to quantum chemistry researchers of every level. For beginners, the toolkit offers tools and algorithms with robust default settings and parameters that you can use to get results for a large variety of molecular systems right out of the box. Advanced users can take advantage of the extensive capabilities and customizability of QDK/Chemistry tools to tackle more complex research questions.

### Modularity

QDK/Chemistry simplifies the development process with a modular toolset. Each part of the quantum chemistry workflow functions independently, so the same tools can be reused across different workflows and molecules.

### Implementation  

QDK/Chemistry offers a fast, intuitive, and seamless end-to-end solution for every stage of the quantum chemistry workflow. The toolset leverages state-of-the-art optimization techniques that maximizes performance, minimizes resource requirements, and scales to harness the power of next-generation quantum hardware.

### Documentation and samples

QDK/Chemistry comes with a suite of code samples to help get started with development. Samples include a variety of molecular systems, quantum programming languages, and tutorials that walk through end-to-end workflows from molecular structure to quantum algorithm execution. The documentation also includes a comprehensive API reference that explains how every tool and algorithm works, along with examples of how to use the tools.

## QDK/Chemistry core features and technologies

- Robust SCF calculations and reliable automatic active space selection(LINK TO DEEP DIVE)
- Efficient quantum circuit preparation with GF2+X sparse isometry (LINK TO DEEP DIVE)
- Seamless integration with native QDK high-performance simulators and resource estimator
- VS code and Python extensions for QDK/Chemistry, powered by AI-assisted coding capabilities to help you write and understand quantum workloads

## QDK/Chemistry resources

To get started with QDK/Chemistry, see [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry).

For an end-to-end example of a quantum chemistry state preparation circuit workflow, see the [Quickstart guide](https:/microsoft.github.io/qdk-chemistry/user/quickstart.html) in the QDK/Chemistry documentation on GitHub.

For detailed information on the available tools in QDK/Chemistry, see the [Python API](https:/microsoft.github.io/qdk-chemistry/api/python_api.html) and [C++ API](https:/microsoft.github.io/qdk-chemistry/api/cpp_api.html) references.
