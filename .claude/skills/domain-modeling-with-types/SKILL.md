---
name: domain-modeling-with-types
description: Use when designing complex multi-step business logic, workflows with strict ordering, or when you need to ensure invalid states are impossible.
---

# Domain Modeling with Types

## Overview

This skill guides you in using TypeScript's type system to formally model business processes. Instead of writing imperative code with many `if/else` checks, we define the process as a series of type transformations (State A → State B).

**Core Principle:** **Make Illegal States Unrepresentable.**
If a user hasn't scanned a cart, they _cannot_ have a `CartScanned` type, so they _cannot_ call the `scanContainer` function.

## When to Use

- **Multi-step workflows** (e.g., Checkout, WMS Packing, Signup wizards)
- **Complex state machines** where order matters
- **High-reliability logic** where runtime errors must be minimized
- **Refactoring** tangled "spaghetti code" logic

## The Workflow

1.  **Define States**: Create types for every distinct step in the process.
2.  **Define Errors**: Create a Discriminated Union of all possible failures.
3.  **Define Signatures**: Write function signatures that transform `State(N)` → `Result<Error, State(N+1)>`.
4.  **Implement**: Write the code to satisfy the signatures.

## Pattern Structure

```typescript
// 1. Common Result Type (The "Either" Monad)
type Result<E, A> = { ok: true; value: A } | { ok: false; error: E };

// 2. The Data (State Snapshots)
type Step1 = { data: string };
type Step2 = Step1 & { moreData: number };

// 3. The Transformations (Business Logic)
type DoStep2 = (prev: Step1, input: number) => Result<ErrorType, Step2>;
```

## Benefits

- **Self-Documenting**: The type signatures _are_ the documentation of the business flow.
- **Compiler enforced**: You can't skip a step or pass wrong data.
- **Error Handling**: Changing the return type forces you to handle new errors everywhere.

## Examples

- **WMS Packing Process**: `examples/packing-process.ts` - A complete example of a warehouse packing flow.

## Common Mistakes

| Mistake                  | Reality                                                                                             |
| :----------------------- | :-------------------------------------------------------------------------------------------------- |
| **"Over-engineering"**   | For simple CRUD, this _is_ overkill. Use it for complex _processes_.                                |
| **Primitives Obsession** | Don't pass `string` everywhere. Use branded types or specific objects (e.g., `UserId` vs `string`). |
| **Implicit state**       | Don't hide state in side effects (database, global vars). Pass it explicitly in the types.          |
