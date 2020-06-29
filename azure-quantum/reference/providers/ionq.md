IonQ is a quantum computing hardware and software company. They are developing a general-purpose trapped ion quantum computer and they are a provider of the Azure Quantum ecosystem.
- Publisher: [Microsoft](https://microsoft.com)
- Provider ID: `ionq`

# Targets

The following targets are available from this provider:
- [QPU: Trapped ion quantum device](#Tapped-Ion-Quantum-Device)
- [Simulator: IonQ quantum simulator](#IonQ-Quantum-Simulator)

## QPU: Trapped Ion Quantum Device

IonQ’s trapped ion quantum computers perform calculations by manipulating
charged atoms held in a vacuum with lasers. This target operates in a
**No control flow** profile, meaning that it can't use results from
qubit measurements to control the execution flow.

- Job type: `Q# Quantum Application`
- Data Format: ``
- Target ID: `ionq.qpu`

Billing information: **Free in Private Preview**

Monthly quota: **50 hours per month**

## IonQ Quantum Simulator

GPU-accelerated idealized simulator using the same gates IonQ provides on its quantum devices.
- Job type: `Q# Quantum Application`
- Data Format: ``
- Target ID: `ionq.simulator`

Billing information: **Free in Private Preview**

Monthly quota: **50 hours per month**