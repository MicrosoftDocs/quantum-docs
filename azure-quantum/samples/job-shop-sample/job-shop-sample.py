#!/usr/bin/env python
# coding: utf-8

# Job Shop Scheduling Sample

from typing import List
from azure.quantum.optimization import Term, Problem, ProblemType, SimulatedAnnealing
from azure.quantum import Workspace

#region Constraint definitions
def precedence_constraint(n: int, o:int, T:int, p:List[int], w:float):
    """
    Construct penalty terms for the precedence constraint.

    Keyword arguments:
    
    n (int): Total number of jobs
    o (int): Number of operations per job
    T (int): Time allowed to complete all operations
    p (List[int]): List of job processing times
    w (float): Relative weight of this constraint
    """
    
    terms = []
    j = 0

    # Loop through all jobs:
    while(j < n):
        # Loop through all operations in this job:
        for i in range(j, j + o - 1):
            # Loop through simulation time:
            for t in range(0, T):
                # Loop over times that would violate the constraint:
                for s in range(0, t + p[i]):
                    # Assign penalty
                    terms.append(Term(w = w*1, indices = [i*T+t, (i+1)*T+s]))
        j = j + o
    return terms

def operation_once_constraint(n: int, o: int, T:int, w:float):
    """
    Construct penalty terms for the operation once constraint.
    Penalty function is of form: x^2 + y^2 + 2xy - 2x - 2y + 1
    
    Keyword arguments:
    
    n (int): Total number of jobs
    o (int): Number of operations per job
    T (int): Time allowed to complete all operations
    w (float): Relative weight of this constraint
    """
    
    terms = []
    
    # x^2 + y^2 + 2xy - 2x - 2y parts of the constraint function
    # Loop through all operations
    for i in range(n*o):
        for t in range(T):
            # x^2 + y^2 terms
            terms.append(Term(w=w*1, indices=[i*T+t, i*T+t]))

            # - 2x - 2y terms
            terms.append(Term(w=w*-2, indices=[i*T+t]))
            
            # + 2xy term
            # Loop through all other start times for the same job
            # to get the cross terms
            for s in range(t+1, T):
                terms.append(Term(w=w*2, indices=[i*T+t, i*T+s]))
    
    # + 1 term
    terms.append(Term(w=w*1, indices=[]))
    
    return terms

def no_overlap_constraint(n:int, T:int, p:List[int], w:float, ops_machines_map:List[List[int]]):
    """
    Construct penalty terms for the no overlap constraint.

    Keyword arguments:
    
    n (int): Total number of jobs
    T (int): Time allowed to complete all operations
    p (List[int]): List of job processing times
    w (float): Relative weight of this constraint (the coefficient)
    ops_machine_map(List[List[int]]): Mapping of operations to machines, e.g.:
        ops_machines_map = [
            [0,1],          # Operations 0 & 1 assigned to machine 0
            [2,3]           # Operations 2 & 3 assigned to machine 1
        ]
    """
    
    terms = []
    
    # For each machine
    for m in range(len(ops_machines_map)):
        # Get operations assigned to this machine
        ops = ops_machines_map[m]

        # Loop over each operation i requiring this machine
        for i in range(len(ops)):
            # Loop over each other operation k requiring this machine 
            for k in range(len(ops)):
                # Loop over simulation time
                for t in range(T):
                    # When i != k (i.e. when we are scheduling two different operations)
                    if ops[i] != ops[k]:
                        # t = s i.e. two operations scheduled to start at the same time on the same machine
                        terms.append(Term(w = w*1, indices = [ops[i]*T+t, ops[k]*T+t]))
                    
                    # When i < k, add penalty when O_k starts before O_i has finished
                    if ops[i] < ops[k]:
                        for s in range(0, t + p[ops[i]] - 1):
                            terms.append(Term(w = w*1, indices = [ops[i]*T+t, ops[k]*T+s]))   
    return terms
#endregion

#region Utility functions for parsing results
def create_op_array(config: dict):
    """
    Create array from returned config dict.
    
    Keyword arguments:
    config (dictionary): config returned from solver
    """

    variables = []
    for key, val in config.items():
        variables.insert(int(key), val)
    return variables

