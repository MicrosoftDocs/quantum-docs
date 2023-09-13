---
author: bradben
description: Learn how to install the Azure Quantum chemistry library and use it with the NWChem computational chemistry platform.
ms.author: brbenefield
ms.date: 06/21/2023
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: conceptual
no-loc: ['Q#', '$$v', Quantum Development Kit]
title: Q# Chemistry Library Installation
uid: microsoft.quantum.libraries.overview-chemistry.concepts.installation
---

# Chemistry library installation

The quantum chemistry library for the Quantum Development Kit is designed to work well with computational chemistry packages, most notably the [**NWChem**](https://nwchemgit.github.io) computational chemistry platform developed by the Environmental Molecular Sciences Laboratory (EMSL) at Pacific Northwest National Laboratory.
In particular, the [**Microsoft.Quantum.Chemistry** package](https://www.nuget.org/packages/Microsoft.Quantum.Chemistry) provides tools for loading instances of quantum chemistry simulation problems represented in the [Broombridge schema](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge), also supported for export by recent versions of NWChem.

The Quantum Development Kit chemistry library also provides a command-line tool, `qdk-chem`, for converting between legacy formats and [Broombridge](xref:microsoft.quantum.libraries.overview.chemistry.schema.broombridge).

This section details how to use the Quantum Development Kit with either NWChem and Broombridge, or legacy formats and `qdk-chem`.

## Prerequisites

- The Microsoft [Quantum Development Kit](xref:microsoft.quantum.install-qdk.overview) or an [Azure Quantum workspace](xref:microsoft.quantum.how-to.workspace).
- The `Microsoft.Quantum.Chemistry` library. For information on installing additional Q# libraries, see [Q# libraries](xref:microsoft.quantum.libraries.overview#installation).

## Using the Quantum Development Kit with NWChem

To get up and running using NWChem together with the Quantum Development Kit, use one of the following methods:

- Get started using existing Broombridge files provided with the samples at [IntegralData/YAML](https://github.com/microsoft/Quantum/tree/main/samples/chemistry/IntegralData/YAML).
- Use the [EMSL Arrows Builder for the Quantum Development Kit](https://arrows.emsl.pnnl.gov/api/qsharp_chem) which is a web-based frontend to NWChem, to generate new Broombridge-formatted molecular input files.  
- Use the [Docker image](https://hub.docker.com/r/nwchemorg/nwchem-qc/) provided by PNNL to run NWChem, or
- [Compile NWChem](https://nwchemgit.github.io/Compiling-NWChem.html) for your platform.

See [End-to-end with NWChem](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.endtoend) for more information on how to work with NWChem to chemical models to analyze with the Quantum Development Kit chemistry library.

### Getting started using Broombridge files provided with the samples

The [IntegralData/YAML](https://github.com/microsoft/Quantum/tree/main/samples/chemistry/IntegralData/YAML) folder in the Quantum Development Kit Samples repository contains Broombridge-formatted molecule data files.  

As a simple example, use the chemistry library sample, [GetGateCount](https://github.com/microsoft/Quantum/tree/main/samples/chemistry/GetGateCount) to load the Hamiltonian from one of Broombridge files and perform gate estimates of quantum simulation algorithms:

```bash
cd Quantum/Chemistry/GetGateCount
dotnet run -- --path=../IntegralData/YAML/h2.yaml --format=Broombridge
```

See [Loading a Hamiltonian from file](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.loadhamiltonian) for more information on how to input molecules represented by the Broombridge schema.  

See [Obtaining resource counts](xref:microsoft.quantum.libraries.overview-chemistry.examples.overview.resourcecounts) for more information on resource estimation.  

### Getting started using the EMSL Arrows Builder

EMSL Arrows is a tool that uses NWChem and chemical computational databases to generate molecule data.  [EMSL Arrows Builder for the Quantum Development Kit](https://arrows.emsl.pnnl.gov/api/qsharp_chem) allows you to enter your model using multiple molecular model builders and generate the Broombridge data file to be used by the Quantum Development Kit.  

From the EMSL page, click the **Instructions** tab, and follow the **Simple Examples** instructions to generate Broombridge files.  Then try running the `GetGateCount` to see the quantum resource estimates for these molecules.

### Installing NWChem from source

Full instructions on how to install NWChem from source are provided by [PNNL](http://www.nwchem-sw.org/index.php/Compiling_NWChem).

> [!TIP]
> If you wish to use NWChem from Windows 10, the Windows Subsystem for Linux is a great option.
> Once you have installed [Ubuntu 18.04 LTS for Windows](https://www.microsoft.com/p/ubuntu-1804-lts/9n9tngvndl3q#activetab=pivot:overviewtab), run `ubuntu18.04` from your favorite terminal and follow the earlier instructions to install NWChem from source.

Once you have compiled NWChem from source, you can run the *yaml_driver* script provided with NWChem to quickly produce Broombridge instances from NWChem input decks:

```bash
$NWCHEM_TOP/contrib/quasar/yaml_driver input.nw
```

This command creates a new *input.yaml* file in the Broombridge format within your current directory.

### Using NWChem with Docker

Pre-built images for using NWChem are available cross-platform via [Docker Hub](https://hub.docker.com).
To get started, follow the Docker installation instructions for your platform:

- [Install Docker for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- [Install Docker for macOS](https://docs.docker.com/docker-for-mac/install/)
- [Install Docker for Windows 10](https://docs.docker.com/docker-for-windows/install/)

> [!TIP]
> If you are using Docker for Windows, you need to share the drive containing your temporary directory (usually this is the `C:\` drive) with the Docker daemon. See the [Docker documentation](https://docs.docker.com/docker-for-windows/#shared-drives) for more details.

Once you have Docker installed, you can either use the PowerShell module provided with the Quantum Development Kit samples to run the image, or you can run the image manually.
The steps for using PowerShell are detailed here; if you would like to use the Docker image manually, please see the [documentation provided with the image](https://hub.docker.com/r/nwchemorg/nwchem-qc/).

#### Running NWChem through PowerShell Core

To use the NWChem Docker image with the Quantum Development Kit, a small PowerShell module that handles moving files in and out of NWChem for you is provided.
If you don't already have PowerShell Core installed, you can download it cross-platform from the [PowerShell repository on GitHub](https://github.com/PowerShell/PowerShell#get-powershell).

> [!NOTE]
> PowerShell Core is also used for some samples to demonstrate interoperability with data science and business analytics workflows.

Once you have PowerShell Core installed, import `InvokeNWChem.psm1` to make NWChem commands available in your current session:

```powershell
cd Quantum/utilities/
Import-Module ./InvokeNWChem.psm1
```

This makes the `Convert-NWChemToBroombridge` command available in your current PowerShell session.
To download any needed images from Docker and use them to run NWChem input decks and capture output to Broombridge, run the following:

```powershell
Convert-NWChemToBroombridge ./input.nw
```

This creates a Broombridge file by running NWChem on `input.nw`.
By default, the Broombridge output has the same name and path as the input deck, with the `.nw` extension replaced by `.yaml`.
This can be overridden by using the `-DestinationPath` parameter to `Convert-NWChemToBroombridge`.
More information can be obtained by using PowerShell's built-in help functionality:

```powershell
Convert-NWChemToBroombridge -?
Get-Help Convert-NWChemToBroombridge -Full
```

## Using the Quantum Development Kit with the qdk-chem tool

To install `qdk-chem`, you can use the .NET Core SDK at the command line:

```dotnetcli
dotnet tool install --global Microsoft.Quantum.Chemistry.Tools
```

Once you have installed `qdk-chem`, you can use the `--help` option to get more details about the functionality offered by the `qdk-chem` tool.

To convert to and from Broombridge, you can use the `qdk-chem convert` command:

```
qdk-chem convert --from fcidump --to broombridge data.fcidump --out data.yml
```

The `qdk-chem convert` command can also accept its data from standard input, and can write to standard output; this is especially useful within scripts and for integrating with tools that export to legacy formats.
For example, in Bash:

```bash
cat data.fcidump | qdk-convert --from fcidump --to broombridge - > data.yml
```
