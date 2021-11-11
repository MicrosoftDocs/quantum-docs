---
author: mblouin
description: Frequently Asked Questions regarding the Azure Quantum Credits Program
ms.author: mblouin
ms.date: 10/06/2021
ms.service: azure-quantum
ms.subservice: credits
ms.topic: faq
title: Azure Quantum Credits FAQ
uid: microsoft.quantum.credits.credits-faq
---

# FAQ: Applications to the Azure Quantum Credits Program

## Who can apply for the Azure Quantum Credits Program?
Educational institutions, companies, and some other approved organizations may apply for Azure Quantum Credits. Credits applicants may be based in the United States, or in any other market that is currently served by Microsoft Azure. For more information, see the [Azure Quantum Hardware Credit Program Terms](https://aka.ms/aq/credits/terms).

## What are the terms of use for Azure Quantum Credits?
You can find the terms for the credits program terms at this link: [aka.ms/aq/credits/terms](https://aka.ms/aq/credits/terms).

Note that in using Azure Quantum Credits you must also accept the relevant usage terms for Microsoft Azure, and the terms from the providers you would like access to.

## How long are credits valid for?
Credits are valid 6 months from your project start date. Extensions are occasionally available on a case-by-case basis.

## I have applied, how long will it take to hear back on my application?
We try to respond to all credits applications within one (1) month of the application date.

## What programming languages or frameworks can be used with Azure Quantum and Azure Quantum Credits?
Credits may be used with any programming language or framework that is supported by Azure Quantum. Currently we support:

- Q# ([Quickstart](xref:microsoft.quantum.quickstarts.computing)) ([Installation](https://docs.microsoft.com/azure/quantum/quickstart-microsoft-qc))
- Cirq ([Quickstart](xref:microsoft.quantum.quickstarts.computing.cirq)) ([Installation](https://quantumai.google/cirq/azure-quantum/access))
- Qiskit ([Quickstart](xref:microsoft.quantum.quickstarts.computing.qiskit)) ([Installation]())

## My application was rejected, can I appeal the decision or re-apply?
Rejections may not be appealed, and may be made for a number of reasons including the contents of the application, or other business reasons. In the event of substantial changes to your proposed project or the group carrying out the project you may re-apply.

In some cases, your rejection notice may specify that insufficient information was provided to evaluate the application, or note that resources that were linked to in the application were not accessible to reviewers. In this case, you may re-apply to the program while providing more information.

# FAQ: Onboarding and using your credits

## I received my approval notice, what happens next?
Once you receive your approval notice, you will need to open the onboarding survey linked from the notice and fill out all of the onboarding information. Once that's complete your credits will be made available either within two (2) weeks, or on the start date of your credits grant (whichever is later).

You will receive a notice once your credits are available to be used, with detailed instruction to do so.

## Are there any costs or charges when using my credits?
There are no costs or charges to using your free credits, however there may be some small storage costs as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job, and [blob storage pricing is detailed on this page](https://azure.microsoft.com/pricing/details/storage/blobs/).

## How do I see my credits balance?
You can see your current credit balance by going to the Overview blade on your Azure Quantum Workspace, and selecting the "Quota" tab. You will see a credits quota for each provider that you have credits with. You will see the total number of credits you have received, and may hover over the relevant graph to see the amount you have used towards your credits.

You can also see your quotas by using the AZ CLI and the `az quantum workspace quotas` command, like in the example below. In this case, the `qgs` row shows that the account has a total of `8333334 qgs` with IonQ, of which `33334 qgs` have been used. The account also has `800 HQC` with Honeywell, of which `0 HQC` have been used.
```bash
$ az quantum workspace quotas -o table
Dimension  Holds  Limit      Period    ProviderId  Scope         Utilization
---------  -----  ---------  --------  ----------  ------------  -----------
qgs        0.0    8333334.0  Infinite  ionq        Subscription  33334.0
hqc        0.0    800.0      Infinite  honeywell   Subscription  0.0
```

Note that credits are shown in the quota units used by the provider, and not in the dollar value of the credits received. You may use the table below to understand the approximate conversion value between quota units and US dollar value:
| Provider | Unit | Approximate $ Value (USD) | Documentation |
|----------|------|---------------------------|---------------|
| Honeywell | HQC (Honeywell Quantum Credit) | $1 USD ~= 0.08 HQC | [Learn more about how Honeywell Quantum Credits are calculated](xref:microsoft.quantum.providers.honeywell) |
| IonQ | QGS (Qubit Gate-Shot) | $1 USD ~= 33,333.3 QGS | [Learn more about how IonQ Qubit-Gate-Shots are calculated](xref:microsoft.quantum.providers.ionq) |

## I'm encountering a problem using my credits, what can I do?
If you are having any problems with Azure Quantum pertaining to credits or otherwise, the best and fastest place to get support is by [filing a support ticket with Azure](https://azure.microsoft.com/support/create-ticket/).

If you do not have an Azure support subscription or are unsure about how to file a ticket, you may reply to your approval notice email and one of our team members will get back to you.

## Guide: Onboarding with Honeywell Credits
Instructions for configuring your Azure Quantum Workspace to access Honeywell:

1. [Open the Azure Quantum Workspace Create screen in the Azure Portal](https://portal.azure.com/#create/Microsoft.AzureQuantum)
1. On the **Basics** tab while configuring your Workspace, ensure the selected **subscription** matches the subscription you supplied in your onboarding information. The subscription information is also copied in the onboarding mail you received.
1. On the **Basics** tab while configuring your Workspace, ensure the selected **region** matches the subscription you supplied in your onboarding information. The region information is also copied in the onboarding mail you received.
1. Provider and SKU: On the **Providers** tab, select "Honeywell Quantum Solutions". When the SKU/Pricing selector opens, ensure you select "Azure Quantum Credits".
    > Important: If you select any plan other than “Azure Quantum Credits” you may be charged for usage. If you do not see the Azure Quantum Credits SKU please double check that you have selected the correct Subscription and Region, then send an email to the support email address specified in your credits onboarding email if you cannot see the SKU.

> If you have received grants towards more than one Provider, you may add all of them to the same Quantum Workspace or you may create multiple Workspaces.
Links to Quickstart guides (follow the one for your desired programming framework):

## Guide: Onboarding with IonQ Credits

1. [Open the Azure Quantum Workspace Create screen in the Azure Portal](https://portal.azure.com/#create/Microsoft.AzureQuantum)
1. On the **Basics** tab while configuring your Workspace, ensure the selected **subscription** matches the subscription you supplied in your onboarding information. The subscription information is also copied in the onboarding mail you received.
1. On the **Basics** tab while configuring your Workspace, ensure the selected **region** matches the subscription you supplied in your onboarding information. The region information is also copied in the onboarding mail you received.
1. Provider and SKU: On the **Providers** tab, select "IonQ". When the SKU/Pricing selector opens, ensure you select "Azure Quantum Credits".
    > Important: If you select any plan other than “Azure Quantum Credits” you may be charged for usage. If you do not see the Azure Quantum Credits SKU please double check that you have selected the correct Subscription and Region, then send an email to the support email address specified in your credits onboarding email if you cannot see the SKU.

> If you have received grants towards more than one Provider, you may add all of them to the same Quantum Workspace or you may create multiple Workspaces.
Links to Quickstart guides (follow the one for your desired programming framework):

