# 🚀 CleanCook Git & React Cheat Sheet

## 📥 1. Clone the Project (Only Once)

Download the project from GitHub.

```bash
git clone https://github.com/Vishal-Jadoun/CleanCook.git
```

Go inside the project folder.

```bash
cd CleanCook
```

Install all required packages.

```bash
npm install
```

Start the React development server.

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

---

# 🌿 Before Starting Any New Feature

## Step 1: Switch to Main Branch

```bash
git checkout main
```

**What it does:**
Switches your project to the `main` branch.

---

## Step 2: Get Latest Updates

```bash
git pull origin main
```

**What it does:**
Downloads the newest code from GitHub so your project is up to date.

---

## Step 3: Create Your Own Branch

```bash
git checkout -b yourname-feature
```

Examples:

```bash
git checkout -b addy-profile
git checkout -b addy-login
git checkout -b harnoor-planner
git checkout -b vishal-homepage
```

**What it does:**

- Creates a new branch
- Switches you to that branch immediately

> **Rule:** Create a **new branch for every new feature/page.**

---

# 💻 Start Coding

Run the project if it's not already running.

```bash
npm run dev
```

Start building your assigned page.

---

# 💾 Save Your Work

Stage all changed files.

```bash
git add .
```

Create a commit.

```bash
git commit -m "Completed Profile Page UI"
```

> `-m` means **message**, not **main**.

Examples:

```bash
git commit -m "Added Login Page"
git commit -m "Completed Planner UI"
git commit -m "Fixed Navbar"
```

---

# ☁️ Upload Your Branch

```bash
git push origin your-branch-name
```

Example:

```bash
git push origin addy-profile
```

This uploads your branch to GitHub.

---

# 🔀 Create a Pull Request

1. Open the GitHub repository.
2. Click **Compare & Pull Request**.
3. Add a title and description.
4. Click **Create Pull Request**.

The team leader (Vishal) will review and merge it.

---

# 🔄 After Your Pull Request Is Merged

Whenever someone else's work is merged into `main`, update your local project before starting a new feature.

```bash
git checkout main
git pull origin main
```

Then create a new branch.

```bash
git checkout -b yourname-nextfeature
```

Example:

```bash
git checkout -b addy-dashboard
```

---

# 📋 Daily Workflow

```text
Open VS Code
      ↓
git checkout main
      ↓
git pull origin main
      ↓
git checkout -b yourname-feature
      ↓
npm run dev
      ↓
Code your feature
      ↓
git add .
      ↓
git commit -m "Describe your work"
      ↓
git push origin your-branch
      ↓
Create Pull Request
      ↓
Leader reviews & merges
```

---

# ⚠️ Golden Rules

✅ Always pull the latest code before starting work.

✅ Create a **new branch** for every feature.

✅ Never code directly on the `main` branch.

✅ Commit often with meaningful messages.

✅ Push your branch and create a Pull Request when your feature is complete.

---

# 🧠 Command Reference

| Command | Purpose |
|---------|---------|
| `git clone <repo>` | Download project from GitHub |
| `cd CleanCook` | Enter project folder |
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `git checkout main` | Switch to the main branch |
| `git pull origin main` | Get the latest updates from GitHub |
| `git checkout -b branch-name` | Create and switch to a new branch |
| `git add .` | Stage all changed files |
| `git commit -m "message"` | Save changes with a message |
| `git push origin branch-name` | Upload your branch to GitHub |