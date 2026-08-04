const dummyRecipes = [
  {
    id: "1",
    name: "Butter Chicken",
    category: "Chicken",
    area: "Indian",
    image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    tags: ["Curry", "Spicy"],
    ingredients: [
      { name: "Chicken", measure: "500g" },
      { name: "Butter", measure: "50g" },
      { name: "Tomato Puree", measure: "200ml" },
      { name: "Cream", measure: "100ml" },
      { name: "Garam Masala", measure: "2 tsp" }
    ],
    instructions: "1. Marinate chicken in yogurt and spices for 30 minutes.\n2. Cook chicken in butter until golden.\n3. Add tomato puree and simmer.\n4. Stir in cream and garam masala.\n5. Serve hot with naan or rice."
  },
  {
    id: "2",
    name: "Caesar Salad",
    category: "Starter",
    area: "American",
    image: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
    tags: ["Healthy", "Light"],
    ingredients: [
      { name: "Lettuce", measure: "1 head" },
      { name: "Croutons", measure: "1 cup" },
      { name: "Parmesan", measure: "50g" },
      { name: "Caesar Dressing", measure: "4 tbsp" }
    ],
    instructions: "1. Wash and chop the lettuce.\n2. Toss with croutons and parmesan.\n3. Drizzle with Caesar dressing.\n4. Serve immediately."
  },
  {
    id: "3",
    name: "Pasta Carbonara",
    category: "Pasta",
    area: "Italian",
    image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
    tags: ["Pasta", "Creamy"],
    ingredients: [
      { name: "Spaghetti", measure: "400g" },
      { name: "Eggs", measure: "3" },
      { name: "Parmesan", measure: "100g" },
      { name: "Pancetta", measure: "150g" },
      { name: "Black Pepper", measure: "to taste" }
    ],
    instructions: "1. Cook spaghetti in salted boiling water.\n2. Fry pancetta until crispy.\n3. Mix eggs with grated parmesan.\n4. Toss hot pasta with pancetta.\n5. Stir in egg mixture quickly.\n6. Serve with extra parmesan and pepper."
  },
  {
    id: "4",
    name: "Pad Thai",
    category: "Noodles",
    area: "Thai",
    image: "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg",
    tags: ["Spicy", "Noodles"],
    ingredients: [
      { name: "Rice Noodles", measure: "250g" },
      { name: "Shrimp", measure: "200g" },
      { name: "Bean Sprouts", measure: "1 cup" },
      { name: "Peanuts", measure: "3 tbsp" },
      { name: "Lime", measure: "2" }
    ],
    instructions: "1. Soak rice noodles in warm water.\n2. Stir fry shrimp until pink.\n3. Add noodles and pad thai sauce.\n4. Toss with bean sprouts.\n5. Top with crushed peanuts and lime."
  },
  {
    id: "5",
    name: "Margherita Pizza",
    category: "Miscellaneous",
    area: "Italian",
    image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
    tags: ["Pizza", "Cheese"],
    ingredients: [
      { name: "Pizza Dough", measure: "1 ball" },
      { name: "Tomato Sauce", measure: "100ml" },
      { name: "Mozzarella", measure: "200g" },
      { name: "Fresh Basil", measure: "10 leaves" },
      { name: "Olive Oil", measure: "2 tbsp" }
    ],
    instructions: "1. Roll out pizza dough.\n2. Spread tomato sauce evenly.\n3. Top with sliced mozzarella.\n4. Bake at 220C for 12-15 minutes.\n5. Add fresh basil and drizzle olive oil."
  },
  {
    id: "6",
    name: "Chicken Biryani",
    category: "Chicken",
    area: "Indian",
    image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
    tags: ["Rice", "Spicy"],
    ingredients: [
      { name: "Basmati Rice", measure: "500g" },
      { name: "Chicken", measure: "500g" },
      { name: "Yogurt", measure: "200ml" },
      { name: "Onions", measure: "3 large" },
      { name: "Biryani Masala", measure: "3 tbsp" }
    ],
    instructions: "1. Marinate chicken in yogurt and spices.\n2. Cook rice until 70% done.\n3. Fry onions until golden brown.\n4. Layer chicken and rice in a pot.\n5. Cook on low heat for 25 minutes."
  }
];

export default dummyRecipes;
