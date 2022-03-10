## IonQ 

[IONQ](https://ionq.com/) offers a **Pay-as-you-go** plan. It consist of *a la carte* access to trapped ion quantum computers and simulators, charged on a resource-usage model.  
Every quantum program consists of $N$ logical gates of one or more qubits, and is executed for a certain number of shots. We bill based on gate-shots, calculated by 
multiplying the number of one- or two-qubit gates submitted with the number of execution shots requested.  

Gates involving more than two qubits are billed as $6(N-2)$ two-qubit gates, where N is the number of qubits in the gate. For example, a NOT gate with three controls would 
be billed as 6(4-2) or 12 two-qubit gates.  

|Pricing | $0 per month + Azure infrastructure costs |
|---|---|  
|Includes access to | <ul><li>IonQ QPU</li><li>IonQ Simulator (free)</li></ul>|
|Plus |<ul><li>1Q Gate Shot: $0.00003 1q gate shot</li><li>2Q Gate Shot: $0.0003 2q gate shot</li></ul>|

Minimum of $1 USD per program execution.  

If you want to learn more about how IonQ Qubit-Gate-Shots are calculated, visit the [IonQ provider page](xref:microsoft.quantum.providers.ionq).

## Quantinuum 

The following equation defines how circuits are translated into H1 Quantum Credits (HQCs):

$$
HQC = 5 + C(N_{1q} + 10 N_{2q} + 5 N_m)/5000
$$

where:

- $N_{1q}$ is the number of one-qubit operations in a circuit.
- $N_{2q}$ is the number of native two-qubit operations in a circuit. Native gate is equivalent to CNOT up to several one-qubit gates.
- $N_{m}$ is the number of state preparation and measurement (SPAM) operations in a circuit including initial implicit state preparation and any intermediate and final measurements and state resets.
- $C$ is the shot count.

Quantinuum provides two plans: Standard Subscription and Premium Subscription.

### [Standard Subscription](#tab/tabid-standard)

The Standard Subcription is a monthly subscription plan with 10k H1 Quantum Credits (HQCs) for use on the System Model H1 hardware, 
powered by Honeywell and 40k emulator credits (eHQCs) for use on the H1 Emulator / month, available through queued access. 

|Pricing| $ 125,000 USD / Month + Azure infrastructure costs |
|---|---|

If you want to learn more about how H1 Quantum Credits are calculated, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.honeywell).
### [Premium Subscription](#tab/tabid-premium)
 
The Premium Subscription is a monthly subscription plan with 17k H1 Quantum Credits (HQCs) for use on System Model H1 hardware, 
powered by Honeywell and 100k emulator credits (eHQCs) for use on the H1 Emulator / month, available through queued access.

| Pricing |$ 175,000 USD / Month + Azure infrastructure costs |
|---|---| 

***

If you want to learn more about how H1 Quantum Credits are calculated, visit the [Quantinuum provider page](xref:microsoft.quantum.providers.honeywell).
