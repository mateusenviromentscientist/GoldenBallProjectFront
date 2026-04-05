# Golden Ball Project — Claude Instructions

## Objective

Build a **mobile-first React SPA** for the **Golden Ball** project.

The application must present a **winnerTable** as the **core component** of the screen.
This component is the center of the experience and must display Golden Ball winners using a **card-based table layout**, not a traditional HTML table look.

Each winner item must contain an **action** that opens or reveals a **details card** for that specific winner.

---

## Main UX Direction

* Use a **mobile-first layout**.
* Keep the UI modern, clean, and visual.
* The design should feel like a **single-page app dashboard**.
* The **sidebar** should contain a navigation link to the winners view.
* The winners view must be driven by the **winnerTable** component.
* Even on desktop, the table should visually behave like a **list of cards**.
* On mobile, the layout should stack naturally and remain easy to scan.

---

## Core Component

### `winnerTable`

This is the most important component in the project.

It must:

* Render the list of Golden Ball winners.
* Be visually styled as **cards arranged like a table/list**.
* Show the following winner data:

  * `Name`
  * `Goals`
  * `Assists`
  * `Country`
  * `Year`
* Include an **action control** for each winner.
* When the action is triggered, show a **winner details card** for that specific row/card.

### Expected behavior

* Only one winner card needs to be selected at a time.
* Clicking the action should update the selected winner.
* The selected winner should appear in a prominent details card.
* The selected row/card can also have a visual selected state.

---

## Winner Details Card

The winner details card must show:

* Winner picture
* Winner name
* Goals with icon
* Assists with icon
* Country represented with a flag icon or emoji flag
* Year

### Interaction model

* On mobile: show as a bottom sheet, stacked card, or prominent section below the list.
* On desktop: show as a side panel, modal, or adjacent details card.
* The transition between selection states should feel smooth and intuitive.

---

## Layout

### Sidebar

The sidebar must contain:

* Project title: `Golden Ball`
* One navigation link to the winners view

Example:

* `Winners Table`

### Main content area

The content area should include:

* Page title
* Optional search/filter input
* `winnerTable`
* Selected winner details card

---

## Design Rules

### Visual style

* Modern
* Clean
* Card-based
* Mobile-first
* Consistent spacing
* Soft radius corners
* Dashboard feel

### Responsive behavior

#### Mobile

* Prioritize vertical stacking
* Winner rows become stacked cards
* Details card appears below the list or as a bottom sheet

#### Desktop

* Sidebar stays visible
* Winner cards can align horizontally inside each row
* Details card can appear beside the list

---

## Recommended React Architecture

Use a **feature-based architecture**.

```text
src/
  app/
    layout/
    providers/
    router/
  features/
    golden-ball/
      components/
        WinnerTable.tsx
        WinnerRowCard.tsx
        WinnerDetailsCard.tsx
        SearchBar.tsx
      context/
        GoldenBallContext.tsx
        GoldenBallProvider.tsx
        useGoldenBallContext.ts
      data/
        winners.ts
      hooks/
        useWinnerTable.ts
      pages/
        GoldenBallPage.tsx
      types/
        winner.ts
      utils/
        filters.ts
  shared/
    components/ui/
    hooks/
    utils/
  assets/
  styles/
```

---

## State Management

Use **Context API** for UI and selection state.

Suggested state:

* winners list
* search term
* selected winner
* open/closed state of details card if needed

Example responsibilities:

* `WinnerTable` handles rendering the winner rows/cards
* `WinnerRowCard` renders one winner in card-table style
* `WinnerDetailsCard` renders the selected winner profile/details
* Context stores the selected winner and related actions

---

## Required Components

### `WinnerTable`

The main list/table component.

Responsibilities:

* Render all winners
* Pass row data into child row cards
* Trigger selection
* Maintain table/card consistency

### `WinnerRowCard`

Represents one row inside the winnerTable.

Must display:

* Name
* Goals
* Assists
* Country
* Year
* Action button

Action examples:

* `View Card`
* `Show Details`
* icon button

### `WinnerDetailsCard`

Displays selected winner details.

Must display:

