---
author: guenp
ms.author:  v-guenp
ms.date: 02/28/2022
ms.service: azure-quantum
ms.subservice: qdk
ms.topic: include
---

## Select a target to run your program

To check your code before running it on actual quantum hardware, you can use one of the Quantinuum API Validators, `honeywell.hqs-lt-s1-apival`.

Add a new cell and create an object to represent the Quantinuum API validator target:

```python
# Get Quantinuum's API validator target:
apival_backend = provider.get_backend("quantinuum.hqs-lt-s1-apival")
```

## Run on the API validator 

To run your circuit on the API validator, add the following code which uses the `run` method of the target to submit your job, and then monitors the job status. 

```python
# Submit the circuit to run on Azure Quantum
job = apival_backend.run(circuit, count=100)
job_id = job.id()
print("Job id", job_id)

# Monitor job progress and wait until complete:
job_monitor(job)
```

The job status is displayed in realtime:

```output
Job id 89511b08-9691-11ec-be32-00155d00ae89
Job status: job is queued
Job status: job is actively running
Job status: job has successfully run
```

When the job has successfully run, get the job results and display them:

```python
# Get the job results:
result = job.result()
print(result)
```

```output
Result(backend_name='quantinuum.hqs-lt-s1-apival', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='89511b08-9691-11ec-be32-00155d00ae89', success=True, results=[ExperimentResult(shots=100, success=True, meas_level=2, data=ExperimentResultData(counts={'000': 100}, probabilities={'000': 1.0}), header=QobjExperimentHeader(name='Qiskit Sample - 3-qubit GHZ circuit'))])
```

Because this `result` type is an object native to the Qiskit package, you can use
Qiskit\'s `result.get_counts` and `plot_histogram` to visualize the
results. To make sure that all possible bitstring labels are represented,
add them to `counts`.

```python
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts)
```

```output
{'000': 100, '001': 0, '010': 0, '011': 0, '100': 0, '101': 0, '110': 0, '111': 0}
```

![Qiskit circuit result on Quantinuum API validator](../media/azure-quantum-qiskit-hw-result-1.png)

Looking at the histogram, you may notice that the random number generator returned 0 every time, which is not very random. This is because that, while the API Validator ensures that your code will run successfully on Quantinuum hardware, it also returns 0 for every quantum measurement. For a true random number generator, you need to run your circuit on quantum hardware.

## Estimate job cost

Before running a job on actual quantum hardware, or a [quantum processing unit](xref:microsoft.quantum.target-profiles) (QPU), you can estimate how much it will cost to run. 

First, get the list of available providers again:

```python
print("This workspace's targets:")
for backend in provider.backends():
    print("- " + backend.name())
```

```output
This workspace's targets:
- quantinuum.hqs-lt-s1
- quantinuum.hqs-lt-s1-apival
- quantinuum.hqs-lt-s2
- quantinuum.hqs-lt-s2-apival
- quantinuum.hqs-lt-s1-sim
- ionq.qpu
- ionq.simulator
```

Next, create an object to represent the [Quantinuum System Model H1, Powered by Honeywell](xref:microsoft.quantum.providers.honeywell#system-model-h1-powered-by-honeywell):

```python
qpu_backend = provider.get_backend("quantinuum.hqs-lt-s1")
```

To estimate the cost of running a job on the QPU, add and run a new cell using the `estimate_cost` method of the target:

```python
cost = qpu_backend.estimate_cost(circuit, count=100)

print(f"Estimated cost: {cost.estimated_total}")
```

```output
Estimated cost: 5.72
```

This displays the estimated cost in H-System Quantum Credits (HQCs).

For the most current pricing details, see [System Model H1, Powered by Honeywell](xref:microsoft.quantum.providers.honeywell#system-model-h1-powered-by-honeywell), or view pricing options in the **Providers** blade of your workspace. To see your current credit status and usage, select **Credits and quotas**.

## Run on a Quantinuum QPU 

After running successfully on the API validator and estimating the QPU cost, it's time to run your circuit on the hardware. 

> [!NOTE] 
> The time required to run a circuit on the QPU depends on current queue times. You can view the average queue time for a target by selecting the **Providers** blade of your workspace.

Use the same `run` method and operations that you used previously with the API Validator to submit and monitor your job:

```python
# Submit the circuit to run on Azure Quantum
job = qpu_backend.run(circuit, count=100)
job_id = job.id()
print("Job id", job_id)

# Monitor job progress and wait until complete:
job_monitor(job)
```

```output
Job id 48282d18-9c15-11ec-bfbd-00155d6373ba
Job Status: job has successfully run
```

When the job has successfully run, get the job results as before and display them in a histogram:

```python
result = job.result()
print(result)
counts = {format(n, "03b"): 0 for n in range(8)}
counts.update(result.get_counts(circuit))
print(counts)
plot_histogram(counts)
```

You can see that the results now are roughly divided between 0 and 1. 

```output
Result(backend_name='quantinuum.hqs-lt-s1', backend_version='1', qobj_id='Qiskit Sample - 3-qubit GHZ circuit', job_id='48282d18-9c15-11ec-bfbd-00155d6373ba', success=True, results=[ExperimentResult(shots=100, success=True, meas_level=2, data=ExperimentResultData(counts={'111': 53, '101': 1, '000': 46}, probabilities={'111': 0.53, '101': 0.01, '000': 0.46}), header=QobjExperimentHeader(name='Qiskit Sample - 3-qubit GHZ circuit'))])
{'000': 46, '001': 0, '010': 0, '011': 0, '100': 0, '101': 1, '110': 0, '111': 53}
```

![Qiskit circuit result on Quantinuum QPU](../media/azure-quantum-qiskit-hw-result-2.png)
