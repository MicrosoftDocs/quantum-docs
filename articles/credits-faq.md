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

## Are there any costs or charges when using my credits?

## How do I see my credits balance?
You can see your current credit balance by going to the Overview blade on your Azure Quantum Workspace, and selecting the "Quota" tab. You will see a credits quota for each provider that you have credits with. You will see the total number of credits you have received, and may hover over the relevant graph to see the amount you have used towards your credits.

You can also see your quotas by using the AZ CLI and the `az quantum workspace quotas` command, like in the example below. In this case, the `qgs` row shows that the account has a total of `8333334 qgs`, of which `33334 qgs` have been used.
```bash
$ az quantum workspace quotas -o table
Dimension  Holds  Limit      Period    ProviderId  Scope         Utilization
---------  -----  ---------  --------  ----------  ------------  -----------
qgs        0.0    8333334.0  Infinite  ionq        Subscription  33334.0
```

Note that credits are shown in the quota units used by the provider, and not in the dollar value of the credits received. You may use the table below to understand the approximate conversion value between quota units and US dollar value:
| Provider | Unit | Approximate $ Value (USD) |
|----------|------|---------------|
| Honeywell | HQC (Honeywell Quantum Credit) | $1 USD ~= 0.08 HQC |
| IonQ | QGS (Qubit Gate-Shot) | $1 USD ~= 33,333.3 QGS |

## I'm encountering a problem using my credits, what can I do?
If you are having any problems with Azure Quantum pertaining to credits or otherwise, the best and fastest place to get support is by [filing a support ticket with Azure](https://azure.microsoft.com/support/create-ticket/).

If you do not have an Azure support subscription or are unsure about how to file a ticket, you may reply to your approval notice email and one of our team members will get back to you.

## Guide: Onboarding with Honeywell Credits

## Guide: Onboarding with IonQ Credits

