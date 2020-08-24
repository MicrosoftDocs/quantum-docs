---
title: Job Shop Scheduling Sample
description: Learn how to solve the job shop scheduling problem using Azure Quantum
author: anraman
---

# Job Shop Scheduling Sample

## Introduction

This sample provides a comprehensive walkthrough of the job shop scheduling problem, from problem definition to formulation of penalty functions and finally solving the problem using the Azure Quantum Optimization Service.

By working through this sample, you will learn:

- What the job shop scheduling problem is and why it is important
- How to represent problem terms mathematically
- How to build penalty functions to represent problem constraints
- How to transform these mathematical functions into code using the Azure Quantum Optimization Python SDK
- How to submit problem terms to Azure Quantum
- How to interpret the results

## Prerequisites

1. [Create an Azure Quantum Workspace](https://github.com/MicrosoftDocs/quantum-docs-private/wiki/Create-quantum-workspaces-with-the-Azure-portal)
2. Install the `azure-quantum` Python module by following the [private preview instructions](https://github.com/MicrosoftDocs/quantum-docs-private/wiki/Use-the-Python-SDK-for-Quantum-Inspired-Optimization)
3. [Install Jupyter Notebook](https://jupyter.org/install)
4. (Optional) [Run the basic ship loading sample](../shipping-sample/shipping-sample.ipynb)

## Running the sample

To run this sample, use the commandline to navigate to the `job-shop-sample` folder and run `jupyter notebook`

Your web browser should automatically open a new window showing something similar to the below:

![Jupyter Notebook landing page](./media/jupyter-homepage.png)

If this doesn't happen, copy the localhost link shown in the terminal window and paste it into your browser's address bar.

Once you see the page above, simply click on the `job-shop-sample.ipynb` link to open the sample notebook.
