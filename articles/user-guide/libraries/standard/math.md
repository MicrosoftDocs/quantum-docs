---
author: cgranade
description: Learn about the classical math functions in the Q# standard libraries that are used with the built-in data types.
ms.author: chgranad
ms.date: 08/29/2021
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v']
title: Math in the Q# standard libraries
uid: microsoft.quantum.libraries.overview.math
---

# Classical Mathematical Functions #

These functions are primarily used to work with the Q# built-in data types `Int`, `Double`, and `Range`.

For example, the <xref:Microsoft.Quantum.Random.DrawCategorical> has signature `(Double[] => Int)`. It takes a categorical distribution specified by a list of probablities, such as an array of doubles as input, and returns a randomly-selected index into the array as an `Int`.

The probability of selecting a specific index is proportional to the value of the array element at that index. Array elements that are equal to zero are ignored and their indices are never returned. If any array element is less than zero, or if no array element is greater than zero, then the operation fails.
