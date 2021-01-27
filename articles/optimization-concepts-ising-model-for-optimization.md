---
title: Ising Model
description: This document describes the Ising model and its use in formulating optimization problems.
author: andrist
ms.author: ruandris
ms.date: 1/13/2021
ms.topic: article
uid: microsoft.quantum.optimization.concepts.ising-model
---

# Ising Model

In statistical mechanics, the *Ising model* is a simplified representation of
the interaction between individual magnetic moments in a ferromagnetic
substance (for example, a fridge magnet). These moments, called *spins*, are presumed to
point either "up" ($+1$) or "down" ($-1$) and interact with other spins
depending on their relative position.

![2D Ising model states at different temperatures](~/media/optimization-ising-model.png)

The behavior of such a magnetic material is temperature-dependent:

1. At high temperature, thermal excitations cause the spins to readily
   change orientation and there is little organization in the system.
2. As the temperature decreases, lower-energy states are favored. These
   are attained when neighboring spins agree, causing small aligned domains to
   form.
3. Once this alignment translates to a substantial part of the system, the
   individual moments add up to an overall magnetic field.

## Ising Hamiltonian

The energy of an Ising system is described by the *Hamiltonian*

$$ \mathcal{H} = -\sum_{\langle i,j\rangle} J \sigma_i\sigma_j, $$

where $\sigma_i \in \\{\pm1\\}$ are the spin variables, the sum is over
interacting ("neighboring") spin pairs and $J>0$ is an interaction constant
(describing how strongly neighboring spins interact). For each pair of spins
which are aligned, we get a contribution of $-J$ to the overall energy.

> [!NOTE]
> The Ising Model has no disorder in the interaction; at low temperature
> all spins have a tendency to align with their respective neighbors and
> the lowest-energy state ("ground state") is attained when all spin
> variables have the same value (i.e, they are either all $+1$ or all $-1$).

## Dynamics of the System

The probability of finding statistical-mechanical system in a specific state is
given by the Boltzmann distribution. It depends on the energy of this state
(compared to that of all other possible states) and the temperature:

$$ p(\vec{\sigma}) = \frac{e^{-\mathcal{H}(\vec\sigma)/k_\mathrm{B}T}}{\sum_{\vec{s}}e^{-\mathcal{H}(\vec{s})/k_\mathrm{B}T}} \propto e^{-\mathcal{H}(\vec\sigma)/k_\mathrm{B}T},$$

where the normalizing sum in the denominator is over all states ("partition
function"), $k_\mathrm{B}$ is the Boltzmann constant (typically simplified to
$k_\mathrm{B}=1$ in theoretical models) and $T$ is the current temperature (often
expressed as the inverse temperature $\beta = 1/T$).

> [!NOTE]
> For the purpose of optimization, the key detail to note is that for $T\to 0$
> ($\beta\to\infty$), the lowest-energy state dominates the sum and the chance
> of finding the system in this ground state tends to
> $p(\vec\sigma_{\mathrm{GS}})\to 1$.

## Disordered Ising Systems

While the (ferromagnetic) Ising model offers some interesting dynamics,
the system becomes more complex if the interaction constants $J$ are
allowed to be bond-dependent (i.e., we use a different constant for
each set of interacting spins).

$$ \mathcal{H} = -\sum_{\langle i,j\rangle} J_{ij} \sigma_i\sigma_j. $$

For these so-called *Ising Spin Glasses*,

* A term with $J_{ij}<0$ represents anti-ferromagnetic interaction: 
  Spins which favor anti-alignment (alternating $+1$ and $-1$ spin values).

* A selection of $J_{ij}$'s with different signs (and possibly magnitudes),
  along with the interaction graph, can lead to *competing interactions*:
  A situation where no spin-variable assignment satisfies all the bonds
  (this is known as *frustration*).

* When finding the ground state, the choice of *how* to assign variables
  with competing interactions can have a ripple effect accross the system
  (by changing how adjacent spins must be arranged, in turn impacting
  their respective neighbors).

As a result, finding the ground state is much more challenging in these
complex systems.
