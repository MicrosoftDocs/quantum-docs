---
title: Shipping Sample
author: geduardo
ms.author: v-edsanc
ms.date: 10/02/2020
ms.topic: article
page_type: sample
languages:
- python
products:
- quantum
description: "Learn how to solve a binary optimization problem using Azure Quantum."
---

# Shipping Sample

## Introduction

This sample provides a comprehensive walkthrough of the ship loading problem, from problem definition to formulation of penalty functions and finally solving the problem using the Azure Quantum Optimization Service. This is an introductory-level sample.

By working through this sample, you will learn:

- What the ship loading problem is
- How to represent problem terms mathematically
- How to build penalty functions to represent problem constraints
- How to transform these mathematical functions into code using the Azure Quantum Optimization Python SDK
- How to submit problem terms to Azure Quantum
- How to interpret the results

## Prerequisites

1. [Create an Azure Quantum Workspace](https://github.com/MicrosoftDocs/quantum-docs-private/wiki/Create-quantum-workspaces-with-the-Azure-portal)
2. Install the `azure-quantum` Python module by following the [private preview instructions](https://github.com/MicrosoftDocs/quantum-docs-private/wiki/Use-the-Python-SDK-for-Quantum-Inspired-Optimization)
3. (If you want to run the Jupyter notebook) [Install Jupyter Notebook](https://jupyter.org/install)

## Running the sample

There are two ways to run the sample:

- Jupyter Notebook (full sample walkthrough)
- Python script (barebones annotations)

### Running the Jupyter Notebook

To run this sample, use the commandline to navigate to the `shipping-sample` folder and run `jupyter notebook`.

Your web browser should automatically open a new window showing something similar to the below:

![Jupyter Notebook landing page](./media/jupyter-homepage.png)

If this doesn't happen, copy the localhost link shown in the terminal window and paste it into your browser's address bar.

Once you see the page above, simply click on the `shipping-sample.ipynb` link to open the sample notebook.

### Running the Python script

- Open up the `shipping-sample.py` script using your favorite IDE or a text editor.
- Fill in your Azure Quantum workspace details at the beginning of the script.
- Run the script through your IDE or use the command line to navigate to the `shipping-sample` folder and then run `python ./shipping-sample.py` or `python3 ./shipping-sample.py` (depending on how your environment is set up).