* Image
* Name
* Goals icon + value
* Assists icon + value
* Flag + country
* Year

---

## Functional Requirements

1. The screen must load a winners dataset.
2. The `winnerTable` must display all winners.
3. Each winner item must contain an action.
4. Clicking the action must show that winner’s details card.
5. The card content must update based on the selected winner.
6. The UI must remain responsive across mobile and desktop.

---

## Styling Guidance

Use:

* React
* TypeScript
* Tailwind CSS
* Lucide icons

Suggested styling direction:

* rounded cards
* strong hierarchy for winner name
* subtle metadata for country/year
* stat chips or stat pills for goals and assists
* gold accent color for selected state or branding

---

## Important Implementation Note

Do **not** treat the table as a classic dense grid.
The `winnerTable` should be implemented as a **card-based table/list hybrid**.

That means:

* semantically it represents the winners table
* visually it behaves like premium interactive cards
* each row should feel clickable and modern

---

## Final Priority

The **highest priority** is:

1. `winnerTable` as the main component
2. action per winner
3. selected winner details card
4. mobile-first responsive SPA layout

If tradeoffs are needed, preserve the clarity and quality of the `winnerTable` experience first.

---

## React Best Practices (Required)

### Code Splitting & Lazy Loading

* Use `React.lazy` and `Suspense` to lazy load routes and heavy components (e.g., `WinnerDetailsCard`).
* Split by **route** and **feature**.

Example:

```tsx
const GoldenBallPage = React.lazy(() => import("@/features/golden-ball/pages/GoldenBallPage"));

<Suspense fallback={<Loading />}> 
  <GoldenBallPage />
</Suspense>
```

* Lazy load images using `loading="lazy"` and consider intersection observers for advanced cases.

### Performance

* Memoize expensive components with `React.memo`.
* Use `useMemo` for derived data (e.g., filtered winners).
* Use `useCallback` for handlers passed to children.
* Avoid unnecessary re-renders by keeping state minimal and colocated.

### State Management

* Keep **server data** and **UI state** separated.
* Use Context API only for:

  * selected winner
  * UI state (open/close card)
  * filters/search
* Avoid putting large datasets or frequently updating values in Context.

### Component Design

* Keep components **small and focused**.
* Prefer composition over inheritance.
* One responsibility per component:

  * `WinnerTable` → list orchestration
  * `WinnerRowCard` → single row
  * `WinnerDetailsCard` → selected details

### Folder & Import Hygiene

* Use absolute imports (e.g., `@/features/...`).
* Keep feature boundaries strict (no cross-feature leakage).
* Avoid deep relative paths (`../../../`).

### Accessibility (a11y)

* Ensure all interactive elements are keyboard accessible.
* Add `aria-label` to action buttons.
* Use semantic HTML where possible.
* Ensure sufficient color contrast.

### Styling

* Prefer utility-first approach (e.g., Tailwind CSS).
* Keep styles consistent via tokens (spacing, colors, radius).
* Avoid inline styles unless dynamic.

### UX & Feedback

* Provide loading states (skeletons or spinners).
* Provide empty states (no results found).
* Provide error states when data fails.
* Add subtle transitions for card selection.

### Testing (Recommended)

* Unit test core components (`WinnerTable`, `WinnerRowCard`).
* Test interaction: clicking action opens correct card.
* Use React Testing Library.

### Type Safety

* Use TypeScript everywhere.
* Define strict types for `Winner`.
* Avoid `any`.

### Data Handling

* Normalize data shape in `data/` or `utils/`.
* Keep mapping logic out of UI components.

### Routing

* Use lazy-loaded routes.
* Keep routing in `app/router`.

### Error Boundaries

* Wrap main layout with an Error Boundary to prevent full app crashes.

### Image Optimization

* Use responsive images where possible.
* Compress assets and avoid large unoptimized images.

---

## Implementation Notes for Claude

* Prioritize **performance and UX** over unnecessary abstraction.
* Implement lazy loading from the beginning.
* Keep the `winnerTable` highly optimized and responsive.
* Ensure the action → details card flow is fast and smooth.
* Maintain strict separation between UI, state, and data layers.
