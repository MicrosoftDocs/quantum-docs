---
author: azure-quantum-content
description: Learn how to use the resource estimator to estimate the resources needed for a future scaled quantum computer to break a particular encryption algorithm.
ms.date: 09/10/2024
ms.author: quantumdocwriters
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: how-to
no-loc: ['Q#', '$$v', target, targets]
title: Use the Microsoft Quantum resource estimator to analyzing cryptography
uid: microsoft.quantum.resource-estimator-cryptography

#customer intent: As a quantum developer, I want to use the resource estimator to estimate the resources needed for a future scaled quantum computer to break a particular encryption algorithm, so that I can analyze the impact of quantum computing on the security of some classical encryption methods and prepare for a quantum-safe future.
---

# Analyze cryptographic protocols with the resource estimator

The [Microsoft Quantum resource estimator](xref:microsoft.quantum.overview.intro-resource-estimator) is available on the [Microsoft Quantum website](https://quantum.microsoft.com/tools/quantum-cryptography) to estimate the resources needed for a future scaled quantum computer to break a particular encryption algorithm. This tool helps you to analyze the impact of quantum computing on the security of some classical encryption methods, and prepare for a quantum-safe future.

> [!NOTE]
> To access the resource estimator on the [Microsoft Quantum website](https://quantum.microsoft.com/tools/quantum-cryptography) you only need a Microsoft account.

The resource estimator for quantum-safe planning takes a set of four target parameters as input:

- **Classical encryption algorithm,** which are Rivest-Shamir-Adleman (RSA), Elliptic Curve Cryptography (ECC), and Advanced Encryption Standard (AES).
- **Key strength,** which are standard, enhanced, and highest.
- **Qubit type,** which are topological and superconducting.
- **Qubit error rate,** which are reasonable and optimistic.

## Use the resource estimator for quantum-safe planning

To use the resource estimator for quantum-safe planning, go to the [Microsoft Quantum website](https://quantum.microsoft.com/tools/quantum-cryptography).

1. Click on the **arrows** to switch between different selections of preset input parameters. See that the fields are populated for you.
1. Click **Ask Copilot**  if you want to know more about the resource estimation data.
1. Click **Download** to download the plot of the resource estimation job.
1. You can also **customize the parameters** of the encryption algorithm. You need to select *at least* one option for each input parameter. You can select multiple combinations of parameters and compare their security against quantum computers.
1. The results are displayed in a **plot** that shows the number of qubits and the runtime that a quantum computer with the selected architecture would need to break the encryption algorithm. **Hover over** the points of the plot to see more information about the resource estimates.
1. At any point, you can **ask Copilot a question** about cryptography, resource estimation, or quantum computing.

    :::image type="content" source="media/quantum-cryptography-qcom.png" alt-text="Screenshot of the quantum cryptography experience in the Microsoft Quantum website. The picture displays the input parameters that constitute the encryption algorithm and the resulting plot of the resource estimation job.":::

## Next steps

- [Understand the results of the resource estimator](xref:microsoft.quantum.overview.resources-estimator-output.data)
- [Different ways to run the resource estimator](xref:microsoft.quantum.submit-resource-estimation-jobs)
- [Customize resource estimates to machine characteristics](xref:microsoft.quantum.overview.resources-estimator)
- [Tutorial: Estimate the resources of a quantum chemistry problem](xref:microsoft.quantum.tutorial.resource-estimator.chemistry)
