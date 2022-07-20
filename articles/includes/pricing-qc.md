## IonQ 

[IonQ](https://ionq.com/) charges based on the number of gates in your program, the complexity of the gates you use, and the number of shots. These units are called *gate-shots*.

Every quantum program consists of $N$ quantum logical gates of one or more qubits, and is executed for a certain number of shots. The number of gate-shots is calculated by the following formula:

$$
QGS = N · C
$$

where:

- $N$ is the number of one- or two-qubit gates submitted
- $C$ is the number of execution shots requested

Multi-controlled two-qubit gates are billed as $6 * (N - 2)$ two-qubit gates, where $N$ is the number of qubits involved in the gate. For example, a NOT gate with 3 controls would be billed as $(6 * (4 - 2))$ or 12 two-qubit gates. To learn more about IonQ, visit [IonQ provider page](xref:microsoft.quantum.providers.ionq).

All new Azure Quantum customers benefit of a one-time $500 free Azure Quantum credits toward IonQ provider. Besides Azure Quantum credits, IonQ offers a **Pay-as-you-go** plan with no monthly subscription fees. 

### [Azure Quantum Credits](#tab/tabid-AQcredits)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Use is deducted from the Azure Quantum Credits based on the number of QGSs executed |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
| |<ul><li>1-Qubit Gate Shot: $0.00003 (USD) deducted from your credits</li><li>2-Qubit Gate Shot: $0.0003 (USD) deducted from your credits</li></ul>|

Minimum of $1 (USD) per program execution, deducted from your credits. 

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using IonQ. Azure Quantum won’t start charging you once you reach your credit limit. 

> [!IMPORTANT]
> There are no costs or charges to using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
 
### [Pay As You Go](#tab/tabid-paygo)

The Pay-as-you-go plan consists of *a la carte* access to trapped ion quantum computers and simulators, charged on a resource-usage model.  

|Pricing | Use is charged based on the number of QGSs executed + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
||<ul><li>1-qubit gate shot: $0.00003 (USD) </li><li>2-qubit gate shot: $0.0003 (USD) </li></ul>|

Minimum of $1 (USD) per program execution.  

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

***

## Quantinuum

[Quantinuum](https://www.quantinuum.com/) uses a credit system that charges each job depending on the number of operations in the job, and the number of shots you run. The usage units are *H1 Quantum Credit (HQC)* for jobs submitted to System Model H1 quantum computer, and *Quantinuum Emulator Quantum Credits (eHQC)* for jobs submitted to System Model H1 emulator.

> [!NOTE]
> Do not confuse the Quantinuum credits HQC with the Azure Quantum credits. Quantinuum credits are a usage unit defined by the provider to track the usage and quotas of their targets.

HQC and eHQC are used to calculate the cost of running a job, and they are calculated based on the following formula (same for eHQC):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

To learn more about Quantinuum, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.quantinuum).

All new Azure customers benefit from $500 in free credits towards the Quantinuum provider. Besides Azure Quantum credits, Quantinuum provides two plans: **Standard Subscription** and **Premium Subscription**.

### [Azure Quantum Credits](#tab/tabid-AQcreditsQ)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. To learn more about credits, see [Azure Quantum Credits](xref:microsoft.quantum.credits).

|Pricing | Use is deducted from the Azure Quantum Credits based on the HQC equation described above |
|---|---|  
|Includes access to | <ul><li> 40 HQCs for use on the System Model H1 hardware</li><li>400 eHQCs for use on the System H1 Emulator</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to explicitly switch to a different plan to continue using Quantinuum. Azure Quantum won’t start charging you once you reach your credit limit. 

> [!IMPORTANT]
> There are no costs or charges to using your free credits. However, there may be some small storage costs, as the input and output of your credits jobs are stored in a storage account that you pay for. Job data is typically <1MB per job. 
> For more details, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Standard Subscription](#tab/tabid-standard)

The Standard Subcription is a monthly subscription plan available through queued access. 

|Pricing|  $125,000 (USD)/Month + Azure infrastructure costs |
|---|---|
|Includes access to | <ul><li>10k HQCs for use on the System Model H1 hardware</li><li>40k eHQCs for use on the H1 Emulator</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).

### [Premium Subscription](#tab/tabid-premium)
 
The Premium Subscription is a monthly subscription plan available through queued access.

| Pricing | $175,000 (USD)/Month + Azure infrastructure costs |
|---|---| 
|Includes access to | <ul><li>17k HQCs for use on System Model H1 hardware</li><li>100k eHQCs for use on the H1 Emulator</li></ul>|

For more information about Azure infrastructure costs, see [Azure Blob Storage pricing](https://azure.microsoft.com/pricing/details/storage/blobs/).
***


