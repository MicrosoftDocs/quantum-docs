## IonQ 

All new Azure customers benefit of a one-time $500 free credits toward [IonQ](https://ionq.com/) provider. You may also have been awarded a special grant with a larger amount of Azure Quantum Credits. See [Azure Quantum Credits program](https://aka.ms/aq/credits) for more details. 

Besides Azure Quantum credits, IonQ offers a **Pay-as-you-go** plan. 

### [Azure Quantum Credits](#tab/tabid-AQcredits)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. One you have consumed all the credits you need to switch to a different plan to continue using IonQ - Azure Quantum won’t start charging you once you reach your credit limit. 
 
|Pricing | $0 per month + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
|Plus |<ul><li>1Q Gate Shot: $0.00003 1q gate shot deducted from your credits</li><li>2Q Gate Shot: $0.0003 2q gate shot deducted from your credits</li></ul>|

Minimum of $1 USD per program execution, deducted from your credits. 

### [Pas as you go](#tab/tabid-paygo)

The Pay-as-you-go plan consists of *a la carte* access to trapped ion quantum computers and simulators, charged on a resource-usage model.  
Every quantum program consists of $N$ logical gates of one or more qubits, and is executed for a certain number of shots. We bill based on gate-shots, calculated by 
multiplying the number of one- or two-qubit gates submitted with the number of execution shots requested.  

Gates involving more than two qubits are billed as $6(N-2)$ two-qubit gates, where N is the number of qubits in the gate. For example, a NOT gate with three controls would 
be billed as 6(4-2) or 12 two-qubit gates.  

|Pricing | $0 per month + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
|Plus |<ul><li>1Q Gate Shot: $0.00003 1q gate shot</li><li>2Q Gate Shot: $0.0003 2q gate shot</li></ul>|

Minimum of $1 USD per program execution.  

***

If you want to learn more about how IonQ Qubit-Gate-Shots are calculated, visit the [IonQ provider page](xref:microsoft.quantum.providers.ionq)

## Quantinuum 

All new Azure customers benefit of a one-time $500 free credits toward [Quantinuum](https://www.quantinuum.com/) provider, which corresponds to 40 hardware H1 Quantum Credits and 160 emulator H1 Quantum Credits. 

You may also have been awarded a special grant with larger amount of Azure Quantum Credits. See [Azure Quantum Credits program](https://aka.ms/aq/credits) for more details. 

The following equation defines how circuits are translated into H1 Quantum Credits (HQCs):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

Besides Azure Quantum credits, Quantinuum provides two plans: **Standard Subscription** and **Premium Subscription**. 

### [Azure Quantum Credits](#tab/tabid-AQcreditsQ)

Azure Quantum Credits consumption is based on a resource-usage model and cost of use is deducted from your credits. One you have consumed all the credits you need to explicitly switch to a different plan to continue using Quantinuum. Azure Quantum won’t start charging you once you reach your credit limit. 

|Pricing | Use is deducted from the Azure Quantum Credits based on the HQC equation described above |
|---|---|  
|Includes access to | <ul><li>System Model H1 hardware</li><li>Emulator </li></ul>|

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

If you want to learn more about how H1 Quantum Credits are calculated, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.honeywell).
