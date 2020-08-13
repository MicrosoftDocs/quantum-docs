import qsharp
import qsharp.azure
from Microsoft.Quantum.AzureSamples import SampleRandomNumber

# Simulate the operation locally
result = SampleRandomNumber.simulate(nQubits=3)
print(f'Local simulation result: {result}')

# Submit the operation to an Azure Quantum workspace
# NOTE: The "resourceId" parameter must be the resource ID of your Azure Quantum workspace,
#       which you can copy/paste from your Quantum Workspace page in Azure Portal.
qsharp.azure.connect(resourceId="/subscriptions/.../Microsoft.Quantum/Workspaces/your-workspace-name")
qsharp.azure.target("ionq.simulator")
result = qsharp.azure.execute(SampleRandomNumber, nQubits=3, shots=1000, jobName="Generate 3-bit random number")
print(f'Azure Quantum execution result: {result}')
