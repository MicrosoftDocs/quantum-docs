---
author: azure-quantum-content
description: This article provides troubleshooting steps for issues that users might experience when they use the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 10/16/2025
ms.service: azure-quantum
ms.subservice: computing
ms.topic: troubleshooting-known-issue
no-loc: [Quantum Development Kit, target, targets]
title: Troubleshoot Issues with Azure Quantum
uid: microsoft.quantum.azure.common-issues
ms.custom: sfi-ropc-nochange

#customer intent: As a quantum developer, I want to troubleshoot issues that I might experience with Azure Quantum so that I can continue to effectively use the service.
---

# Troubleshooting issues in Azure Quantum

When you work with the Azure Quantum service, you might experience connection or job-related issues. This article explains how to troubleshoot these issues.

## Workspace connection issues

### Issue: I can't authenticate to Azure Quantum with `pytket-azure`

When you try to authenticate to Azure Quantum with the `pytket-azure` package in a CI environment using the environment variables `"AZURE_TENANT_ID"`, `"AZURE_CLIENT_ID"`, and `"AZURE_CLIENT_SECRET"`, you might encounter the following error:

```cmd
Code: InsufficientPermissions
Message: There are not enough permissions to perform this operation.
```

To resolve this issue, use a connection string and the environment variable `"AZURE_QUANTUM_CONNECTION_STRING"` to authenticate instead. For more information, see [Connect with a connection string](xref:microsoft.quantum.how-to.connect-workspace#connect-with-a-connection-string).

```python
connection_string = "" # Add your connection string

import os 

os.environ["AZURE_QUANTUM_CONNECTION_STRING"] = connection_string 
```

## Job submission issues

### Issue: I can't find the target that I want to submit my job to

If the Azure Quantum target that you want to run your job on isn't in the available target list, then update to the latest version of the [Quantum Development Kit (QDK) for Visual Studio Code (VS Code)](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For more information, see [Update the QDK](xref:microsoft.quantum.update-qdk).

### Issue: Operation returns an invalid status code 'Unauthorized'

To resolve this issue, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com) and authenticate your account.
1. Go the Quantum workspace that you're trying to submit a job to.
1. In the workspace navigation pane, select **Access control (IAM)**.
1. Select the **View my access** button. The **assignments** pane opens.
1. In the **Role** column of the **Role assignments** table, check whether you have either the **Owner** or **Contributor** role.
1. If you don't have either role, ask your subscription administrator to assign you the **Owner** or **Contributor** role for this workspace.

### Issue: "AuthorizationFailure - This request is not authorized to perform this operation"

If you get this message even when you have a valid connection to the Azure Quantum service, then the storage account might be configured to block public network access. The Azure Quantum service only supports storage accounts that have public internet access.

To check the storage account settings, follow these steps:

