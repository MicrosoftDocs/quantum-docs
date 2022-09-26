---
author: bradben
ms.author: brbenefield
ms.date: 09/26/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Define a simple circuit

Next, create a simple Cirq circuit to run. This circuit uses the square
root of X gate, native to the IonQ hardware system.

```python
import cirq

q0, q1 = cirq.LineQubit.range(2)
circuit = cirq.Circuit(
    cirq.X(q0)**0.5,             # Square root of X
    cirq.CX(q0, q1),              # CNOT
    cirq.measure(q0, q1, key='b') # Measure both qubits
)
print(circuit)
```

```output
0: ───X^0.5───@───M────────
              │   │
1: ───────────X───M────────
```

## List all targets

[!INCLUDE [Quantinuum target name update](includes/quantinuum-name-change.md)]

You can now list all the targets that you have access to, including the
current queue time and availability.

```python
print("This workspace's targets:")
for target in service.targets():
     print(target)
```

```output
This workspace's targets:
<Target name="quantinuum.qpu.h1-1", avg. queue time=0 s, Degraded>
<Target name="quantinuum.sim.h1-1sc", avg. queue time=1 s, Available>
<Target name="quantinuum.qpu.h1-2", avg. queue time=217300 s, Unavailable>
<Target name="quantinuum.sim.h1-2sc", avg. queue time=0 s, Available>
<Target name="quantinuum.sim.h1-1e", avg. queue time=40 s, Available>
<Target name="quantinuum.sim.h1-2e", avg. queue time=64 s, Available>
<Target name="ionq.qpu", avg. queue time=229 s, Available>
<Target name="ionq.simulator", avg. queue time=3 s, Available>
<Target name="ionq.qpu.aria-1", avg. queue time=1136774 s, Available>
```

## Select a target and run your program

To check your circuit before running it on actual quantum hardware, you can use the IonQ simulator, `ionq.simulator`.  

The following cell submits a job that runs the circuit with
100 shots, waits until the job is complete, and returns the results.

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.simulator"
)
```

This returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010
```

You can plot the results in a histogram:

```python
import pylab as pl

pl.hist(result.data)
pl.ylabel("Counts")
pl.xlabel("Result")
```

## Estimate job cost

Before running a job on actual quantum hardware, or a [quantum processing unit](xref:microsoft.quantum.target-profiles) (QPU), you can estimate how much it will cost to run. To estimate the cost of running a job on the QPU, you can use the `estimate_cost` method:

```python
cost = service.estimate_cost(
    program=circuit,
    repetitions=100,
    target="ionq.qpu"
)

print(f"Estimated cost: {cost.estimated_total}")
```

```output
Estimated cost: 1
```

This prints the estimated cost in USD.

For the most current pricing details, see [IonQ Pricing](xref:microsoft.quantum.providers.ionq#pricing), or view pricing options in the **Providers** blade of your workspace. To see your current credit status and usage, select **Credits and quotas**.

## Run on IonQ QPU

The previous job ran on the default simulator, `ionq.simulator`. However, you can also run it on IonQ's hardware processor, or [Quantum Processor Unit](xref:microsoft.quantum.target-profiles#quantum-processing-units-qpu-different-profiles) (QPU). To run on the IonQ QPU, provide `ionq.qpu` as the
`target` argument:

```python
result = service.run(
    program=circuit,
    repetitions=100,
    target="ionq.qpu",
    timeout_seconds=500 # Set timeout to accommodate queue time on QPU
)
```

> [!NOTE] 
> The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

Again, this returns a `cirq.Result` object.

```python
print(result)
```

```output
    b=1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010, 1001100101100001000011011101000011010100010111100011001000100100010000001110010010101110110000011010
```

## Asynchronous model using Jobs

For long-running circuits, it can be useful to run them asynchronously.
The `service.create_job` method returns a `Job` object, which you can use to
get the results after the job has run successfully.

```python
job = service.create_job(
    program=circuit,
    repetitions=100,
    target="ionq.simulator"
)
```

To check on the job status, use `job.status()`:

```python
print(job.status())
```

```output
'completed'
```

To wait for the job to complete and then get the results, use the blocking
call `job.results()`:

```python
result = job.results()
print(result)
```

```output
00: 0.5
11: 0.5
```

> [!NOTE]
> The `job.results()` function does not return a `cirq.Result` object. Instead it returns a result object that is specific to the IonQ simulator and uses
state probabilities instead of shot data.

```python
type(result)
```

```output
cirq_ionq.results.SimulatorResult
```

To convert this to a `cirq.Result` object, use `result.to_cirq_result()`:

```python
print(result.to_cirq_result())
```

```output
b=1110101111111110111000011101011111001100010000001011011101001111001111001101100111010000001100011100, 1110101111111110111000011101011111001100010000001011011101001111001111001101100111010000001100011100
```
