# Example: Declaration Boundary Pattern

This example handles the "Migration Cascade" problem. You want to migrate `DomainService.ts` but it depends on `LegacyUtils.js`.

## Directory Structure

```text
src/
├── features/
│   └── DomainService.ts      <-- Migrating this (Target)
└── utils/
    ├── LegacyUtils.js        <-- Keeping this as JS
    └── LegacyUtils.d.ts      <-- Creating this (New)
```

## 1. The Legacy File (LegacyUtils.js)

We don't want to touch this file yet.

```javascript
// src/utils/LegacyUtils.js
export function calculateTax(amount, region) {
  if (region === "US") {
    return amount * 0.1;
  }
  return amount * 0.2;
}

export const TAX_RATE = 0.1;
```

## 2. The Type Declaration (LegacyUtils.d.ts)

Create this file in the same directory. This provides type info to TypeScript without changing the runtime.

```typescript
// src/utils/LegacyUtils.d.ts

// You can use 'any' if you want to be fast, but explicit types are better.
export declare function calculateTax(amount: number, region: string): number;

export declare const TAX_RATE: number;
```

## 3. The Migrated Consumer (DomainService.ts)

Now `DomainService.ts` can import `LegacyUtils` with full type safety.

```typescript
// src/features/DomainService.ts
import { calculateTax } from "../utils/LegacyUtils"; // TypeScript loads imports from .d.ts

export function createInvoice(total: number) {
  // TypeScript will error if args are wrong!
  // e.g. calculateTax("100", "US") -> Error: Argument of type 'string' is not assignable...

  const tax = calculateTax(total, "KR");
  return { total, tax };
}
```

## Benefits

1. **Isolation**: You don't have to migrate `LegacyUtils.js` to fix `DomainService.ts`.
2. **Safety**: `DomainService.ts` gets real type checking.
3. **Speed**: Creating a `.d.ts` is often faster than refactoring old JS code.