1. Sign in to [Azure portal](https://portal.azure.com).
1. Go to your Quantum workspace.
1. In the **Overview** page, select the **Storage account**.
1. In the navigation pane, expand the **Security + networking** dropdown and select **Networking**.
1. In the **Public network access** section of the **Public access** tab, select the **Manage** button.
1. For the **Public network access** setting, select **Enable**. For the **Public network access scope** setting, select **Enable from all networks**.
1. Select the **Save** button.

### Issue: "Failed to compile program" when you submit a Q# program from Azure CLI

When you submit a job with the `az quantum submit` Azure CLI command, you might encounter the following error message:

```azurecli
az quantum job submit ...
Failed to compile program.
Command ran in 21.181 seconds (init: 0.457, invoke: 20.724)
```

This error occurs when there's a problem with the Q# program that causes the compilation to fail. Make sure that your Q# code has proper syntax.

### Issue: Compiler error "Wrong number of gate parameters"

When you submit a job to Quantinuum from a local Jupyter Notebook or CLI environment, and you're using the legacy QASM (OPENQASM 2.0) translator, then you might encounter this error:

```cmd
Job ID <jobId> failed or was cancelled with the message: 1000: Compile error: [<file, line>] Wrong number of gate parameters
```

This error occurs when a comma **","** or another non-period character is used as a decimal separator. Replace all non-period decimal separators with periods **"."**. For example:

```qsharp
// replace this line:
rx(1,5707963267948966) q[0];

// with this:
rx(1.5707963267948966) q[0];
```

### Issue: Compiler error "not available for the current compilation configuration"

When you run a Q# code cell in a Jupyter Notebook in VS Code, you might encounter the error:

```cmd
<function name> not found. Found a matching item `<function name>' that is not available for the current compilation configuration
```

This error indicates that you set the QIR (quantum intermediate representation) target profile to **Base** when the function requires the **Unrestricted** target profile. If you don't specify a target profile type, then the compiler automatically sets the target to **Unrestricted**.

### Issue: Operation returned an invalid status code 'Forbidden'

When you submit your first job, you might get a `'forbidden'` error code.

This issue occurs when you create a new workspace in the Azure portal and Azure Quantum fails to complete the role assignment that links the workspace to the specified storage account. This can happen when you close the tab or web browser before the workspace creation is completed.

To verify that you're running into this role assignment issue, follow these steps:

1. Go to your Quantum workspace in the Azure portal.
1. In the **Overview** page, select the **Storage account**.
1. In the navigation pane, select **Access Control (IAM)**.
1. Choose the **Role assignments** tab.
1. In the **Role** column, check whether your workspace's storage account has the **Storage Account Contributor** role and the **Storage Blob Data Contributor** role.

If the workspace doesn't have both of these roles on the storage account, then do one of the following:

- Create a new workspace and make sure that workspace creation completes before you close the web browser window or tab.
- Assign the **Storage Account Contributor** and **Storage Blob Data Contributor** roles to your workspace on the storage account.

### Issue: Job fails with error code: QIRPreProcessingFailed

When you submit a job to a Rigetti target and the job fails, you might see the following error message in the **Job management** console for your Quantum workspace in the Azure portal:

```output
Error code: QIRPreProcessingFailed
Error message: No match found for output recording set converter from outputrecordingset.v2.labeled to outputrecordingset.v1.nonlabeled
```

This error can be caused by a dependency conflict with a previous version of `pyqir` or `qiskit-qir`. Uninstall all versions of `pyqir`, `pyqir-*`, and `qiskit-qir` on your local machine, and then install or update the `qdk` Python library with the `azure` and `qiskit` extras:

```Shell
pip install --upgrade "qdk[azure,qiskit]"
```

### Issue: Retrieving basic information about failed jobs

When you submit a job to a hardware target, your job might sit in the queue for several hours or days before the job fails.

To retrieve more information about the job failure, do one of the following:

- To view the job output or the error message, use the [`get_results()`](xref:azure.quantum.job.Job) method from the `qdk.azure` Python module:

    ```python
    job.get_results()
    ```

- In your Quantum workspace in the Azure portal, go to the **Job Management** pane from the **Operations** dropdown, and then choose the job **Name** to open the **Job details** pane.
- In your Quantum workspace in the Azure portal, go to the **Providers** pane from the **Operations** dropdown. Verify that the target hardware is available. If the target status is **Degraded**, then jobs might stay in the queue longer than usual. Sometimes the jobs get processed, but sometimes they time out and return an error of **target unavailable**.

### Issue: Azure Quantum asks me to authenticate when I programmatically connect to my workspace

If you're using the Azure Quantum Python SDK and you're connecting to your workspace using the `AzureQuantumProvider` class, then you might experience a pop-up to authenticate to Azure every time you run your script.

This pop-up happens because your security token gets reset each time you run the script.

To resolve this issue, run `az login` from the Azure CLI. For more information, see [az login](/cli/azure/reference-index#az-login()).

## Microsoft Quantum resource estimator issues

The following issues might cause resource estimation jobs to fail.

### Issue: Quantum algorithm must contain at least one T state or measurement

To account for mapping an arbitrary quantum program to a 2D array of logical qubits, the resource estimator assumes that Parallel Synthesis Sequential Pauli Computation (PSSPC) is performed on the input program. In that approach, all Clifford operations are commuted through all T gates, rotation gates, and measurement operations, leaving a single Clifford operation that can be efficiently evaluated classically. Therefore, a quantum program that does not contain T states, for example from T gates or rotation gates, or measurement operations does not require any physical quantum computing resources. For more information about Parallel Synthesis Sequential Pauli Computation, see [arXiv:2211.07629, Appendix D](https://arxiv.org/pdf/2211.07629.pdf#page=25).

```output
Error message: Algorithm requires at least one T state or measurement to estimate resources
```

### Issue: Physical T gate error rate is too high

The logical T state error rate depends on the error budget and the number of T states in the quantum program. [T factories](xref:microsoft.quantum.concepts.tfactories) are used to create T states with the required logical T state error rate from physical T gates, which have a physical T gate error rate. Typically, the physical T gate error rate is higher than the required logical T gate error rate. In some scenarios, the
physical T gate error rate is significantly higher compared to the required logical T state error rate, such that no T factory can be found that can produce logical T states of sufficient quality.

```output
Error message: No T factory can be found, because the required logical T state error rate is too low
```

To resolve this issue, do one of the following:

- Increase the error budget, either the total or the part for T states.
- Reduce the physical T gate error rate in the qubit parameters.
- Reduce the number of T states in the quantum program by reducing T gates, rotation gates, and Toffoli gates.

### Issue: Physical T gate error rate is too low

When the physical T gate error rate is lower than the required logical T state error rate, you don't need a T factory because the physical T gate error rate is sufficient. However, you still need to consider the impact of transfer units that transfer the physical T states from code distance 1 to the code distance of the algorithm (see [arXiv:2211.07629, Appendix C](https://arxiv.org/pdf/2211.07629.pdf#page=21)). In general, in the presence of T factories, the cost of transfer units is negligible.

```output
Error message: No T factory can be found, because the required logical T state error rate is too high; transfer units are necessary to perform a resource estimation accurately. One possibility to circumvent this problem is to increase the physical T gate error rate of the qubit parameters.
```

To resolve this issue, do one of the following:

- Increase the physical T gate error rate in the qubit parameters to the required logical T state error rate.
- Reduce the error budget or just the part for the T states.

### Issue: Error rate must be a number between 0 and 1

Error rates can only have a value between 0 and 1. For error correction to be effective, the physical error rate for gates and measurements must be below a value that depends on the properties of the error correction code and the required logical error rate.

To resolve this issue, do one of the following:

- Increase the error budget, either total or the part for logical errors.
- Reduce the physical error rates in the qubit parameters.

### Issue: Constraints maximum runtime and maximum number of physical qubits are mutually exclusive

The resource estimator accepts only one of [`maxDuration`](xref:qsharp.estimator.EstimatorConstraints) or [`maxPhysicalQubits`](xref:qsharp.estimator.EstimatorConstraints) constraints. If you provide both `maxDuration` and `maxPhysicalQubits`constraints for a single job, then the job returns the `BothDurationAndPhysicalQubitsProvided` error.

### Issue: Run QIR estimate counts container: undefined symbol __quantum__rt__result_record_output

You get this error when you generate QIR for Qiskit circuits with the `qiskit_qir` Python package and you don't set the `record_output` parameter to `False`.

To avoid this error, do one of the following:

- Use the `qdk.azure` Python module to submit Qiskit circuits to Azure Quantum (recommended).
- When you use the `qiskit_qir` Python package, set the `record_output` parameter to `False` before you submit your circuit.

## Azure Quantum workspace creation issues

You might experience the following issues when you create a Quantum workspace in the Azure portal.

### Issue: You can't access the workspace creation form in the Azure portal, and you're asked to sign up for a subscription instead

This issue occurs because you don't have an active Azure subscription.

When you sign up for a [30 day free trial Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn), you get free Azure credits. After you use all your free credits, or 30 days after you sign up, you need to upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go) to continue using Azure Quantum services. When you have an active subscription, the Azure portal allows you to access the workspace creation form.

To see a list of your subscriptions and associated roles, see [Check your subscriptions](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-subscriptions).

> [!NOTE]
> Azure credits from the 30 day free trial Azure subscription aren't eligible to use on quantum hardware providers.

### Issue: The Quick create option is unavailable

You must be an **Owner** of a subscription to use the **Quick create** option. To see a list of your subscriptions and associated roles, see [Check your subscriptions](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-subscriptions). If you're a subscription **Contributor**, you can use the **Advanced create** option to create a workspace.

### Issue: You're unable to create or select a resource group or storage account

This issue occurs because you don't have the authorization required at the subscription, resource group, or storage account level. For more information on required access levels, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).

### Issue: A "Deployment Validation Failed" error message appears when you choose Create

This error message might include more details such as "The client does not have authorization to perform action."

This issue occurs because you don't have the authorization required at the subscription, resource group, or storage account level. For more information on required access levels, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).

If you were recently granted access, you might need to refresh the page. New role assignments can take up to one hour to take effect over cached permissions across the stack.

### Issue: You don't see a specific quantum hardware provider on the Providers tab

This issue occurs because the provider doesn't support the billing region that your subscription is set in. For a list of providers and their availability by country/region, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability).

### Issue: Workspace creation or adding/removing providers fails with "ResourceDeploymentFailure" or "ProviderDeploymentFailure"

This issue might include more details such as "ResourceDeploymentFailure - The 'AzureAsyncOperationWaiting' resource operation completed with terminal provisioning state 'Failed'.", or "ProviderDeploymentFailure - Failed to create plan for provider: \<*Name of the provider*>".

This failure occurs because the tenant didn't enable Azure Marketplace purchases. Follow the steps in [Enabling Azure Marketplace purchases](/azure/cost-management-billing/manage/ea-azure-marketplace#enabling-azure-marketplace-purchases) to enable Azure Marketplace purchases.

### Issue: Deployment of a quantum workspace or storage account fails

When you try to deploy a Quantum workspace or storage account, you might get one of the following errors:

- **Workspace**: "The resource write operation failed to complete successfully, because it reached terminal provisioning state 'Failed'".
- **Storage account**: "The template deployment failed because of policy violation".

This issue might occur if your subscription security policy blocks the creation of storage accounts that have public access enabled. The Azure Quantum service only supports storage accounts that have public internet access.

To resolve this, work with your subscription administrator to get an exception for the storage account that you want to use.
