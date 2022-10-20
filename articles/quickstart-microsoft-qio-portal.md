---
title: Quickstart - Solve an optimization problem with online notebooks
description: This document provides a step-by-step guide to get you started with optimization in the Azure Quantum portal
author: bradben
ms.author: brbenefield
ms.topic: quickstart
ms.date: 05/31/2022
ms.service: azure-quantum
ms.subservice: optimization
uid: microsoft.quantum.quickstarts.optimization.qio.portal
zone_pivot_groups: optimization-platforms
---

# Quickstart: Solve an optimization problem using an Azure Quantum notebook

Learn how to use Azure Quantum optimization solvers to solve a simple binary optimization problem. This procedure uses Notebooks in the Azure Quantum portal. 

::: zone pivot="platform-microsoft"

[!INCLUDE [ms-procedure](includes/quickstart-qio-include-ms-portal.md)]

::: zone-end

::: zone pivot="platform-1qbit"

[!INCLUDE [1qbit-procedure](includes/quickstart-qio-include-1qbit-portal.md)]

::: zone-end

::: zone pivot="platform-toshiba"

[!INCLUDE [toshiba-procedure](includes/quickstart-qio-include-toshiba-portal.md)]

::: zone-end

For more information about solver results, see [Interpreting solver results](xref:microsoft.quantum.optimization.understand-solver-results).

> [!NOTE]
> If you run into an error while working with Azure Quantum, you can check our [list of common issues](xref:microsoft.quantum.azure.common-issues). Also if your are using an optimization solver and you get an error in the form `<AZQxxx>`, you can check our [list of common user errors in optimization solvers](xref:microsoft.quantum.optimization.troubleshooting).

## Next steps

### Documentation

- [Solver overview](xref:microsoft.quantum.reference.qio-target-list)
- [Expressing problems & supplying terms](xref:microsoft.quantum.optimization.express-problem)
- [Interpreting solver results](xref:microsoft.quantum.optimization.understand-solver-results)
- [Job management](xref:microsoft.quantum.optimization.job-management)
- [Solve long-running problems (async problem submission)](xref:microsoft.quantum.optimization.solve-long-running-problems)
- [Reuse problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions)
- [Authenticating with a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal)
- [Solvers reference for Microsoft QIO solver](xref:microsoft.quantum.optimization.providers.microsoft.qio)
- [Solvers reference for 1QBit solver](xref:microsoft.quantum.providers.optimization.1qbit)

### Samples and end-to-end learning

- [QIO samples repo](https://github.com/microsoft/qio-samples/)
- Getting started
  - [1QBit](https://github.com/microsoft/qio-samples/tree/main/samples/getting-started/1qbit)
  - [Microsoft QIO](https://github.com/microsoft/qio-samples/tree/main/samples/getting-started/microsoft-qio/)
- Ship loading sample problem
  - [End-to-end Learn module](/training/modules/solve-quantum-inspired-optimization-problems/)
  - [Sample code](https://github.com/microsoft/qio-samples/tree/main/samples/ship-loading/)
- Job shop scheduling sample problem
  - [End-to-end Learn module](/training/modules/solve-job-shop-optimization-azure-quantum/)
  - [Sample code](https://github.com/microsoft/qio-samples/tree/main/samples/job-shop-scheduling/)