def print_problem_details(n:int, o:int, p: List[int], ops_machines_map: List[List[int]]):
    """
    
    Print problem details e.g. operation runtimes and machine assignments.        
    
    Keyword arguments:
    n (int): Total number of jobs
    o (int): Number of operations per job
    p (List[int]): List of job processing times
    ops_machine_map(List[List[int]]): Mapping of operations to machines
    """

    job = 0
    jobs = []
    ops = []
    machines = []
    
    for i in range(o * n):
        jobs.append(job)
        ops.append(i)
        
        if (i + 1) % o == 0:
            job += 1        
    for i in range(len(ops_machines_map)):
        for j in range(len(ops_machines_map[i])):
            machines.insert(ops_machines_map[i][j], i)
    
    print(f"           Job ID: {jobs}")
    print(f"     Operation ID: {ops}")
    print(f"Operation runtime: {p}")
    print(f" Assigned machine: {machines}")
    print()
    
def split_array(T:int, array:List[int]):
    """
    Split array into rows representing the rows of our operation matrix.
        
    Keyword arguments:
    T (int): Time allowed to complete all operations
    array (List[int]): array of x_i,t values generated from config returned by solver
    """

    ops = []
    i = 0
    while i < len(array):
        x = array[i:i+T]
        ops.append(x)
        i = i + T
    return ops

def print_matrix(T:int, matrix:List[List[int]]):
    """
    Print final output matrix.        
    
    Keyword arguments:
    T (int): Time allowed to complete all operations
    matrix (List[List[int]]): Matrix of x_i,t values
    """

    labels = "    t:"
    for t in range(0, T):
        labels += f" {t}"
    print(labels)
    
    idx = 0
    for row in matrix:
        print("x_" + str(idx) + ",t: ", end="")
        print(" ".join(map(str,row)))
        idx += 1
    print()

def print_jobs(n:int, o:int, matrix:List[List[int]]):
    """
    Group operations into jobs & print.        
    
    Keyword arguments:
    n (int): Total number of jobs
    o (int): Number of operations per job
    matrix (List[List[int]]): Matrix of x_i,t values
    """

    i = 0
    jobs = []
    while i < o * n:
        x = []
        for j in range (i, i + o):
            try :
                index = matrix[j].index(1)
            except ValueError:
                index = -1
            x.append(index)
        jobs.append(x)
        i += o
    print(jobs)
#endregion

if __name__ == "__main__":
    #region Problem setup
    # Set problem parameters
    n = 3                   # Number of jobs
    o = 2                   # Number of operations per job
    p = [2,1,2,2,1,2]       # Processing time for each operation
    T = 5                   # Time we will allow for all jobs to complete

    # Six jobs, two machines
    ops_machines_map = [
        [0,1,4,5],          # Operations 0, 1, 4 and 5 are assigned to machine 0
        [2,3]               # Operations 2 and 3 are assigned to machine 1
    ]

    # Generate terms to submit to solver using penalty functions defined above
    # Assign penalty term weights:
    alpha = 0.6  # Precedence constraint
    beta = 0.2   # Operation once constraint
    gamma = 0.2  # No overlap constraint

    # Build terms:
    terms = []
    w1 = precedence_constraint(n, o, T, p, alpha)
    w2 = operation_once_constraint(n, o, T, beta)
    w3 = no_overlap_constraint(n, T, p, gamma, ops_machines_map)

    # Combine terms:
    terms = w1 + w2 + w3
    #endregion

    #region Submit problem to Azure Quantum Optimization solver
    # Workspace setup
    workspace = Workspace (
        subscription_id = "",  # Add your subscription_id
        resource_group = "",   # Add your resource_group
        name = ""              # Add your workspace name
    )

    print("Logging in to workspace")
    workspace.login()

    # Problem type is PUBO in this instance. We could also have chosen to represent our problem in Ising form.
    problem = Problem(name="Job shop sample", problem_type=ProblemType.pubo, terms=terms)

    # Provide details of our workspace, created at the beginning of this tutorial
    solver = SimulatedAnnealing(workspace, timeout = 100) # Timeout in seconds

    # Run job synchronously
    print("Submitting problem to solver:")
    result = solver.optimize(problem)
    config = result["configuration"]
    print()
    #endregion

    #region Parse results
    # Produce 1D array of x_i,t = 0, 1 representing when each operation starts
    op_array = create_op_array(config) 

    # Print config details:
    print(f"Config dict:\n{config}\n")
    print(f"Config array:\n{op_array}\n")

    # Print problem setup
    print_problem_details(n, o, p, ops_machines_map)

    # Print final operation matrix, using the returned config
    print("Operation matrix:")
    matrix = split_array(T, op_array) 
    print_matrix(T, matrix)

    # Find where each operation starts (when x_i,t = 1) and return the start time
    print("Operation start times (grouped into jobs):")
    print_jobs(n, o, matrix)
    print()
    #endregion