---
author: SoniaLopezBravo
description: Learn about quantum-inspired optimization and key terms
ms.author: sonialopez
ms.date: 10/11/2022
ms.service: azure-quantum
ms.subservice: optimization
ms.topic: overview
title: Introduction to quantum-inspired optimization
uid: microsoft.quantum.optimization.concepts.overview.introduction
---

# What is optimization?

Optimization is the process of finding the best solution to a problem from a set of possible options, given its desired outcome and constraints. 

The *best* solution can be defined in many ways: it could be the option with the lowest cost, the quickest runtime, or perhaps the lowest environmental impact. To keep things simple, *best* is usually defined as a [cost function](xref:microsoft.quantum.optimization.concepts.cost-function) to be minimized. If you wanted to maximize the cost function instead (for example, if you wanted to maximize energy output from a solar cell), all you would need to do is multiply the cost by negative one and then minimize it.

To learn more about optimization problems and the terminology, see [key concepts of optimization](xref:microsoft.quantum.optimization.concepts.overview.key-concepts).

Optimization is a class of computing problems that are primary candidates for running on quantum computers in the future, providing a quantum advantage over classical solutions. You can already implement optimization problems using Azure Quantum solvers that run on classical hardware in Azure today faster than many other classical optimization techniques.

## What is quantum-inspired optimization?

Simulating the quantum effects on classical computers has led to the development of new types of quantum solutions. **Quantum-Inspired Optimization algorithms** exploit some of the advantages of quantum computing on classical hardware, providing a speedup over traditional approaches.

Quantum-inspired algorithms are classical algorithms where you classically emulate the essential quantum phenomena that provide the speedup. There are many types of quantum-inspired algorithms, one commonly used algorithm is based on a computational model called **adiabatic quantum computing**, which consist of the following:

1. First, you prepare a system and initialize it to its *lowest energy state*.

2. Next, slowly transform that system into a more complex one that describes the problem you are trying to solve. The adiabatic model states that, as long as this transformation happens *slowly enough*, the system has time to adapt and will stay in that lowest energy configuration. When the transformations are done, you can solve the problem.

A good analogy of this is to imagine you have a glass of water. If you move that glass slowly across a table, the contents won't spill because the system has time to adapt to its new configuration. If you were to move the glass quickly however, the system has been forced to change too quickly, and you have water everywhere.

## Where can quantum-inspired optimization be applied?

Applying quantum-inspired optimization to real-world problems may offer businesses new insights or help lower costs by making their processes more efficient. Quantum-inspired optimization gives us the opportunity to:

- Find a solution faster than other optimization techniques for a fixed use case and fixed quality of solution.
- Find a higher quality solution than other optimization techniques for a fixed problem and fixed amount of time.
- Use a more realistic model than other optimization techniques by extending the problem to consider more variables.

> [!NOTE]
> Since quantum-inspired optimization methods are heuristics, they're not guaranteed to find the optimal solution, nor do they always outperform other optimization techniques. In reality, it depends on the problem, and discovering what makes quantum-inspired optimization perform better than other methods in some situations and not others is still an active area of research.

Here are the necessary conditions for quantum-inspired optimization to perform well, compared to other classical optimization algorithms:

