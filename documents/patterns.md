# Component Patterns — Golden Ball Project

This document defines the **patterns and rules that all React components must follow** in this project.

The goal is to ensure:

* consistency
* scalability
* readability
* performance
* clean architecture

---

## Core Principle

All components must follow:

> **Single Responsibility + Composability + Predictable Structure**

Each component should:

* do one thing well
* be reusable when possible
* be easy to read and maintain

---

## Component Categories

All components must belong to one of these categories:

### 1. Feature Components

Located inside:

```text
features/<feature-name>/components/
```

Examples:

* `WinnerTable`
* `WinnerRowCard`
* `WinnerDetailsCard`

👉 These contain **business logic + UI**

---

### 2. Shared Components

Located inside:

```text
shared/components/ui/
```

Examples:

* `Button`
* `Input`
* `Modal`
* `Drawer`
* `Badge`

👉 These must be:

* reusable
* generic
* independent from business logic

---

### 3. Layout Components

Located inside:

```text
app/layout/
```

Examples:

* `MainLayout`
* `Sidebar`
* `MobileDrawer`

👉 These define app structure

---

## Standard Component Structure

Every component must follow this structure:

```tsx id="c1x2a3"
type Props = {
  // props definition
};

export function ComponentName(props: Props) {
  // hooks
  // derived state
  // handlers

  return (
    // JSX
  );
}
```

---

## File Naming Rules

* Use **PascalCase**
* File name must match component name

```text
WinnerTable.tsx
WinnerRowCard.tsx
WinnerDetailsCard.tsx
```

---

## Folder Organization

Each feature component can be organized like:

```text
components/
  WinnerTable.tsx
  WinnerRowCard.tsx
  WinnerDetailsCard.tsx
```

For complex components:

```text
WinnerTable/
  WinnerTable.tsx
  WinnerTable.types.ts
  WinnerTable.utils.ts
```

---

## Props Design Rules

### 1. Strong typing (TypeScript required)

```ts id="p2x9k1"
type Winner = {
  id: number;
  name: string;
  goals: number;
  assists: number;
  country: string;
  yearWinner: number;
  image: string;
};
```
---

### 2. Keep props minimal

Only pass what is necessary.

❌ Avoid:

```tsx id="bad1"
<WinnerRowCard winner={winner} context={context} globalState={...} />
```

✅ Prefer:

```tsx id="good1"
<WinnerRowCard
  winner={winner}
  onSelect={handleSelect}
  isSelected={isSelected}
/>
```

---

### 3. Avoid prop drilling (use Context when needed)

---

## State Management Rules

### Use local state when:

* state is UI-specific
* state is not shared

### Use Context when:

* state is shared across multiple components
* example:

  * selected winner
  * modal open state
  * filters/search

---

## Component Responsibilities

### `WinnerTable`

* orchestrates list rendering
* maps winners → row cards
* handles selection logic

---

### `WinnerRowCard`

* renders a single winner
* displays:

  * name
  * goals
  * assists
  * country
  * year
* exposes action (onClick)

---

### `WinnerDetailsCard`

* renders selected winner
* displays:

  * image
  * stats
  * metadata

---

## Composition Pattern (IMPORTANT)

Components must be composed instead of bloated.

```tsx id="comp1"
<WinnerRowCard>
  <Avatar />
  <WinnerInfo />
  <StatsRow />
  <ActionButton />
</WinnerRowCard>
```

---

## UI Pattern — Card-Based Table

All table-like structures must follow:

* card-based layout
* responsive transformation (row → stacked)
* consistent spacing and hierarchy

---

## Styling Rules

### Use Tailwind CSS

* no inline styles unless dynamic
* use design tokens (spacing, colors)

---

### Spacing System

* base: 8px
* common:

  * 8 / 12 / 16 / 24

---

### Visual Consistency

* rounded corners (16–24)
* soft shadows
* gold accent for selected state

---

## Interaction Patterns

### Click behavior

* entire card should be clickable
* action button is optional but recommended

---

### Selected state

* highlight card
* open/update details card

---

### Hover state (desktop)

* slight scale
* shadow increase

---

## Performance Rules

### Memoization

Use when needed:

```tsx id="memo1"
export const WinnerRowCard = React.memo(function WinnerRowCard(...) {
```

---

### Derived data

```tsx id="memo2"
const filteredWinners = useMemo(() => {
  return winners.filter(...);
}, [winners, search]);
```

---

### Handlers

```tsx id="memo3"
const handleSelect = useCallback((winner) => {
  setSelectedWinner(winner);
}, []);
```

---

## Conditional Rendering Pattern

```tsx id="cond1"
{selectedWinner && (
  <WinnerDetailsCard winner={selectedWinner} />
)}
```

---

## Accessibility (Required)

* all buttons must be accessible
* keyboard navigation supported
* add `aria-label` where needed

Example:

```tsx id="a11y1"
<button aria-label=\"View winner details\">
```

---

## Error & Empty States

Components must handle:

### Empty state

```tsx id="empty1"
if (!winners.length) {
  return <EmptyState message=\"No winners found\" />;
}
```

---

### Loading state

```tsx id="loading1"
if (isLoading) {
  return <SkeletonList />;
}
```

---

## Reusability Rules

Before creating a component:

Ask:

* can this be reused?
* does it belong to `shared`?

---

## Anti-Patterns (DO NOT DO)

❌ Huge components (300+ lines)
❌ Business logic inside UI components
❌ Direct API calls inside components
❌ Using `any`
❌ Deep prop drilling
❌ Tight coupling between features
❌ Global state misuse

---

## Testing Readiness

Components must be:

* deterministic
* easy to test
* not tightly coupled to external services

---

## Final Rule

Every component created must follow these patterns.

If a component violates:

* structure
* responsibility
* or separation of concerns

It must be refactored before merging.

Consistency is more important than personal preference.
