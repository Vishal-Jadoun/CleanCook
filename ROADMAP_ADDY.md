# ROADMAP — Addy (Member 2: User & Nutrition Module)

> **Your Role:** You own the User & Nutrition module.  
> **Your Pages:** Login, Signup, Profile, Dashboard  
> **Your Components:** NutritionWidget, FavoritesCard, ProfileCard, BMICalculator  
> **Evaluation 1 Focus:** Static prototype with dummy data, clean UI, proper React structure  
> **Important:** NO Firebase, NO real authentication in Eval 1. Just the UI.

---

## YOUR RESPONSIBILITIES

You build everything related to the **user experience after login**:
- Login form UI
- Signup form UI
- User profile page
- Dashboard with nutrition widgets (BMI, Calories, Water Intake)
- Favorites display

For Eval 1, none of this needs to actually work (no real login). You're building a beautiful, functional-looking prototype with dummy data.

---

## BEFORE YOU START

### Step 0 — Wait for Vishal to set up the project

Vishal will:
1. Create the React project
2. Set up folder structure and routing
3. Push it to GitHub
4. Invite you as a collaborator

### Step 1 — Clone and verify

Once Vishal tells you the repo is ready:

```bash
git clone https://github.com/Vishal-Jadoun/CleanCook.git
cd CleanCook
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. You should see the app running with placeholder pages.

Click around — make sure routing works (Home, Recipes, Login, etc. should all show their placeholder text).

**If something doesn't work, tell Vishal before doing anything else.**

---

## PHASE 1: Login Page (Day 3–4)

**Branch:** `git checkout -b addy-login`

**Files to create/edit:**
- `src/pages/Login/Login.jsx`
- `src/pages/Login/Login.css`

### What the Login page should look like:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                     Welcome Back 👋                          │
│                 Log in to your account                       │
│                                                              │
│            ┌──────────────────────────────┐                  │
│            │  📧 Email                    │                  │
│            └──────────────────────────────┘                  │
│            ┌──────────────────────────────┐                  │
│            │  🔒 Password                 │                  │
│            └──────────────────────────────┘                  │
│                                                              │
│            ☐ Remember me     Forgot password?                │
│                                                              │
│            ┌──────────────────────────────┐                  │
│            │          LOG IN              │                  │
│            └──────────────────────────────┘                  │
│                                                              │
│            ─── or continue with ───                          │
│            [ Google ]   [ GitHub ]                            │
│                                                              │
│            Don't have an account? Sign up                    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Task 1.1 — Build the form structure

```jsx
// src/pages/Login/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // For Eval 1: just console.log or alert
    console.log('Login attempted:', email);
    alert('Login feature coming in Evaluation 2!');
  };

  return (
    <section id="login-page" className="login-page">
      <div className="login-container">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Log in to your account</p>

        <form id="login-form" className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              type="email"
              id="login-email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login-options">
            <label className="remember-me">
              <input type="checkbox" id="login-remember" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" id="login-submit-btn" className="login-btn">
            Log In
          </button>
        </form>

        <div className="login-divider">
          <span>or continue with</span>
        </div>

        <div className="social-login">
          <button id="login-google-btn" className="social-btn google-btn">Google</button>
          <button id="login-github-btn" className="social-btn github-btn">GitHub</button>
        </div>

        <p className="login-footer-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
```

Notice:
- Every input has an `id` and a `label` with `htmlFor`
- The form uses `onSubmit` with `e.preventDefault()`
- `useState` tracks email and password
- `onChange` updates state on every keystroke
- Links use React Router's `<Link>`, not `<a>`

### Task 1.2 — Style the Login page

In `Login.css`:
- Center the form container on the page: `display: flex; justify-content: center; align-items: center; min-height: calc(100vh - navbar-height);`
- Give the container a card look: white background, `border-radius: var(--radius-md)`, `box-shadow: var(--shadow-md)`
- Style inputs: full width, padding, border, border-radius, focus effect (`:focus { border-color: var(--color-primary); outline: none; }`)
- Login button: full width, primary color background, white text, hover darken
- Social buttons: bordered, icon on the left
- Divider line with "or" text in the middle: use a `::before` and `::after` pseudo-element trick or just a simple flexbox approach

**Commits:**
1. `create login page with form, email, password, and submit`
2. `style login page with centered card layout and form styling`
3. `add social login buttons and forgot password link`

---

## PHASE 2: Signup Page (Day 4–5)

**Branch:** `git checkout main` → `git pull` → `git checkout -b addy-signup`

**Files:**
- `src/pages/Signup/Signup.jsx`
- `src/pages/Signup/Signup.css`

### What the Signup page should look like:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    Create Account ✨                         │
│               Join CleanCook today                           │
│                                                              │
│            ┌──────────────────────────────┐                  │
│            │  👤 Full Name                │                  │
│            └──────────────────────────────┘                  │
│            ┌──────────────────────────────┐                  │
│            │  📧 Email                    │                  │
│            └──────────────────────────────┘                  │
│            ┌──────────────────────────────┐                  │
│            │  🔒 Password                 │                  │
│            └──────────────────────────────┘                  │
│            ┌──────────────────────────────┐                  │
│            │  🔒 Confirm Password         │                  │
│            └──────────────────────────────┘                  │
│                                                              │
│            ┌──────────────────────────────┐                  │
│            │         SIGN UP              │                  │
│            └──────────────────────────────┘                  │
│                                                              │
│            Already have an account? Log in                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Task 2.1 — Build the Signup form

Very similar to Login, but with more fields:
- Full Name input (`id="signup-name"`)
- Email input (`id="signup-email"`)
- Password input (`id="signup-password"`)
- Confirm Password input (`id="signup-confirm-password"`)
- Submit button (`id="signup-submit-btn"`)
- Link to Login page

Use `useState` for each field. Add basic validation:
```jsx
const handleSignup = (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  console.log('Signup attempted:', name, email);
  alert('Signup feature coming in Evaluation 2!');
};
```

### Task 2.2 — Style it

Reuse similar styles from Login. Keep the card layout consistent. You can even extract shared form styles into a common CSS file like `src/styles/forms.css` and import it in both pages.

**Commits:**
1. `create signup page with name, email, password fields`
2. `add password confirmation validation`
3. `style signup page matching login design`

→ Push → PR → Merge

---

## PHASE 3: 
 Page (Day 6–8)

**Branch:** `addy-dashboard`

**Files:**
- `src/pages/Dashboard/Dashboard.jsx`
- `src/pages/Dashboard/Dashboard.css`

This is your **biggest and most important page**. Make it look like a real app dashboard.

### What the Dashboard should look like:

```
┌──────────────────────────────────────────────────────────────┐
│   Welcome back, User! 👋                                    │
│                                                              │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│   │  Calories     │  │    BMI       │  │  Water       │     │
│   │  Today        │  │              │  │  Intake      │     │
│   │              │  │   22.5       │  │              │     │
│   │  1,450       │  │   Normal     │  │  💧💧💧💧    │     │
│   │  / 2,000     │  │              │  │  4/8 glasses │     │
│   │  ████████░░  │  │   ▓▓▓▓▓░░   │  │              │     │
│   └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│   │  Protein     │  │    Carbs     │  │    Fat       │     │
│   │  85g / 120g  │  │  180g / 250g │  │  45g / 65g   │     │
│   └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│   ── Your Favorites ───────────────────                      │
│   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│   │ Fav 1  │ │ Fav 2  │ │ Fav 3  │ │ Fav 4  │              │
│   └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                              │
│   ── Recent Activity ──────────────────                      │
│   • Added Butter Chicken to favorites — 2 hours ago         │
│   • Planned meals for Monday — yesterday                    │
│   • Updated calorie goal — 3 days ago                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Task 3.1 — Create the NutritionWidget component

**File:** `src/components/NutritionWidget/NutritionWidget.jsx` + `.css`

This is a **reusable component** — you use it for Calories, BMI, Water, Protein, Carbs, Fat. Same component, different data via **props**.

```jsx
// src/components/NutritionWidget/NutritionWidget.jsx
import './NutritionWidget.css';

function NutritionWidget({ id, title, current, goal, unit, icon, color }) {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <article className="nutrition-widget" id={id}>
      <div className="widget-header">
        <span className="widget-icon">{icon}</span>
        <h3 className="widget-title">{title}</h3>
      </div>
      <div className="widget-value">
        <span className="widget-current">{current}</span>
        <span className="widget-separator"> / </span>
        <span className="widget-goal">{goal} {unit}</span>
      </div>
      <div className="widget-progress-bar">
        <div
          className="widget-progress-fill"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </article>
  );
}

export default NutritionWidget;
```

**Usage on Dashboard:**
```jsx
<NutritionWidget
  id="widget-calories"
  title="Calories Today"
  current={1450}
  goal={2000}
  unit="kcal"
  icon="🔥"
  color="#e63946"
/>
<NutritionWidget
  id="widget-water"
  title="Water Intake"
  current={4}
  goal={8}
  unit="glasses"
  icon="💧"
  color="#0096c7"
/>
```

**CSS for the progress bar:**
```css
.widget-progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.widget-progress-fill {
  height: 100%;
  border-radius: var(--radius-sm);
  transition: width var(--transition-normal);
}
```

**Commits:**
1. `create NutritionWidget reusable component with progress bar`
2. `style NutritionWidget with card layout and dynamic progress`

### Task 3.2 — Create BMI Calculator widget

**File:** `src/components/BMICalculator/BMICalculator.jsx` + `.css`

This one is special — it actually calculates and shows results. Great for showing off useState and event handling.

```jsx
function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <article className="bmi-calculator" id="bmi-calculator">
      <h3>BMI Calculator</h3>
      <form onSubmit={calculateBMI} id="bmi-form">
        <div className="form-group">
          <label htmlFor="bmi-height">Height (cm)</label>
          <input
            type="number"
            id="bmi-height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
          />
        </div>
        <div className="form-group">
          <label htmlFor="bmi-weight">Weight (kg)</label>
          <input
            type="number"
            id="bmi-weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
          />
        </div>
        <button type="submit" id="bmi-calculate-btn">Calculate</button>
      </form>
      {bmi && (
        <div className="bmi-result" id="bmi-result">
          <p className="bmi-value">Your BMI: {bmi}</p>
          <p className="bmi-category">Category: {category}</p>
        </div>
      )}
    </article>
  );
}
```

This demonstrates: **useState, event handling, form submission, conditional rendering, calculations in React**

**Commits:**
1. `create BMI calculator with height weight inputs and calculation`
2. `style BMI calculator with result display`

### Task 3.3 — Assemble the Dashboard

Now put it all together in `Dashboard.jsx`:

- Create a dummy user object at the top:
  ```js
  const dummyUser = {
    name: "Addy",
    email: "addy@example.com",
    joinDate: "August 2026",
    caloriesGoal: 2000,
    caloriesToday: 1450,
    waterGoal: 8,
    waterToday: 4,
    proteinGoal: 120,
    proteinToday: 85,
    carbsGoal: 250,
    carbsToday: 180,
    fatGoal: 65,
    fatToday: 45
  };
  ```

- Layout: Use CSS Grid for the widget cards
  ```css
  .dashboard-widgets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }
  ```

- Add a favorites section with dummy recipe cards (import `dummyRecipes` from `src/data/recipes.js`, use Vishal's `RecipeCard` component, slice first 4)

- Add a "Recent Activity" list with dummy activity data

**Commits:**
1. `build dashboard page layout with widget grid`
2. `add nutrition widgets with dummy health data`
3. `add favorites section and recent activity list`

→ Push → PR → Merge

---

## PHASE 4: Profile Page (Day 9–10)

**Branch:** `addy-profile`

**Files:**
- `src/pages/Profile/Profile.jsx`
- `src/pages/Profile/Profile.css`

### What the Profile page should look like:

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌──────────────────────────────────────────────┐          │
│   │  ┌─────┐                                     │          │
│   │  │ 👤  │   Addy                             │          │
│   │  │     │   addy@example.com                  │          │
│   │  └─────┘   Member since August 2026          │          │
│   │                                               │          │
│   │   [Edit Profile]                              │          │
│   └──────────────────────────────────────────────┘          │
│                                                              │
│   ── Personal Info ────────────────────                      │
│   Full Name:     Addy                                        │
│   Email:         addy@example.com                            │
│   Age:           20                                          │
│   Height:        170 cm                                      │
│   Weight:        70 kg                                       │
│   Activity Level: Moderate                                   │
│                                                              │
│   ── Health Goals ─────────────────────                      │
│   Daily Calories:  2000 kcal                                 │
│   Water Goal:      8 glasses                                 │
│   Weight Goal:     68 kg                                     │
│                                                              │
│   ── Account Settings ─────────────────                      │
│   [Change Password]   [Log Out]   [Delete Account]           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Task 4.1 — Build the Profile layout

- Profile header card with avatar (use a placeholder circle with initials or an emoji), name, email
- Use dummy data object for all the values
- "Edit Profile" button (`id="btn-edit-profile"`) — for Eval 1, clicking could toggle between view mode and edit mode using `useState`:

```jsx
const [isEditing, setIsEditing] = useState(false);

// Toggle between showing text and showing inputs
{isEditing ? (
  <input
    id="profile-name-input"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
) : (
  <p id="profile-name-display">{name}</p>
)}
```

This demonstrates **conditional rendering** and **state-driven UI** — very impressive for Eval 1.

### Task 4.2 — Style the Profile

- Profile header: card with flex layout, avatar on left, info on right
- Info sections: use a definition list `<dl>` or simple label-value pairs
- Buttons at the bottom: styled differently (primary, outline, danger for delete)

**Commits:**
1. `create profile page with user info display`
2. `add edit mode toggle with useState`
3. `style profile page with card layout and sections`

→ Push → PR → Merge

---

## PHASE 5: Water Intake Tracker (Day 10–11)

This is a nice interactive widget for the Dashboard. Build it as a separate component.

**File:** `src/components/WaterTracker/WaterTracker.jsx` + `.css`

### What it looks like:

```
┌─────────────────────────────┐
│     💧 Water Intake         │
│                             │
│   🥛 🥛 🥛 🥛 ○ ○ ○ ○     │
│       4 / 8 glasses         │
│                             │
│   [+ Add Glass]  [- Remove] │
└─────────────────────────────┘
```

```jsx
function WaterTracker() {
  const [glasses, setGlasses] = useState(4);
  const goal = 8;

  const addGlass = () => {
    if (glasses < goal) setGlasses(glasses + 1);
  };

  const removeGlass = () => {
    if (glasses > 0) setGlasses(glasses - 1);
  };

  return (
    <article className="water-tracker" id="water-tracker">
      <h3>💧 Water Intake</h3>
      <div className="water-glasses" id="water-glasses-display">
        {Array.from({ length: goal }, (_, i) => (
          <span
            key={i}
            className={`glass ${i < glasses ? 'glass-filled' : 'glass-empty'}`}
          >
            {i < glasses ? '🥛' : '○'}
          </span>
        ))}
      </div>
      <p>{glasses} / {goal} glasses</p>
      <div className="water-buttons">
        <button id="water-add-btn" onClick={addGlass}>+ Add Glass</button>
        <button id="water-remove-btn" onClick={removeGlass}>- Remove</button>
      </div>
    </article>
  );
}
```

This demonstrates: **useState, event handlers, Array.from(), conditional class names, .map()**

**Commit:** `create interactive water tracker with add/remove functionality`

---

## PHASE 6: Polish & Merge (Day 11–14)

### Task 6.1 — Review all your CSS

Go through every page and check:
- [ ] Forms look consistent across Login and Signup
- [ ] Dashboard widgets are evenly spaced
- [ ] Profile page looks professional
- [ ] Using CSS variables everywhere, not hardcoded colors
- [ ] Hover effects on buttons
- [ ] Focus styles on inputs (accessibility!)
- [ ] No layout breaking at different window sizes

### Task 6.2 — Create shared form styles

If your Login and Signup share lots of CSS, extract it:
```
src/styles/forms.css
```
Import it in both Login.jsx and Signup.jsx.

### Task 6.3 — Final merge with team

Push your latest branch, create PR, coordinate with Vishal to merge.

---

## GIT COMMITS YOU SHOULD HAVE (Minimum)

| # | Commit Message |
|---|---------------|
| 1 | `create login page with form, email, password, and submit` |
| 2 | `style login page with centered card layout and form styling` |
| 3 | `add social login buttons and forgot password link` |
| 4 | `create signup page with name, email, password fields` |
| 5 | `add password confirmation validation` |
| 6 | `style signup page matching login design` |
| 7 | `create NutritionWidget reusable component with progress bar` |
| 8 | `create BMI calculator with height weight inputs and calculation` |
| 9 | `build dashboard page layout with widget grid` |
| 10 | `add nutrition widgets with dummy health data` |
| 11 | `add favorites section and recent activity list` |
| 12 | `create profile page with user info display` |
| 13 | `add edit mode toggle with useState` |
| 14 | `create interactive water tracker with add/remove functionality` |
| 15 | `polish forms and dashboard styling` |

That's 15 meaningful commits.

---

## REACT CONCEPTS YOU'LL DEMONSTRATE

| Concept | Where You Use It |
|---------|-----------------|
| **JSX** | Every component |
| **Functional Components** | Login, Signup, Profile, Dashboard, NutritionWidget, BMICalculator, WaterTracker |
| **Props** | NutritionWidget (title, current, goal, icon, color) |
| **useState** | Form inputs, BMI values, water glasses, edit mode toggle |
| **useEffect** | Can use for loading dashboard data simulation |
| **Conditional Rendering** | BMI result display, edit/view mode toggle, filled/empty glasses |
| **Event Handling** | Form submit, input changes, button clicks, add/remove glass |
| **.map()** | Water glasses display, nutrition widget rendering, favorites list |
| **Form Handling** | Login form, Signup form, BMI form with e.preventDefault() |
| **Controlled Components** | All inputs use value + onChange pattern |

---

## WHAT TO SAY IN THE VIVA

1. "I built the user module — login, signup, profile, and dashboard with nutrition tracking"
2. "I used useState to manage form data, and onChange to create controlled components"
3. "The NutritionWidget is a reusable component — I pass different data through props and it renders dynamically"
4. "The BMI calculator does real calculations using state — it takes height and weight, computes BMI, and conditionally renders the result"
5. "The water tracker uses useState and event handlers to let users add or remove glasses"
6. "I used conditional rendering to toggle between edit and view mode on the profile page"
7. "I used semantic HTML — form, label, input with proper htmlFor attributes"
8. "All my forms use onSubmit with preventDefault to handle submission properly"
