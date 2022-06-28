---
title: Math in standard Q# libraries
description: Learn about classical math functions in Q# standard libraries that are used with built-in data types.
author: cgranade
ms.author: chgranad
ms.date: 06/27/2022
ms.service: azure-quantum
ms.subservice: qsharp-guide
no-loc: ['Q#', '$$v']
uid: microsoft.quantum.libraries.overview.math
ms.topic: conceptual
ms.custom: kr2b-contr-experiment
---

# Classical Mathematical Functions #

These functions primarily work with Q# built-in data types `Int`, `Double`, and `Range`.

As an example, <xref:Microsoft.Quantum.Random.DrawCategorical> has a signature of `(Double[] => Int)`. It takes a categorical distribution specified by a list of probablities. An array of doubles can be entered as an input, and then return a randomly-selected index into the array as an `Int`.

The probability of selecting a specific index is proportional to the value of the array element at that index. Array elements that are equal to zero are ignored and their indices are never returned. If any array element is less than zero, or if no array element is greater than zero, the operation fails.
