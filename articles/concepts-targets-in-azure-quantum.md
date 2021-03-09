---
author: KittyYeungQ
description: Article describing the different types of targets existing in Azure Quantum
ms.author: kitty
ms.date: 02/01/2021
ms.service: azure-quantum
ms.subservice: core
ms.topic: conceptual
title: Targets in Azure Quantum
uid: microsoft.quantum.concepts.targets
---

# Targets in Azure Quantum

This article introduces the different type of targets available in Azure Quantum and the Quantum Development Kit (QDK). Targets in Azure Quantum can be solvers for optimization problems or quantum devices (either physical or simulated) that you can use to run Q# quantum applications.

Currently, Azure Quantum includes the following types of targets:

## Optimization solvers

Azure Quantum offers optimization targets to solve binary optimization problems on classical CPUs, or hardware accelerated on field-programmable gate arrays (FPGA), GPUs or hardware annealers.

For more information on optimization, see [Optimization solvers](xref:microsoft.quantum.optimization.install-sdk).

## Quantum devices

Azure Quantum also offers a variety of quantum solutions, such as
different hardware devices and quantum simulators. At this time, because of the early development stage of the field, these devices have some limitations and requirements for programs that run on them. The Quantum Development Kit and Azure Quantum will keep track of these requirements in the background so that you can run Q# programs on Azure Quantum targets.

### Quantum Processing Units (QPU): different profiles

A quantum processing unit (QPU) is a physical or simulated processor that
contains a number of interconnected qubits that can be manipulated to compute
quantum algorithms. It's the central component of a quantum computer.

Quantum devices are still an emerging technology, and not all of them can run all Q# code. As such, you need to keep some restrictions in mind when developing programs for different targets. Currently, Azure Quantum and the QDK manage three different profiles for QPUs:

- **Full:** This profile can run any Q# program within the
  limits of memory for simulated quantum processing units (QPU) or the number of qubits of the physical
  quantum hardware.
- **No Control Flow:** This profile can run any Q# program that doesn't
  require the use of the results from qubit measurements to control the
  program flow. Within a Q# program targeted for this kind of QPU, values of
  type `Result` do not support equality comparison.
- **Basic Measurement Feedback:** This profile has limited ability to use the
  results from qubit measurements to control the program flow. Within a Q# program
  targeted for this kind of QPU, you can only compare values of type `Result` as
  part of conditions within `if` statements in operations. The corresponding
  conditional blocks may not contain `return` or `set` statements.

## Next steps

You can find a complete list of the Azure Quantum targets in the article [List of targets of Azure Quantum](xref:microsoft.quantum.reference.target-list).
