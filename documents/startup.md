## Foundation Step — Create the Project From Scratch

This step is responsible for creating the initial project foundation before feature development starts.

### Goal

Set up a clean, scalable, mobile-first React application with the correct architecture, tooling, and conventions from day one.

### Requirements

* Start the project **from scratch**.
* Use **React + TypeScript + Vite**.
* Use **Tailwind CSS** for styling.
* Use **React Router** for SPA routing.
* Use **Context API** for UI/shared state.
* Do **not** use `axios`.
* Use a safer alternative such as:

  * native `fetch`
  * or `ky`

Preferred option:

* `ky` for cleaner request handling and better extensibility
* fallback option: native `fetch` with a custom wrapper

### Reasoning

Avoid introducing `axios` into the foundation of the project.
The data access layer should be built on top of `fetch` or `ky` so the application starts with a lighter and more controlled HTTP approach.

---

## Step Ownership

### Step: Project Foundation / Bootstrap

This step should be treated as a dedicated responsibility.

### Responsibilities

1. Create the project
2. Install base dependencies
3. Configure styling
4. Configure routing
5. Configure app layout structure
6. Configure aliases/import paths
7. Configure linting/formatting
8. Configure the base folder architecture
9. Configure the initial providers
10. Configure a safe HTTP client abstraction without axios
11. Create starter screens and placeholder components
12. Ensure the project runs successfully

---

## Expected Bootstrap Stack

### Core

* React
* TypeScript
* Vite

### UI

* Tailwind CSS
* Lucide React

### Routing

* React Router

### Data fetching

* `ky` or native `fetch`

### Quality

* ESLint
* Prettier
* Type-safe aliases

Optional:

* Husky
* lint-staged
* React Error Boundary

---

## Expected Foundation Folder Structure

```text
src/
  app/
    layout/
    providers/
    router/
  features/
    golden-ball/
      components/
      context/
      data/
      hooks/
      pages/
      services/
      types/
      utils/
  shared/
    components/ui/
    hooks/
    utils/
    services/
    types/
  assets/
  styles/
  main.tsx
```

---

## Foundation Deliverables

The bootstrap step must deliver at least:

### 1. App initialization

* Vite project created with React + TypeScript
* Project runs locally

### 2. Styling setup

* Tailwind configured
* global styles initialized
* design tokens prepared

### 3. Router setup

* base router configured
* main route for winners page configured

### 4. Layout setup

* app shell created
* sidebar layout created
* responsive layout base ready

### 5. Provider setup

* `AppProviders.tsx`
* `GoldenBallProvider.tsx`

### 6. HTTP setup

* `apiClient.ts` using `ky` or `fetch`
* no axios in dependencies
* request abstraction isolated from UI

### 7. Starter feature setup

* `GoldenBallPage.tsx`
* `WinnerTable.tsx`
* `WinnerDetailsCard.tsx`
* mock winners data

### 8. Quality setup

* ESLint working
* Prettier working
* import aliases working

---

## Recommended HTTP Layer

### Preferred

Create a shared service such as:

```text
src/shared/services/apiClient.ts
```

### Rules

* Do not call `fetch` directly inside UI components.
* Keep request logic in `services/`.
* Return typed responses.
* Handle errors centrally.
* Prepare for future auth headers/interceptors-like behavior.

### Acceptable approaches

#### Option A — `ky`

Use `ky.create()` with shared configuration.

#### Option B — native `fetch`

Create a wrapper function for:

* base URL
* headers
* JSON parsing
* error handling
* timeouts if needed

---

## Suggested Bootstrap Tasks for Claude

### Task 1 — Create the app

* Initialize a Vite React TypeScript project
* Install dependencies
* Remove template boilerplate

### Task 2 — Configure Tailwind

* Install Tailwind
* Configure content paths
* Add base global styles
* Define color and spacing tokens aligned with the Golden Ball design

### Task 3 — Configure project architecture

* Create the base folder structure
* Create route, provider, and layout folders
* Create the initial Golden Ball feature module

### Task 4 — Configure routing

* Add React Router
* Create the main SPA route
* Connect route to `GoldenBallPage`

### Task 5 — Configure providers

* Create `AppProviders.tsx`
* Wire `GoldenBallProvider`
* Prepare the app for global UI state

### Task 6 — Configure data layer without axios

* Install `ky` or implement a fetch wrapper
* Create `apiClient.ts`
* Ensure all requests go through the abstraction layer

### Task 7 — Create app shell

* Build `MainLayout`
* Build sidebar
* Prepare mobile drawer behavior

### Task 8 — Create initial feature placeholders

* `WinnerTable`
* `WinnerRowCard`
* `WinnerDetailsCard`
* `SearchBar`
* mock data source

### Task 9 — Configure code quality tools

* ESLint
* Prettier
* import aliases
* optional pre-commit hooks

### Task 10 — Validate bootstrap

* Run the app
* Confirm route loads
* Confirm layout renders
* Confirm winnerTable placeholder renders correctly

---

## Foundation Acceptance Criteria

The foundation step is complete only if:

* the app is created from scratch
* the project runs successfully
* architecture folders are present
* Tailwind is configured
* routing is configured
* providers are configured
* `winnerTable` placeholder exists
* `WinnerDetailsCard` placeholder exists
* data fetching layer exists
* axios is not used
* HTTP logic is isolated from components
* linting and formatting are configured

---

## Important Rule for Claude

Before implementing feature details, always complete the **Project Foundation / Bootstrap** responsibility first.

No feature work should bypass the foundation setup.
The project must start with the right architecture, tooling, and data access decisions so the rest of development remains clean and scalable.
