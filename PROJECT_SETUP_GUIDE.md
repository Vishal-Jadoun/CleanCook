# CleanCook — Project Setup Guide (For All 3 Members)

> **Read this FIRST before starting any coding.**  
> This guide explains how the project is set up, how Git branching works, and how to merge your work together.

---

## Step 0 — Make Sure These Are Installed

Before anything, every member should have:

| Tool | Check Command (run in terminal) | Download Link |
|------|--------------------------------|---------------|
| Node.js (v18+) | `node --version` | https://nodejs.org |
| npm | `npm --version` | Comes with Node.js |
| Git | `git --version` | https://git-scm.com |
| VS Code | Just open it | https://code.visualstudio.com |

**VS Code Extensions to install (all 3 members):**
- ES7+ React/Redux/React Native snippets
- Prettier - Code formatter
- Auto Rename Tag
- Live Server (optional, for quick HTML testing)

---

## Step 1 — Vishal Creates the Project & Pushes to GitHub

> **Only Vishal does this. Addy and Harnoor wait.**

### 1.1 Create the React project using Vite

Open your terminal in the folder where you want the project, then:

```bash
npm create vite@latest CleanCook -- --template react
cd CleanCook
npm install
npm install react-router-dom axios
```

### 1.2 Create the folder structure

Inside `src/`, create these folders:

```
src/
├── assets/            ← images, icons, logos
├── components/        ← reusable UI pieces (Navbar, Footer, RecipeCard, etc.)
│   ├── Navbar/
│   ├── Footer/
│   ├── RecipeCard/
│   ├── SearchBar/
│   ├── CategoryCard/
│   ├── NutritionWidget/
│   ├── PlannerSlot/
│   └── ShoppingItem/
├── pages/             ← full page components
│   ├── Home/
│   ├── Recipes/
│   ├── RecipeDetails/
│   ├── Login/
│   ├── Signup/
│   ├── Profile/
│   ├── Dashboard/
│   ├── Planner/
│   └── Shopping/
├── services/          ← API call functions (later in Eval 2)
├── context/           ← shared state (later in Eval 2)
├── hooks/             ← custom hooks (later in Eval 2)
├── data/              ← dummy JSON data for Eval 1
├── utils/             ← helper functions
├── styles/            ← global CSS, variables, shared styles
├── App.jsx
├── App.css
└── main.jsx
```

**Each component/page folder** should contain 2 files:
```
components/Navbar/
├── Navbar.jsx
└── Navbar.css
```

This keeps styles next to their component — easy to find, easy to debug.

### 1.3 Set up basic routing in App.jsx

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Import pages (create empty placeholder components first)
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Planner from './pages/Planner/Planner';
import Shopping from './pages/Shopping/Shopping';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/shopping" element={<Shopping />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
```

### 1.4 Create placeholder components for ALL pages

For every page, create a simple placeholder so routing works and nobody gets import errors:

```jsx
// Example: src/pages/Login/Login.jsx
function Login() {
  return (
    <section id="login-page" className="login-page">
      <h1>Login</h1>
      <p>Coming soon — owned by Addy</p>
    </section>
  );
}

export default Login;
```

Do this for all 9 pages. Each page should have a unique `id` and `className`.

### 1.5 Create dummy data files

Create `src/data/` with these starter files:

- `recipes.js` — array of 8-10 fake recipe objects
- `categories.js` — array of category names with images
- `mealPlan.js` — sample weekly plan object
- `shoppingList.js` — sample shopping list array

Example dummy recipe:
```js
// src/data/recipes.js
const dummyRecipes = [
  {
    id: "1",
    name: "Butter Chicken",
    category: "Chicken",
    area: "Indian",
    image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    tags: ["Curry", "Spicy"],
    ingredients: ["Chicken", "Butter", "Tomato", "Cream", "Spices"],
    instructions: "Cook the chicken with butter and spices..."
  },
  // ... add 8-10 more
];

export default dummyRecipes;
```

### 1.6 Set up global CSS variables

Create `src/styles/variables.css`:
```css
:root {
  /* Colors — pick a consistent palette */
  --color-primary: #2d6a4f;
  --color-primary-light: #52b788;
  --color-primary-dark: #1b4332;
  --color-secondary: #f77f00;
  --color-accent: #e63946;
  
  --color-bg: #fafafa;
  --color-bg-card: #ffffff;
  --color-text: #212529;
  --color-text-light: #6c757d;
  --color-border: #dee2e6;

  /* Typography */
  --font-main: 'Inter', 'Segoe UI', sans-serif;
  --font-heading: 'Outfit', 'Inter', sans-serif;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 50%;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.1);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.12);

  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
}
```

Import this in `main.jsx`:
```jsx
import './styles/variables.css';
import './App.css';
```

### 1.7 Add a `.gitignore` 

Vite creates one, but make sure it includes:
```
node_modules/
dist/
.env
.env.local
```

### 1.8 Push to GitHub

```bash
git init
git add .
git commit -m "initial project setup: Vite React, folder structure, routing, dummy data"
git branch -M main
git remote add origin https://github.com/Vishal-Jadoun/CleanCook.git
git push -u origin main
```

### 1.9 Invite Addy & Harnoor

Go to GitHub → your repo → Settings → Collaborators → Add Addy and Harnoor by their GitHub usernames.

---

## Step 2 — Addy & Harnoor Clone the Repo

> **Do this AFTER Vishal pushes.**

```bash
git clone https://github.com/Vishal-Jadoun/CleanCook.git
cd CleanCook
npm install
npm run dev
```

Open `http://localhost:5173` — you should see the app with routing working.

