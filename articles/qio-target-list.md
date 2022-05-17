---
author: SoniaLopezBravo
description: This document provides a list of the available optimization providers on Azure Quantum.
ms.author: sonialopez
ms.date: 04/26/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: List of optimization targets on Azure Quantum
uid: microsoft.quantum.reference.qio-target-list
---

# Optimization providers on Azure Quantum

Azure Quantum offers various optimization targets to solve binary optimization problems on classical CPUs, GPUs, hardware annealers, or hardware accelerated on field-programmable gate arrays (FPGA). There is no one algorithm that fits every [optimization problem](xref:microsoft.quantum.optimization.concepts.overview.introduction). Having a full portfolio is important when tuning optimization solutions for the best outcome and the highest impact.

> [!NOTE]
> Optimization targets can't run Q# applications or any other type of quantum computing program. Optimization solvers are optimization algorithms that run on specialized classical hardware.

| Provider | Description |
|---|---|
|<img src="~/media/logo-1qbit2.png" alt="logo of 1qbit" title="logo of 1qbit" width="200" height="200"/>|1QBit connects intractable industry problems to novel quantum-inspired optimization solutions that utilize the most advanced hardware. For more information, see the [1QBit provider](xref:microsoft.quantum.providers.optimization.1qbit) reference page.|
|<img src="~/media/logo-toshiba.png" alt="logo of Toshiba" title="logo of Toshiba" width="200" height="200"/>| Toshiba’s Simulated Bifurcation Machine (SBM) is a practical and ready-to-use Ising model machine, a software solution to solve large-scale combinatorial optimization problems at high speed. For more information, see the [Toshiba SQBM+ provider](xref:microsoft.quantum.providers.optimization.toshiba) reference page. |
|<img src="~/media/logo-microsoft2.png" alt="logo of Microsoft" title="logo of Microsoft" width="200" height="200"/>| Microsoft QIO offers ground-breaking optimization algorithms inspired by decades of quantum research. For more information, see the [Microsoft QIO provider](xref:microsoft.quantum.optimization.providers.microsoft.qio) overview page. |

Azure Quantum offers a broad range of solvers for optimization problems. However, it is not possible to determine which solver will perform best for a new optimization problem. You can explore the specifications of each target to develop your strategy, and in [Which optimization solver should I use](xref:microsoft.quantum.optimization.choose-solver) article you can find some guidelines to find a suitable solver by benchmarking.
