---
author: SoniaLopezBravo
description: Azure Quantum credits
ms.author: sonialopez
ms.date: 06/14/2022
ms.service: azure-quantum
ms.subservice: core
ms.topic: reference
title: Azure Quantum credits
uid: microsoft.quantum.credits
---

# Azure Quantum Credits

Azure Quantum Credits can be used to run programs on quantum hardware. 

First-time users automatically get free 500 USD Azure Quantum Credits for use with each participating quantum hardware provider. To obtain your free Azure Quantum Credits, you have to [create a quantum workspace](xref:microsoft.quantum.how-to.workspace).
Credits are shared for all workspaces within a single subscription and region. That is, you will get free USD 500 Azure Quantum credits for each quantum hardware provider when you create your first Azure Quantum workspace, but the following workspaces you create within the same subscription will share the credits grant.

Once you have consumed all the credits you need to switch to a different plan to continue using the selected quantum hardware provider. Azure Quantum won’t start charging you once you reach your credit limit.

> [!NOTE]
> Please notice that Azure Credits are not the same as Azure Quantum Credits. When you create a new Azure account, you get 200 USD free Azure Credits to use on Microsoft services. You can only use general-purpose Azure Credits with the Microsoft providers. 3rd-party providers (providers that aren't owned by Microsoft) aren't eligible.

## How to use Azure Quantum Credits

Credits may be used with any programming language or framework that is supported by Azure Quantum. 

To use credits, you just have to submit a job in a workspace that uses a credits plan for that provider. The workspace will not spend any money on jobs submitted to providers that use a credits plan in that workspace (if your job happens to go over the credit allocation, it will either be rejected or completed for free, and then subsequent jobs will be rejected) 


> [!IMPORTANT]
> There are no costs or charges to using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

## Viewing credit balance 

### [Using portal](#tab/tabid-portal)

1. Sign in to the [Azure portal](https://portal.azure.com), using the credentials for your Azure subscription.
2. Select your Azure Quantum workspace.
3. In the left panel, under "Operations", go to the “Credits and quotas” blade and select the “Credits” tab. 
4. See the consumed and the remaing credits for each selected provider. Credits are expressed in US dollars. 


### [Using Azure CLI](#tab/tabid-cli)


***

## How is credits consumption calculated?

Azure Quantum Credits consumption is based on a resource-usage model defined by each provider and cost of use is deducted from your credits.

> [!TIP]
> If you have consumed all the credits and you need more, you can apply to the [**Azure Quantum Credits Program**](https://aka.ms/aq/credits). Microsoft offers up to 10,000 USD extra Azure Quantum Credits for use on quantum hardware For more information see [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq).


### IonQ 

On IonQ QPU, each job you run consumes credits depending on the number of gates in your program, the complexity of the gates you use, and the number of shots. These usage units are called *qubit-gate-shots (QGS)*.  

Every quantum program consists of $N$ quantum logical gates of one or more qubits, and is executed for a certain number of shots. The number of gate-shots is calculated by the following formula:
$$
QGS = N · C
$$
where:

- $N$ is the number of one- or two-qubit gates submitted
- $C$ is the number of execution shots requested

|Usage unit|Approx. value|
|---|---|  
|QGS|  |


### Quantinuum 

On Quantinuum, each job you run consumes credits depending on the number of operations in the job, and the number of shots you run. The usage units are *H1 Quantum Credit (HQC)* for jobs submitted to System Model H1 quantum computer, and *Quantinuum Emulator Quantum Credits (eHQC)* for jobs submitted to System Model H1 emulator.

|Usage unit|Approx. value|
|---|---|  
|HQC| 6.25 USD per HQC  |
|eHQC|1.56 USD per eHQC |

HQC and eHQC are used to calculate the cost of running a job, and they are calculated based on the following formula (same for eHQC):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets
- $C$ is the shot count

## Next Steps

- [FAQ: Applications to the Azure Quantum Credits Program](xref:microsoft.quantum.credits.credits-faq)
- [Azure Quantum quotas](microsoft.quantum.quotas)
- [Azure Quantum pricing](xref:microsoft.quantum.providers-pricing)
- [Azure Quantum job cost](xref:microsoft.quantum.azure.job-costs)
