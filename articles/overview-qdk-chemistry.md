---
title: Overview of QDK for Chemistry
description: Explore QDK/Chemistry tools for molecular electronic structure, quantum state preparation, simulation, and resource estimation.
author: azure-quantum-content
ms.author: quantumdocwriters
ms.date: 11/03/2026
ms.topic: overview
ms.service: azure-quantum
ms.subservice: core
no-loc: ["Microsoft", "Microsoft Quantum Development Kit", "QDK", "QDK/Chemistry", "Python", "C++", "Jupyter Notebook", "Visual Studio Code", "VS Code", "GitHub Copilot", "QDK Learning", "Azure Quantum", "SCF", "SOSSA", "Ising", "Heisenberg", "Hubbard", "API"]
ai-usage: ai-assisted
uid: microsoft.quantum.overview.qdk-chemistry
# Customer intent: As a quantum chemistry researcher, I want to understand how QDK/Chemistry can support my research and where to start.
---

# Welcome to QDK for chemistry

> [!div class="nextstepaction"]
> [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry)

QDK for chemistry (QDK/Chemistry) is an open-source toolkit in the Microsoft Quantum Development Kit (QDK). Use it to model molecules and materials, build quantum circuits, and evaluate quantum algorithms for chemistry and materials research.

QDK/Chemistry connects the stages of a quantum chemistry workflow, from classical data preparation to circuit execution and analysis. Its modular design lets you choose methods for each stage and combine them in a single workflow. You can use native methods or integrate external packages through plugins.

The following diagram shows how QDK/Chemistry maps a chemistry problem to a quantum computer.

:::image type="content" source="media/qdk-libraries-infographic.png" alt-text="Diagram that shows how QDK libraries map quantum chemistry problems to a quantum computer.":::

## Why use QDK for chemistry?

### Compose and reuse workflows

Choose methods for each stage of your workflow. For example, compare self-consistent field (SCF) solvers, select dense or sparse state preparation, and choose standard or iterative quantum phase estimation. You can compare energy estimates and resource requirements, reuse intermediate data, and adapt the workflow to a different molecule or model.

### Use resource-efficient algorithms

QDK/Chemistry combines classical processing with resource-efficient quantum algorithms. Classical processing steps, such as active space selection and Hamiltonian factorization, reduce the size of a molecular model and provide a compact Hamiltonian representation. Quantum algorithms, such as sparse-isometry state preparation and sum-of-squares spectral amplification (SOSSA) block encoding, reduce the quantum operations needed to prepare wavefunctions and simulate Hamiltonians.

### Work with familiar tools

Build Python workflows in Jupyter Notebook, and use Visual Studio Code (VS Code) for quantum development. Plugins connect QDK/Chemistry to external chemistry and quantum tools. The toolkit also provides chemistry tools and guidance for AI-assisted workflows with GitHub Copilot.

## QDK/Chemistry core features and technologies

| Task                                  | What QDK/Chemistry provides                                                                             |
|---------------------------------------|---------------------------------------------------------------------------------------------------------|
| Compose workflows                     | Interchangeable methods, shared data structures, and plugins for external packages.                     |
| Prepare inputs with classical methods | SCF calculations, active space selection, and Hamiltonian factorization.                                |
| Build quantum algorithms              | Sparse-isometry state preparation, SOSSA block encoding, and standard and iterative phase estimation.   |
| Model molecules and materials         | Molecular Hamiltonians alongside spin and fermionic lattice models.                                     |
| Evaluate and run quantum circuits     | Integration with the QDK resource estimator, supported simulators, and Azure Quantum hardware backends. |

To learn more about the electronic structure and state preparation steps, see [Construct molecular orbitals with SCF calculations in QDK Chemistry](xref:microsoft.quantum.overview.qdk-chem-scf-active-space) and [Use sparse isometry to efficiently generate simplified state preparation circuits for quantum chemistry calculations](xref:microsoft.quantum.overview.qdk-chem-sparse-isometry).

To learn how to evaluate quantum programs, see [Overview of quantum simulators in the QDK](xref:microsoft.quantum.overview.qdk-simulators) and [Introduction to the resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator).

## QDK/Chemistry resources

- [How to install QDK for chemistry](xref:microsoft.quantum.how-to.install-qdk-chemistry): Set up the Python library in your environment.
- [Quickstart](https://microsoft.github.io/qdk-chemistry/user/quickstart.html): Complete a workflow from molecular structure to an energy estimate.
- [Learn quantum chemistry with QDK Learning](xref:microsoft.quantum.how-to.qdk-learning-ground-state-energy): Work through the ground state molecular energy course with Python notebooks and quantum phase estimation.
- [SOSSA resource estimation example](https://github.com/microsoft/qdk-chemistry/blob/v2.3.0/examples/sossa_qre.ipynb): Explore simulation and resource estimation for a spectral amplification workflow.
- [Working with AI Assistants](https://microsoft.github.io/qdk-chemistry/user/agents.html): Use chemistry tools and guidance with GitHub Copilot.

For detailed class and method documentation, see the [Python API](https://microsoft.github.io/qdk-chemistry/api/python_api.html) and [C++ API](https://microsoft.github.io/qdk-chemistry/api/cpp_api.html) references.