- Optimization landscapes should be rugged but structured. Such landscapes occur frequently in real-world problems. For more information, see [Optimization landscapes](xref:microsoft.quantum.optimization.concepts.overview.key-concepts#optimization-landscapes).
- If the number of variables is small (for example, less than one hundred), simplistic algorithms are already sufficient. For problems that have hundreds of variables, quantum-inspired optimization has achieved improvement over previously used methods by orders of magnitude.
- Problem parameters that affect the chosen cost metric must be represented via the variables of a cost function. Express cost functions as polynomials over binary variables to obtain a [PUBO problem](xref:microsoft.quantum.optimization.concepts.binary-optimization).

## How does quantum-inspired optimization solve problems?

There exist several methods for finding the global minimum of a cost function, one of the most successful and commonly used heuristic is *simulated annealing*. A heuristic is a technique for finding an approximate solution, especially in situations where finding an exact solution can take too long. You can think of the technique as a random walk through the search space, where each *walker* creates a path through the optimization landscape.

In simulated annealing, the algorithm simulates a walker that, ideally, always moves downhill but can also take uphill moves with some non-zero probability. This creates the possibility for the walker to escape from local minima and then descend into deeper neighboring minima. The uphill moves are called *thermal jumps*. That is because simulated annealing is an algorithm from physics that mimics the behavior of materials as they are slowly cooled.

Quantum-inspired optimization makes use of the techniques for solving combinatorial problems of simulated annealing but applying quantum mechanical effects. 

*Quantum annealing* is a quantum algorithm that is similar in spirit to simulated annealing, but it differs in a few ways. In simulated annealing, the search space is explored by making thermal jumps from one solution to the next, while quantum annealing makes use of a quantum effect called *quantum tunneling*, which allows the walker to travel through these energy barriers.

 :::image type="content" source="media/quantum-annealing.png" alt-text="Quantum Annealing":::

In this graph, you can see the difference between the classical and the quantum approach. In simulated annealing thermal fluctuations help a walker overcome an energy barrier, and in quantum tunneling, quantum effects allow a walker to pass through the energy barrier.

## Azure Quantum optimization techniques

Once you have created your optimization problem, you can submit it to one of the quantum-inspired optimization solvers in Azure Quantum. See [How to submit optimization jobs](xref:microsoft.quantum.submit-jobs-optimization).

Azure Quantum offers a range of quantum-inspired techniques to solve discrete and combinatorial optimization problems. However, it is not possible to determine which solver will perform best for a new optimization problem. You can explore the specifications of each target to develop your strategy, and in [Which optimization solver should I use?](xref:microsoft.quantum.optimization.choose-solver). article you can find some guidelines to find a suitable solver by benchmarking. 

For optimization solutions, these are the available providers you can choose from:

- [Microsoft QIO](xref:microsoft.quantum.optimization.providers.microsoft.qio): A set of multiple targets that rephrase the optimization problem inspired by decades of quantum research.
- [1QBit](xref:microsoft.quantum.providers.optimization.1qbit): Iterative heuristic algorithms that use search techniques to solve QUBO problems.
- [Toshiba SQBM+](xref:microsoft.quantum.providers.optimization.toshiba): Toshiba Simulated Quantum Bifurcation Machine is a GPU-powered ISING machine that solves large-scale combinatorial optimization problems at high speed.

### Microsoft QIO targets

The Microsoft QIO provider is enabled in every Azure Quantum workspace. Microsoft QIO offers a diverse set of targets for each type of optimization scenario.

- [**Parallel Tempering**](xref:microsoft.quantum.optimization.parallel-tempering): A related classical optimization approach, where copies of a system are kept at different temperatures, automating the repeated heating and cooling in tempering approaches. It can be used to accelerate both classical and (simulated) quantum annealing, as well as many other heuristics. 
- [**Simulated Annealing**](xref:microsoft.quantum.optimization.simulated-annealing): A classical stochastic simulation method that mimics the slow cooling of a material (annealing) to remove imperfections. A temperature is reduced according to a schedule. Thermal hops assist in escaping from local minima in the search space. 
- [**Population Annealing**](xref:microsoft.quantum.optimization.population-annealing): Just as Simulated Annealing simulates a walker that, ideally, always moves downhill, Population Annealing simulates a population of *metropolis walkers*, which continuously consolidate search efforts around favorable states.
- [**Quantum Monte Carlo**](xref:microsoft.quantum.optimization.quantum-monte-carlo): A quantum-inspired optimization that mimics the quantum annealing method by using quantum Monte-Carlo simulations. Analogous to the temperature in simulated annealing, the quantum tunneling strength is reduced over time. Quantum tunneling effects assist in escaping from local minima in the search space.
- [**Substochastic Monte Carlo**](xref:microsoft.quantum.optimization.substochastic-monte-carlo): Substochastic Monte Carlo is a diffusion Monte Carlo algorithm inspired by adiabatic quantum computation. It simulates the diffusion of a population of walkers in the search space, where walkers are removed or duplicated based on how they perform according to the cost function.
- [**Tabu Search**](xref:microsoft.quantum.optimization.tabu): Tabu Search looks at neighboring configurations. It can accept worsening moves if no improving moves are available and prohibits moves to previously visited solutions

Note that this is only a small subset of available techniques, and Microsoft continues to develop and add new solvers to the Azure Quantum service.  For more information, see the [Microsoft QIO target list](xref:microsoft.quantum.optimization.providers.microsoft.qio).
