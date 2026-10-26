import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Recipes from './pages/Recipes/Recipes';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Planner from './pages/Planner/Planner';
import Shopping from './pages/Shopping/Shopping';

// Import the Context Providers
import { PlannerProvider } from './context/PlannerContext';
import { ShoppingProvider } from './context/ShoppingContext';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ShoppingProvider>
        <PlannerProvider>
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
        </PlannerProvider>
      </ShoppingProvider>
    </BrowserRouter>
  );
}

export default App;
