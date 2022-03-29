## IonQ 

[IonQ](https://ionq.com/) charges based on the number of gates in your program, the complexity of the gates you use, and the number of shots. These units are called *gate-shots*.

Every quantum program consists of $N$ logical gates of one or more qubits, and is executed for a certain number of shots. The number of gate-shots is calculated by 
multiplying the number of one- or two-qubit gates submitted with the number of execution shots requested. 

Multi-controlled two-qubit gates are billed as 6 * (N - 2) two-qubit gates, where N is the number of qubits involved in the gate. For example, a NOT gate with three controls would be billed as (6 * (4 - 2)) or 12 two-qubit gates. To learn more about IonQ and how gate-shots are calculated, visit [IonQ provider page](xref:microsoft.quantum.providers.ionq).

> [!NOTE]
> IonQ has $1 USD minimum cost to run a job on the IonQ QPU. For small jobs, you may notice that `Consumed Units` reported on the job cost estimation table are less than the `Billed Units` for this reason.

All new Azure Quantum customers benefit of a one-time $500 free Azure Quantum credits toward IonQ provider. Besides Azure Quantum credits, IonQ offers a **Pay-as-you-go** plan with no monthly subscription fees. 

### [Azure Quantum Credits](#tab/tabid-AQcredits)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. 

|Pricing | $0 per month + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
|Plus |<ul><li>1Q Gate Shot: $0.00003 1q gate shot deducted from your credits</li><li>2Q Gate Shot: $0.0003 2q gate shot deducted from your credits</li></ul>|

Minimum of $1 USD per program execution, deducted from your credits. 

> [!NOTE]
> Once you have consumed all the credits you need to switch to a different plan to continue using IonQ. Azure Quantum won’t start charging you once you reach your credit limit. 
 
### [Pay As You Go](#tab/tabid-paygo)

The Pay-as-you-go plan consists of *a la carte* access to trapped ion quantum computers and simulators, charged on a resource-usage model.  

|Pricing | $0 per month + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
|Plus |<ul><li>1Q Gate Shot: $0.00003 1q gate shot</li><li>2Q Gate Shot: $0.0003 2q gate shot</li></ul>|

Minimum of $1 USD per program execution.  

***


## Quantinuum 

[Quantinuum](https://www.quantinuum.com/) , powered by Honeywell, uses a credit system called *Honeywell Quantum Credits*. Each job you run consumes credits depending on the number of operations in the job, and the number of shots you run.

The following equation defines how circuits are translated into H1 Quantum Credits (HQCs):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

To learn more about Quantinuum and how H1 Quantum Credits are calculated, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.honeywell).

All new Azure customers benefit of a one-time $500 free credits toward Quantinuum provider. Besides Azure Quantum credits, Quantinuum provides two plans: **Standard Subscription** and **Premium Subscription**. 

### [Azure Quantum Credits](#tab/tabid-AQcreditsQ)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. 

|Pricing | Use is deducted from the Azure Quantum Credits based on the HQC equation described above |
|---|---|  
|Includes access to | <ul><li>40 H1 Quantum Credits (HQCs) for use on the System Model H1 hardware, powered by Honeywell</li><li>160 emulator credits (eHQCs) for use on the H1 Emulator</li></ul>|

> [!NOTE]
> Once you have consumed all the credits you need to explicitly switch to a different plan to continue using Quantinuum. Azure Quantum won’t start charging you once you reach your credit limit. 

### [Standard Subscription](#tab/tabid-standard)

The Standard Subcription is a monthly subscription plan available through queued access. 

|Pricing| $ 125,000 USD / Month + Azure infrastructure costs |
|---|---|
|Includes access to | <ul><li>10k H1 Quantum Credits (HQCs) for use on the System Model H1 hardware, powered by Honeywell</li><li>40k emulator credits (eHQCs) for use on the H1 Emulator</li></ul>|

### [Premium Subscription](#tab/tabid-premium)
 
The Premium Subscription is a monthly subscription plan available through queued access.

| Pricing |$ 175,000 USD / Month + Azure infrastructure costs |
|---|---| 
|Includes access to | <ul><li>17k H1 Quantum Credits (HQCs) for use on System Model H1 hardware, powered by Honeywell</li><li>100k emulator credits (eHQCs) for use on the H1 Emulator</li></ul>|
***


