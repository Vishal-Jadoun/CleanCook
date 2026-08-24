<div align="center">

<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=for-the-badge&logo=css3&logoColor=white" />

# 🥗 CleanCook

### *Eat Clean. Live Well. Cook Smart.*

**CleanCook** is a premium, full-featured web application for discovering healthy recipes, planning weekly meals, and managing grocery shopping — all in one beautiful, modern interface.

> Built with React + Vite as a collaborative university project by a team of 3 developers.

</div>

---

## ✨ What Does CleanCook Do?

CleanCook solves a simple problem: **eating healthy is hard when you don't know what to cook.** Our app gives users:

- 🔍 A curated library of healthy, clean recipes to discover
- 📋 Step-by-step cooking instructions and ingredient checklists  
- 📅 A weekly meal planner to schedule breakfast, lunch, and dinner
- 🛒 An auto-generated shopping list based on planned meals
- 👤 A personal profile to track dietary goals and preferences
- 🔐 Secure login and signup for personalized experiences

---

## 🖥️ Tech Stack

| Technology | Purpose |
|---|---|
| **React.js 18** | UI component architecture |
| **Vite 8** | Lightning-fast build tool and dev server |
| **React Router DOM v6** | Client-side page routing (SPA) |
| **Vanilla CSS** | Custom styling with CSS Variables & Flexbox |

---

## 📁 Project Structure

```
CleanCook/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Images (bowl photos, icons, etc.)
│   ├── components/             # Reusable UI components
│   │   ├── Navbar/             # Top navigation bar
│   │   ├── Footer/             # Global footer
│   │   └── SearchBar/          # Recipe search input
│   ├── pages/                  # One folder per page/route
│   │   ├── Home/               # 🏠 Landing page + Day-at-a-Glance dashboard
│   │   ├── Recipes/            # 🔍 Recipe discovery grid
│   │   ├── RecipeDetails/      # 📖 Single recipe view (ingredients + steps)
│   │   ├── Planner/            # 📅 Weekly meal planner
│   │   ├── Shopping/           # 🛒 Grocery shopping list
│   │   ├── Profile/            # 👤 User profile and stats
│   │   ├── Login/              # 🔐 Authentication
│   │   └── Signup/             # 📝 New account creation
│   ├── data/                   # Static data and constants
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API service layer
│   ├── styles/                 # Global shared styles
│   ├── utils/                  # Helper/utility functions
│   ├── App.jsx                 # Root component + route definitions
│   └── main.jsx                # React DOM entry point
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies and scripts
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | **Home** | Hero section, feature highlights, daily recipe inspiration, and dashboard |
| `/recipes` | **Recipes** | Searchable grid of all available healthy recipes |
| `/recipe/:id` | **Recipe Details** | Full recipe view with ingredients list and step-by-step instructions |
| `/planner` | **Planner** | Drag-and-drop weekly meal planner |
| `/shopping` | **Shopping** | Auto-generated grocery checklist |
| `/profile` | **Profile** | User info, dietary goals, and activity stats |
| `/login` | **Login** | User authentication |
| `/signup` | **Signup** | New account registration |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes bundled with Node.js)

### Installation & Running

```bash
# 1. Clone the repository
git clone https://github.com/Vishal-Jadoun/CleanCook.git

# 2. Navigate into the project directory
cd CleanCook

# 3. Install all dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser and go to **`http://localhost:5173`** 🎉

### Build for Production

```bash
npm run build
```

---

## 🌿 Git Workflow

This project follows a **feature-branch workflow**:

- Every developer works on their own branch (e.g., `vishal-recipe`, `harnoor-shopping`)
- Code is submitted via Pull Requests and reviewed before merging into `main`
- The `main` branch always contains the stable, production-ready version of the app

---

## 👥 Team

| Name | GitHub | Role |
|---|---|---|
| **Vishal Jadoun** | [@Vishal-Jadoun](https://github.com/Vishal-Jadoun) | Navbar, Footer, Hero Section, Recipes Page, Recipe Details Page |
| **Harnoor Kaur Khakh** | [@HarnoorKaurKhakh](https://github.com/HarnoorKaurKhakh) | Meal Planner, Shopping List |
| **Aditya Bansal** | [@addydotcom](https://github.com/addydotcom) | Login, Signup, Profile Page, Profile Card, Favorites |

---

## 📄 License

This project was built for educational purposes as part of a university course project.

---

<div align="center">

Made with ❤️ by the CleanCook Team

</div>
