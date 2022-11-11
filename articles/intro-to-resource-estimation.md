---
author: SoniaLopezBravo
description: Introduction to the Azure Quantum Resource Estimator
ms.author: sonialopez
ms.date: 11/09/2022
ms.service: azure-quantum
ms.subservice: computing
ms.topic: overview
no-loc: ['Python', '$$v']
title: An introduction to resource estimation
uid: microsoft.quantum.overview.intro-resource-estimator
--- 

# An introduction to resource estimation

The Azure Quantum Resource Estimator is an Azure Quantum target that calculates resources required for a quantum algorithm. For example, you can see the total number of physical qubits, wall clock time, the computational resources required, and the details of the formulas and values used for each estimate. These insights enable you to focus on algorithm development, with the goal of optimizing performance and decreasing cost.

You can also compare resource estimates for quantum algorithms across different hardware profiles. Start from well-known pre-defined qubit parameter settings and Quantum Error Correction (QEC) schemes or configure unique settings across a wide range of machine characteristics such as operation error rates, operation speeds, and error correction schemes and thresholds.  

:::image type="content" source="media/Resource-Estimation-component-overview.png" alt-text="Diagram showing components provided by Resource Estimator and corresponding customizations. Provided aspects are Application Input, Compilation Tools, QIR, QEC models, Qubit models, and Analysis. Customer can bring Application Program, Compilation or Optimization Tools, QIR Code, QEC models, Qubit parameters, and Analysis and Visualization Tools":::

The Azure Quantum Resource Estimator is built on community supported [Quantum Intermediate Representation (QIR)](xref:microsoft.quantum.concepts.qir), so it's extensible and portable. Because it takes a QIR program as input, it supports any language that translates to QIR. For example, you can use the Azure Quantum Resource Estimator with popular quantum SDKs and languages such as Q# and Qiskit.

The Azure Quantum Resource Estimator is **free of charge** and requires an Azure account.

To get started, see [Run your first resource estimate](xref:microsoft.quantum.quickstarts.computing.resources-estimator).
