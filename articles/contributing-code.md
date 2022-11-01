---
author: bradben
description: Learn how to contribute sample and library code to the Azure Quantum documentation.
ms.author: brbenefield
ms.date: 10/25/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: contributor-guide
ms.custom: kr2b-contr-experiment
no-loc: ['Q#', '$$v']
title: Contribute code
uid: microsoft.quantum.contributing-qdk.overview.code
---

# Contribute code to Azure Quantum

In addition to reporting issues and improving documentation, contributing code to Azure Quantum can be a very direct way to help your peers in the quantum programming community.
By contributing code, you can help to fix issues, provide new examples, make existing libraries easier to use, or even add entirely new features.

This guide details some of what is reviewed when you submit a pull request.

## What is reviewed

An ideal code contribution builds on the existing work in an Azure Quantum repository to fix issues, expand existing features, or to add new features that are within the scope of a repository.
When a code contribution is accepted, it becomes a part of Azure Quantum itself, such that new features will be released, maintained, and developed in the same way as the rest of the kit.
Thus, it is helpful when functionality added by a contribution is well-tested and is documented.

### Unit tests

The Q# functions, operations, and user-defined types that make up libraries such as the canon are automatically tested as a part of development on the [**Microsoft/QuantumLibraries**](https://github.com/Microsoft/QuantumLibraries/) repository.
When a new pull request is opened, for instance, an [Azure Pipelines](https://azure.microsoft.com/services/devops/pipelines/) configuration checks that the changes in the pull request do not break any existing functionality that the quantum programming community depends on.

With the latest Q# version, unit tests are defined using the `@Test("QuantumSimulator")` attribute. The argument may be either "QuantumSimulator", "ToffoliSimulator", "TraceSimulator", or any fully qualified name specifying the run target. Several attributes defining different run targets may be attached to the same callable. 
Some of the tests still use the deprecated [Microsoft.Quantum.Xunit](https://www.nuget.org/packages/Microsoft.Quantum.Xunit/) package that exposes all Q# functions and operations ending in `Test` to the [xUnit](https://xunit.net/) framework. This package is no longer needed for defining unit tests. 

The following function is used to ensure that the <xref:Microsoft.Quantum.Canon.Fst> and <xref:Microsoft.Quantum.Canon.Snd> functions both return the right outputs in a representative example.
If the output of `Fst` or `Snd` is incorrect, the `fail` statement is used to cause the test to fail.

```qsharp
@Test("QuantumSimulator")
function PairTest () : Unit {
    let pair = (12, PauliZ);

    if (Fst(pair) != 12) {
        let actual = Fst(pair);
        fail $"Expected 12, actual {actual}.";
    }

    if (Snd(pair) != PauliZ) {
        let actual = Snd(pair);
        fail $"Expected PauliZ, actual {actual}.";
    }
}
```

More complicated conditions can be checked using the techniques in the [testing section](xref:microsoft.quantum.libraries.overview.diagnostics) of the standard libraries guide.
For instance, the following test checks that `H(q); X(q); H(q);` as called by <xref:Microsoft.Quantum.Canon.ApplyWith> does the same thing as `Z(q)`.

```Q#
@Test("QuantumSimulator")
operation TestApplyWith() : Unit {
    let actual = ApplyWith(H, X, _);
    let expected = Z;
    AssertOperationsEqualReferenced(ApplyToEach(actual, _), ApplyToEachA(expected, _), 4);
}
```

When adding new features, it's a good idea to also add new tests to make sure that your contribution does what it's supposed to.
This helps the rest of the community to maintain and develop your feature, and in particular helps other developers know that they can rely on your feature.

> [!NOTE]
> This works the other way around, too!
> If there's an existing feature that's missing some tests, adding test coverage would make a great contribution to the community.

Locally, unit tests can be run using the Visual Studio Test Explorer or the `dotnet test` command, so that you can check your contribution before opening up a pull request.

<!-- TODO:
### Comments and Documentation ###

### Citations and References ### -->

## Pull requests

When you are ready to contribute your work, please send a [pull request](xref:microsoft.quantum.contributing-qdk.overview.pulls) via GitHub to the corresponding repository.
The team will review and provide feedback. All comments need to be answered and resolved and all checks need to pass before the code is merged to the `main` branch.

## When a pull request is rejected

Sometimes, your pull request for a contribution may be rejected.
If this happens to you, it doesn't mean that it's a bad contribution, as there are a number of reasons why it might not be accepted.
Perhaps most commonly, a contribution to the quantum programming community is a really good one, but the QDK repositories aren't the right place to develop it.
In such cases, you are strongly encourage you to make your own repository --- part of the strength of the QDK is that it's easy to make and distribute your own libraries using GitHub and NuGet.org, the same way that Azure Quantum distributes the [libraries](xref:microsoft.quantum.apiref-intro) today.

At other times, a good contribution may be rejected simply because the Azure Quantum team isn't yet ready to maintain and develop it.
It can be difficult to do everything, so features are planned out as a roadmap.
This can be another case where releasing a feature as a third-party library can make a lot of sense.
Alternatively, you may be asked for your help in modifying a feature to better fit into the roadmap so that the best work can be done with it.

You may also be asked for changes to a pull request if it requires more documentation or unit tests to help make use of it, or if it differs enough in style from the rest of the Q# libraries that it will make it harder for users to find your feature.
In these cases, feedback is offered in code reviews about what can be added or changed to make your contribution easier to include.

Finally, contributions cannot be accepted that cause harm to the quantum computing community, as outlined in the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
This is to ensure that contributions serve the entire quantum computing community, both in its current wonderful diversity, and in the future as it grows to become still more inclusive.
We appreciate your help in realizing this goal.

## Next steps

- [Learn about Q# style guidelines](xref:microsoft.quantum.contributing-qdk.overview.style).
- [Learn about contributing samples](xref:microsoft.quantum.contributing-qdk.overview.samples)