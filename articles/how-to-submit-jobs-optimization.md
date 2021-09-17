---
author: SoniaLopezBravo
description: This document provides a basic guide to submit and run optimization jobs Azure Quantum using Python SDK and Jupyter Notebooks. 
ms.author: v-sonialopez
ms.date: 09/17/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: how-to
title: Submit optimization jobs to Azure Quantum
uid: microsoft.quantum.submit-jobs-optimization
zone_pivot_groups: azurequantum-ide
---

# Submit optimization jobs to Azure Quantum

In this article you will find the steps for how to submit optimization jobs to Azure Quantum using Python SDK or Jupyter Notebooks.

As an example, this article follows a sample shipping company that has a difficult business problem: Balancing the loads of container ships at port. If you are interested in the problem details, see the [shipping-loading sample](https://github.com/microsoft/qio-samples/tree/main/samples/ship-loading) .

::: zone pivot="ide-python"

[!INCLUDE [python-procedure](includes/how-to-submit-qio-include-python.md)]

::: zone-end

::: zone pivot="ide-jupyter"

[!INCLUDE [jupyter-procedure](includes/how-to-submit-qio-include-jupyter.md)]

::: zone-end

## Next steps

Now that you know how to submit jobs to Azure quantum, you can try to run the
different available [samples](https://github.com/microsoft/qio-samples/tree/main/samples) or try to submit your own projects.

You can also check the following articles:
- [Solver overview](xref:microsoft.quantum.reference.qio-target-list)
- [Expressing problems & supplying terms](xref:microsoft.quantum.optimization.express-problem)
- [Interpreting solver results](xref:microsoft.quantum.optimization.understand-solver-results)
- [Job management](xref:microsoft.quantum.optimization.job-management)
- [Solve long-running problems (async problem submission)](xref:microsoft.quantum.optimization.solve-long-running-problems)
- [Reuse problem definitions](xref:microsoft.quantum.optimization.reuse-problem-definitions)
- [Authenticating with a service principal](xref:microsoft.quantum.optimization.authenticate-service-principal)
- [Solvers reference for Microsoft QIO solver](xref:microsoft.quantum.optimization.providers.microsoft.qio)
- [Solvers reference for 1QBit solver](xref:microsoft.quantum.providers.optimization.1qbit)