---

## Step 3 — The Branching Workflow (EVERYONE MUST FOLLOW THIS)

### Before starting any new feature:

```bash
# 1. Go to main and get the latest code
git checkout main
git pull origin main

# 2. Create a new branch for your feature
git checkout -b your-branch-name
# Examples:
#   git checkout -b vishal-navbar
#   git checkout -b addy-login
#   git checkout -b harnoor-planner
```

### While working on your feature:

```bash
# Save your work often
git add .
git commit -m "describe what you did"
# Examples:
#   git commit -m "add navbar layout with logo and nav links"
#   git commit -m "create login form with email and password fields"
#   git commit -m "build weekly planner grid for 7 days"
```

Commit **every time you finish a small piece**. Don't wait until the whole page is done.

### When your feature is ready:

```bash
# Push your branch to GitHub
git push origin your-branch-name
```

Then go to GitHub → you'll see a yellow banner saying "your-branch-name had recent pushes" → click **"Compare & pull request"** → write what you built → click **"Create pull request"**.

**Vishal reviews it** and clicks **"Merge pull request"**.

### After merge, everyone updates:

```bash
git checkout main
git pull origin main
```

Then create a new branch for your next feature.

---

## Step 4 — What To Do When You Get a Merge Conflict

It will happen. Don't panic.

1. Git will tell you which file has conflicts
2. Open that file — you'll see something like:

```
<<<<<<< HEAD
your code
=======
the other person's code
>>>>>>> branch-name
```

3. Decide which code to keep (or combine both)
4. Remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers
5. Save → `git add .` → `git commit -m "resolve merge conflict in FileName"`

**How to avoid most conflicts:**
- Don't edit files that belong to another member
- Each member works in their own folders (pages + components)
- Only `App.jsx`, `App.css`, and routing are shared — coordinate before editing those

---

## Step 5 — Naming Rules (Follow These Strictly)

### Files & Folders
- Components: **PascalCase** → `Navbar.jsx`, `RecipeCard.jsx`
- CSS files: **Same name as component** → `Navbar.css`, `RecipeCard.css`
- Pages: **PascalCase folder** → `pages/Home/Home.jsx`
- Data files: **camelCase** → `recipes.js`, `mealPlan.js`

### CSS Classes
- Use **kebab-case** → `recipe-card`, `nav-links`, `planner-grid`
- Prefix with component name → `navbar-logo`, `recipe-card-image`, `planner-day-slot`

### HTML IDs
- Every interactive element needs a **unique, descriptive ID**
- Format: `section-element` → `navbar-search-input`, `login-email-input`, `planner-monday-breakfast`

### JSX / React
- Components: **PascalCase** → `<RecipeCard />`, `<SearchBar />`
- Props: **camelCase** → `recipeName`, `onSearch`, `isLoading`
- Event handlers: **start with handle** → `handleSearch`, `handleLogin`, `handleDragDrop`

---

## Step 6 — Common Mistakes to Avoid

| ❌ Don't Do This | ✅ Do This Instead |
|-------------------|---------------------|
| Write all CSS in one big file | One CSS file per component |
| Use `<div>` for everything | Use `<section>`, `<nav>`, `<main>`, `<article>`, `<header>`, `<footer>` |
| Skip giving IDs to interactive elements | Every button, input, form gets a unique `id` |
| Copy-paste the same card 10 times | Make one `<RecipeCard />` component, use `.map()` |
| Commit with message "update" or "fix" | Write what you actually did: "add search bar with filter dropdown" |
| Push broken code to main | Test locally first, push to your branch, then merge |
| Edit someone else's component files | Talk to them first, or only edit your own files |

---

## Step 7 — Coordination Schedule

| When | What Happens |
|------|-------------|
| **End of Day 2** | Vishal pushes project setup. Addy & Harnoor clone and verify. |
| **End of Day 5** | Everyone pushes their first feature branch. Do a team merge session. |
| **End of Day 10** | All pages should have at least basic UI. Second merge session. |
| **End of Day 14** | Everything merged, polished, and presentation-ready. |
| **Day 15-16** | Practice the demo together. Prepare slides. |

---

## Quick Reference — Who Owns Which Files

| Member | Pages (in `pages/`) | Components (in `components/`) |
|--------|---------------------|-------------------------------|
| **Vishal** | `Home/`, `Recipes/`, `RecipeDetails/` | `Navbar/`, `Footer/`, `RecipeCard/`, `SearchBar/`, `CategoryCard/` |
| **Addy** | `Login/`, `Signup/`, `Profile/`, `Dashboard/` | `NutritionWidget/`, `FavoritesCard/`, `ProfileCard/`, `BMICalculator/` |
| **Harnoor** | `Planner/`, `Shopping/` | `PlannerSlot/`, `ShoppingItem/`, `MealCard/`, `DayColumn/` |
| **Shared** | — | `App.jsx` (coordinate before editing) |

---

**Now go read your individual roadmap file:**
- Vishal → `ROADMAP_VISHAL.md`
- Addy → `ROADMAP_ADDY.md`
- Harnoor → `ROADMAP_HARNOOR.md`
