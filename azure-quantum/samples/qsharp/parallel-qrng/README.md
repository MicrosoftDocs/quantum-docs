# Parallel quantum random number generator (QRNG)

This sample demonstrates how to use Q# and Azure Quantum together to build a quantum random number generator (QRNG).
In particular, this sample uses a register of qubits rather than a single qubit to draw random numbers several bits at a time, avoiding the need for intermediate measurement.

This sample is implemented as a _standalone executable_, such that no C# or Python host is needed.
The program takes one command-line option, `--n-qubits`, to control the number of qubits used to sample a random number.

## Running the sample on a local simulator

```dotnetcli
dotnet run -- --simulator QuantumSimulator --n-qubits=4
```

## Running the sample on Azure Quantum

Make sure that you have [created and selected a quantum workspace](../../../docs/Guides/Creating-an-Azure-Quantum-Workspace.md), and then run the following at the command line:

```azcli
az quantum execute --target-id ionq.simulator -- --n-qubits=4
```
