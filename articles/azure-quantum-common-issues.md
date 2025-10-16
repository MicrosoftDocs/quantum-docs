---
author: azure-quantum-content
description: This article provides troubleshooting steps for common issues encountered when using the Azure Quantum service.
ms.author: quantumdocwriters
ms.date: 03/17/2025
ms.service: azure-quantum
ms.subservice: computing
ms.topic: troubleshooting-known-issue
no-loc: [Quantum Development Kit, target, targets]
title: Troubleshoot Issues with Azure Quantum
uid: microsoft.quantum.azure.common-issues
ms.custom: sfi-ropc-nochange

#customer intent: As a quantum developer, I want to troubleshoot common issues with Azure Quantum so that I can continue to use the service effectively.
---

# Troubleshooting common issues in Azure Quantum

When working with the Azure Quantum service, you may run into these common issues. See how you can solve them.

## Connecting to your workspace

### Issue: Unable to authenticate to Azure Quantum via pytket-azure CI

When trying to authenticate to Azure Quantum via the `pytket-azure` package in a CI environment using the environment variables "AZURE_TENANT_ID", "AZURE_CLIENT_ID", and "AZURE_CLIENT_SECRET", you may encounter the error:

```cmd
Code: InsufficientPermissions
Message: There are not enough permissions to perform this operation.
```

