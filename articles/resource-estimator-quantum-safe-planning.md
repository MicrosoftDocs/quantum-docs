---
author: azure-quantum-content
description: Learn how to use the resource estimator to estimate the resources needed for future scaled quantum computers to break different encryption algorithms.
ms.date: 03/31/2026
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Use the Microsoft Quantum resource estimator to analyzing cryptography
uid: microsoft.quantum.resource-estimator-cryptography

#customer intent: As a quantum developer, I want to use the resource estimator to estimate the resources needed for a future scaled quantum computer to break different encryption algorithms, so that I can analyze the impact of quantum computing on the security of classical encryption methods and prepare for a quantum-safe future.
---

# Analyze cryptographic protocols with the resource estimator

The [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator) is available on the [Microsoft Quantum website](https://quantum.microsoft.com/tools/quantum-cryptography) to estimate the resources needed for different quantum hardware technologies to break encryption algorithms. This tool helps you to analyze the impact of quantum computing on the security of some classical encryption methods, and prepare for a quantum-safe future.

> [!NOTE]
> To access the resource estimator on the [Microsoft Quantum website](https://quantum.microsoft.com/tools/quantum-cryptography), you need a Microsoft account.

The resource estimator for quantum-safe planning takes a set of four target parameters as input. The following table shows the allowed values for each input parameter:

| Input parameter                | Values                             |
|--------------------------------|------------------------------------|
| Classical encryption algorithm | Rivest–Shamir–Adleman (RSA)        |
| Classical encryption algorithm | Elliptic Curve Cryptography (ECC)  |
| Classical encryption algorithm | Advanced Encryption Standard (AES) |
| Key strength                   | Standard                           |
| Key strength                   | Enhanced                           |
| Key strength                   | Highest                            |
| Qubit type                     | Topological                        |
| Qubit type                     | Superconducting                    |
| Qubit error rate               | Reasonable                         |
| Qubit error rate               | Optimistic                         |

## Use the resource estimator for quantum-safe planning

To use the resource estimator for quantum-safe planning, go to the [Microsoft Quantum website](https://quantum.microsoft.com/tools/quantum-cryptography).

1. Select the **arrows** to switch between different selections of preset input parameters.
1. Select **Download** to download the plot of the resource estimation results.
1. To customize the resource estimation parameters, choose at least one option for each input parameter type. You can choose multiple combinations of parameters to compare results for different sets of qubit technologies and encryption algorithms.
1. The results are displayed in a plot that shows the number of qubits and the run time required to break the encryption algorithms. Hover over the points on the plot to view information about the resource estimates.

## Next steps

- [Understand the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
