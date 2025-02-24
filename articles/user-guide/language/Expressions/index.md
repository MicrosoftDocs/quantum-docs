---
author: bradben
description: Learn about the different types of expressions in the Q# programming language.
ms.author: brbenefield
ms.date: 02/18/2025
ms.service: azure-quantum
ms.subservice: qsharp-guide
ms.topic: reference
no-loc: ['Q#', '$$v']
title: Expressions in Q# - operators, combinators, & modifiers
uid: microsoft.quantum.qsharp.expressions-overview
---

# Expressions

At the core, Q# expressions are either [value literals](xref:microsoft.quantum.qsharp.valueliterals) or [identifiers](xref:microsoft.quantum.qsharp.expressions-overview#identifiers), where identifiers can refer to either locally declared variables or to globally declared callables (there are currently no global constants in Q#). 
Operators, combinators, and modifiers can be used to combine these identifiers into a wider variety of expressions. 

- *Operators* in a sense are nothing but dedicated syntax for particular callables. 
    >Even though Q# is not yet expressive enough to formally capture the capabilities of each operator in the form of a backing callable declaration, that should be remedied in the future. 

- *Modifiers* can only be applied to certain expressions. One or more modifiers can be applied to expressions that are either 
    - identifiers
    - array item access expressions
    - named item access expressions
    - an expression within parenthesis which is the same as a single item tuple. For more information, see [singleton tuple equivalence](xref:microsoft.quantum.qsharp.singletontupleequivalence#singleton-tuple-equivalence)). 
They can either precede (prefix) the expression or follow (postfix) the expression. They are thus special unary operators that bind tighter than function or operation calls, but less tight than any kind of item access. 
Concretely, [functors](xref:microsoft.quantum.qsharp.functorapplication#functor-application) are prefix modifiers, whereas the [unwrap operator](xref:microsoft.quantum.qsharp.itemaccessexpression#item-access-for-user-defined-types) is a postfix modifier. 

- Function, operation, and item access calls can be seen as a special type of operator, similar to modifiers. The're all subject to the same restrictions regarding where they can be applied; we refer to them as *combinators*. 

The section on [precedence and associativity](xref:microsoft.quantum.qsharp.precedenceandassociativity) contains a complete [list of all operators](xref:microsoft.quantum.qsharp.precedenceandassociativity#operators) as well as a complete [list of all modifiers and combinators](xref:microsoft.quantum.qsharp.precedenceandassociativity#modifiers-and-combinators). 