To resolve this issue, try to authenticate using a connection string and the environment variable "AZURE_QUANTUM_CONNECTION_STRING" instead. For more information, see [Connect with a connection string](xref:microsoft.quantum.how-to.connect-workspace#connect-with-a-connection-string).

```python
connection_string = "[Copy connection string]" 

import os 

os.environ["AZURE_QUANTUM_CONNECTION_STRING"] = connection_string 
```

## Submitting jobs

### Issue: Missing targets

If the target where you want to run your job is missing from the available target list, you likely need to update to the latest version of the [Quantum Development Kit (QDK) for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=quantum.qsharp-lang-vscode). For more information, see [Update the QDK](xref:microsoft.quantum.update-qdk).

### Issue: Operation returns an invalid status code 'Unauthorized'

Steps to resolve this issue:

1. Open your Azure portal (https://portal.azure.com) and authenticate your account.
2. Under **Navigate**, select **Subscriptions** and select your subscription.
3. Select **Access control (IAM)**.
4. Under **Check access**, search for your email address and select the account.
5. You shouldn't see an **Owner** or a **Contributor** role listed.
6. Select the **Role assignments** tab.

    > [!NOTE]
    > If you don't see the **Role assignments** tab, you may need to expand the portal to full screen or close the **\<your name\> assignments** pane.

7. Select the **Role** dropdown, select either **Owner** or **Contributor**, then enter your email address and select your account.
8. Select **Save**.
9. You should now see your account set configured with either the **Owner** or **Contributor** role.
10. Create your Azure Quantum workspace again and then submit a job against this new Workspace.

### Issue: "AuthorizationFailure - This request is not authorized to perform this operation"

If a job submission fails with this message even though you have a valid connection to the Azure Quantum service, the storage account may be configured to block public network access. The Azure Quantum service only supports storage accounts via public internet access.

To check the storage account:

- On the quantum workspace page in the Azure Portal, select **Overview** and select the storage account.
- On the storage account page, in **Security + networking**, select **Networking**.
- In the **Firewalls and virtual networks** tab in **Public network access**, ensure that **Enable all networks** is selected.

### Issue: "Failed to compile program" when attempting to submit a Q# program through the CLI

When attempting to submit a job at the command prompt using the `az quantum submit` command, you may encounter the following error message:

```azurecli
az quantum job submit ...
Failed to compile program.
Command ran in 21.181 seconds (init: 0.457, invoke: 20.724)
```

This error occurs when there's a problem with the Q# program that causes the compilation to fail.

### Issue: Compiler error "Wrong number of gate parameters"

When submitting a job to Quantinuum from a local Jupyter Notebook or command line environment, and using the legacy QASM (OPENQASM 2.0) translator, you may encounter this error:

```cmd
Job ID <jobId> failed or was cancelled with the message: 1000: Compile error: [<file, line>] Wrong number of gate parameters
```

This error occurs when a comma **","** or another non-period character is used as a decimal separator, as is common in many languages. Replace any non-period decimal separators with periods **"."**.

```qsharp
// replace this line:
rx(1,5707963267948966) q[0];

// with this:
rx(1.5707963267948966) q[0];
```

> [!NOTE]
> This issue does not occur in hosted notebooks in the Azure Quantum portal, only in local development environments. 

### Issue: Compiler error "not available for the current compilation configuration"

When you run a Q# code cell in a Jupyter Notebook in VS Code, you may encounter the error:

```cmd
<function name> not found. Found a matching item `<function name>' that is not available for the current compilation configuration
```

This error indicates that you set the QIR (quantum intermediate representation) target profile to **Basic** and the function in question requires the **Unrestricted** target profile. If you don't specify a target profile type, then the compiler will automatically set the target to **Unrestricted** for you.

### Issue: Operation returned an invalid status code 'Forbidden'

When you submit your first job, you may get a ‘forbidden’ error code.

This issue may originate during the workspace creation: Azure Quantum fails to complete the role assignment linking the new workspace to the storage account that was specified.
A typical scenario for this situation happens if the tab or web browser window is closed before the workspace creation is completed.

You can verify that you're running into this role assignment issue by following these steps:

- Navigate to your new quantum workspace in Azure Portal
- Under **Overview** > **Essentials** > **Storage account**, select on the storage account link
- In the left navigation bar, select **Access Control (IAM)**
- Select **Role Assignments**
- Verify that your workspace appears as a **Contributor**
- If the workspace doesn't appear as a **Contributor**, you can either:
  - Create a new workspace and make sure to wait for the workspace creation to be completed before closing the web browser tab or window.
  - Add the proper role assignment under the storage account
    - Access Control (IAM) > Add role assignments
    - Role > Contributor
    - Assign access to > User, group, or service principal
    - Select > [Workspace name]
    - Save

### Issue: Job fails with error code: QIRPreProcessingFailed

When you submit a job to a Rigetti provider, the job fails and is reported in the Job management console in the Azure portal:

```output
Error code: QIRPreProcessingFailed
Error message: No match found for output recording set converter from outputrecordingset.v2.labeled to outputrecordingset.v1.nonlabeled
```

This error can be caused by a dependency conflict with a previous version of *pyqir* or *qiskit-qir*. Uninstall all versions of *pyqir*, *pyqir-*\*, and *qiskit-qir* on your local machine, and then install or update the *azure-quantum* Python package using the [qiskit] parameter:

```Shell
pip install --upgrade azure-quantum[qiskit]
```

### Issue: Retrieving basic information about failed jobs

After you submit a job to a hardware target, your job may sit in the queue for several hours, or even one or two days, before failing.

To retrieve more information about the failure:

- To view the output or the returned error message, use the [`get_results()`](xref:azure.quantum.job.Job) method with the job object:

    ```python
    job.get_results()
    ```

- In your Azure Portal workspace, select **Operations > Job Management**, and then select the job **Name** to open a detail pane.
- In your Azure Portal workspace, select **Operations > Providers**. Verify the availability of the target machine. Jobs submitted to targets with a status of **Degraded** may stay in the queue longer than usual. Sometimes the jobs get processed, but sometimes they time out and return an error of *target unavailable*.

### Issue: I keep being asked to authenticate when programmatically connecting to my workspace

If you are using the Azure Quantum Python SDK, for example within Jupyter notebook, and are connecting to your workspace using the `AzureQuantumProvider` class, you may experience a pop-up to authenticate to Azure every time you run your script.

This pop-up happens because your security token is being reset every time you run the script.

You can resolve this issue by running `az login` using the Azure CLI. For more information, see [az login](/cli/azure/reference-index#az-login()).

### Issue: After updating the azure-quantum package, I get the error \"ModuleNotFoundError: No module named qiskit.tools\" when monitoring a job

As of Qiskit 1.0, the `qiskit.tools` module, which is required for the `job_monitor()` function, is deprecated. To monitor jobs, use the `wait_for_final_state()` or the `result` functions.

```python
job = MyTarget.run(circuit, shots=100)

# to wait until the job is complete
job.wait_for_final_state() 

# to return the results of the job
result = job.result()
```

## Azure Quantum Resource Estimator

The following common scenarios may prevent resource estimation jobs to complete. See how to resolve them.

### Issue: Quantum algorithm must contain at least one T state or measurement

To account for mapping an arbitrary quantum program to a 2D array of logical qubits, the Resource Estimator assumes that _Parallel Synthesis Sequential Pauli Computation (PSSPC)_  is performed on the input program. In that approach, all Clifford operations are commuted through all T gates, rotation gates, and measurement operations, leaving a single Clifford
operation that can be efficiently evaluated classically. Therefore, a quantum program that does not contain T states, for example from T gates or rotation gates, or measurement operations does not require any physical quantum computing resources. For more information about Parallel Synthesis Sequential Pauli Computation, see [arXiv:2211.07629, Appendix D](https://arxiv.org/pdf/2211.07629.pdf#page=25).

```output
Error message: Algorithm requires at least one T state or measurement to estimate resources
```

### Issue: Physical T gate error rate is too high

The _logical_ T state error rate depends on the error budget and the number of T states in the quantum program. [T factories](xref:microsoft.quantum.concepts.tfactories) are used to create T states with the
required logical T state error rate from physical T gates, which have a _physical_ T gate error rate. Typically, the physical T gate error rate is higher than the required logical T gate error rate. In some scenarios, the
physical T gate error rate is significantly higher compared to the required logical T state error rate, such that no T factory can be found that can produce logical T states of sufficient quality.

```output
Error message: No T factory can be found, because the required logical T state error rate is too low
```

Here is what you could do in such a scenario:

* Increase the error budget, either total or the part for T states.
* Reduce the physical T gate error rate in the qubit parameters.
* Reduce the number of T states in the quantum program by reducing T gates, rotation gates, and Toffoli gates.

### Issue: Physical T gate error rate is too low

There is also the opposite scenario, in which the physical T gate error rate is lower than the required logical T state error rate. In such cases, no T factory is required, because the physical T gate error rate is already of sufficient
quality. However, this scenario requires a careful consideration of the impact of transfer units that transfer the physical T states from code distance 1 to the code distance of the algorithm (see [arXiv:2211.07629, Appendix
C](https://arxiv.org/pdf/2211.07629.pdf#page=21)). In general, in the presence of T factories, the cost of transfer units is negligible.

```output
Error message: No T factory can be found, because the required logical T state error rate is too high; transfer units are necessary to perform a resource estimation accurately. One possibility to circumvent this problem is to increase the physical T gate error rate of the qubit parameters.
```

Here is what you could do in such a scenario:

* Increase the physical T gate error rate in the qubit parameters to the required logical T state error rate.
* Reduce the error budget or just the part for the T states.

### Issue: Error rate must be a number between 0 and 1

Error rates should always be values between 0 and 1. In addition, for error correction to be effective, the physical error rate for gates and measurements must be below a value that depends on the properties of the error correction
code and the required logical error rate.

Here is what you could do in such a scenario:

- Increase the error budget, either total or the part for logical errors.
- Reduce the physical error rates in the qubit parameters.

### Issue: Constraints maximum runtime and maximum number of physical qubits are mutually exclusive

The Resource Estimator accepts only one of [`maxDuration`](xref:qsharp.estimator.EstimatorConstraints) or [`maxPhysicalQubits`](xref:qsharp.estimator.EstimatorConstraints) constraints at the time but not two. If your provide both `maxDuration` and `maxPhysicalQubits`constraints for a single job, it returns the `BothDurationAndPhysicalQubitsProvided` error.

### Issue: Run QIR estimate counts container: undefined symbol __quantum__rt__result_record_output

This error results from generating QIR for Qiskit circuits via the *qiskit_qir* Python package without setting the `record_output` parameter to `False`.

To avoid this error, take one of the following actions:

- Use the *azure_quantum* Python package to submit Qiskit circuits to Azure Quantum (recommended).
- When using the *qiskit_qir* Python package, be sure to set the `record_output` parameter to `False` before submitting your circuit.

## Creating an Azure Quantum workspace

The following issues may occur when you use the Azure portal to create a workspace.

### Issue: You can't access the workspace creation form in the Azure portal; you are asked to sign up for a subscription instead

This issue occurs because you don't have an active subscription.

For example, you may have signed up for the [30 day free trial Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn), which includes USD200 free Azure Credits to use on Azure services. These Azure credits aren't eligible to use on quantum hardware providers. After 30 days of sign-up or once you consume the $200 of free Azure credits (whichever occurs first), you **must** upgrade to a [pay-as-you-go subscription](https://azure.microsoft.com/pricing/purchase-options/pay-as-you-go) to continue using Azure Quantum services. Once you have an active subscription, the Azure portal allows you to access the workspace creation form.

To see a list of your subscriptions and associated roles, see [Check your subscriptions](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-subscriptions).

### Issue: The **Quick create** option is unavailable

You must be an **Owner** of the subscription you select in order to use the **Quick create** option. To see a list of your subscriptions and associated roles, see [Check your subscriptions](xref:microsoft.quantum.how-to.manage-workspace-access#check-your-subscriptions). If you're a subscription **Contributor**, you can use the **Advanced create** option to create a workspace.

### Issue: You're unable to create or select a resource group or storage account

This issue occurs because you don't have the authorization required at the subscription, resource group, or storage account level. For more information on required access levels, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).

### Issue: "Deployment Validation Failed" error message appears after you select **Create**

This error message may include more details such as "The client does not have authorization to perform action."

This issue occurs because you don't have the authorization required at the subscription, resource group, or storage account level. For more information on required access levels, see [Role requirements for creating a workspace](xref:microsoft.quantum.how-to.manage-workspace-access#role-requirements-for-creating-a-workspace).

If access was recently granted, you may need to refresh the page. It can sometimes take up to one hour for new role assignments to take effect over cached permissions across the stack.

### Issue: You don't see a specific quantum hardware provider on the Providers tab

This issue occurs because the provider doesn't support the billing region your subscription is set in. For example, if your subscription is set in Israel, the Providers tab doesn't list Rigetti as an available provider. For a list of providers and their availability by country/region, see [Global availability of Azure Quantum providers](xref:microsoft.quantum.provider-availability).

### Issue: Workspace creation or adding/removing providers fails with "ResourceDeploymentFailure" or "ProviderDeploymentFailure"

This issue may include more details such as "ResourceDeploymentFailure - The 'AzureAsyncOperationWaiting' resource operation completed with terminal provisioning state 'Failed'.", or "ProviderDeploymentFailure - Failed to create plan for provider: \<*Name of the provider*>".

This failure occurs because the tenant did not enable Azure Marketplace purchases. Follow the steps in [Enabling Azure Marketplace purchases](/azure/cost-management-billing/manage/ea-azure-marketplace#enabling-azure-marketplace-purchases) to enable Azure Marketplace purchases.

### Issue: Deploying a quantum workspace or deploying a storage account fails with one of the following errors

- **Workspace**: "The resource write operation failed to complete successfully, because it reached terminal provisioning state 'Failed'".
- **Storage account**: "The template deployment failed because of policy violation".

This issue may occur if your subscription security policy blocks the creation of storage accounts that have public access enabled. The Azure Quantum service only supports storage accounts via public internet access.

To resolve this, work with your subscription administrator to get an exception for the storage account that you want to use.

## Azure Quantum portal

### Issue: Saved notebooks don't load

After selecting **Notebooks** in your workspace, the list of your saved notebooks displays a progress bar but never loads.

This scenario can happen for three reasons:

1. If the storage account no longer exists. This can happen if the storage account linked to the workspace was deleted. To verify, select the **Overview** page for the workspace and select the link to the storage account. If the storage account has been deleted, you see a **404 - Not found** error.

1. If the storage account is not enabled for public internet access. See [Authorization failure](#issue-authorizationfailure---this-request-is-not-authorized-to-perform-this-operation) for more information.

1. If the managed identity of the workspace is not a **Contributor** to the storage account. Check that the workspace identity (which uses the same name as the workspace) still has the **Contributor** role assignment to the storage account. To verify, select the **Overview** page for the workspace and select the link to the storage account. On the **Overview** page for the storage account, select **Access control (IAM)** and verify that the workspace is listed under **Contributor**.
