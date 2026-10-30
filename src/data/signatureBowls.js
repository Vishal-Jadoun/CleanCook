import abgcbowl from '../assets/abgcbowl.png';
import bbgcbowl from '../assets/bbgcbowl.png';
import cbgcbowl from '../assets/cbgcbowl.png';

export const SIGNATURE_BOWLS = [
  {
    id: 'bowl-1',
    aliasIds: ['1', 'bowl-1', 'buddha-bowl'],
    name: 'Rainbow Buddha Bowl',
    description: 'A colorful mix of avocado, quinoa, chickpeas, fresh greens, purple cabbage, cherry tomatoes, and roasted sweet potatoes.',
    image: abgcbowl,
    prepTime: '15 min',
    servings: '2',
    calories: '450 cal',
    tag: 'Signature Bowl',
    area: 'Healthy Bowl',
    category: 'Signature Bowl',
    tags: ['Healthy', 'Clean Eating', 'Superfood', 'Vegan'],
    route: '/recipe/bowl-1',
    ingredients: [
      { name: 'Quinoa', measure: '1 cup' },
      { name: 'Chickpeas', measure: '1/2 cup' },
      { name: 'Fresh Avocado', measure: '1 sliced' },
      { name: 'Purple Cabbage', measure: '1/2 cup shredded' },
      { name: 'Cherry Tomatoes', measure: '1/2 cup halved' },
      { name: 'Roasted Sweet Potatoes', measure: '1 diced' },
      { name: 'Lemon Tahini Dressing', measure: '3 tbsp' },
    ],
    instructions:
      '1. Cook the Quinoa: Rinse quinoa and boil in 2 cups of water for 15 minutes until fluffy.\n2. Prepare the Veggies: Chop the avocado, cabbage, and tomatoes. Roast the sweet potatoes until soft.\n3. Assemble the Bowl: Place the cooked quinoa at the bottom. Arrange all the veggies and chickpeas neatly on top.\n4. Dressing: Drizzle heavily with lemon tahini dressing and serve immediately.',
  },
  {
    id: 'bowl-2',
    aliasIds: ['2', 'bowl-2', 'lentil-bowl'],
    name: 'Hearty Lentil & Sweet Potato Bowl',
    description: 'A warm and comforting bowl of protein-rich lentils, roasted sweet potatoes, spinach, and fresh herbs.',
    image: bbgcbowl,
    prepTime: '25 min',
    servings: '2',
    calories: '520 cal',
    tag: 'Protein Rich',
    area: 'Healthy Bowl',
    category: 'Protein Rich',
    tags: ['High Protein', 'Warm Bowl', 'Vegetarian'],
    route: '/recipe/bowl-2',
    ingredients: [
      { name: 'Brown Lentils', measure: '1 cup cooked' },
      { name: 'Roasted Sweet Potatoes', measure: '1 large cubed' },
      { name: 'Baby Spinach', measure: '2 cups fresh' },
      { name: 'Garlic Cloves', measure: '2 minced' },
      { name: 'Olive Oil', measure: '2 tbsp' },
      { name: 'Fresh Herbs', measure: '2 tbsp chopped' },
    ],
    instructions:
      '1. Cook the Lentils: Boil lentils in salted water until tender, about 20 minutes.\n2. Roast the Sweet Potatoes: Toss sweet potato cubes with olive oil and roast at 200°C for 25 minutes.\n3. Sauté the Spinach: Warm olive oil in a pan, add garlic and spinach, sauté until wilted.\n4. Assemble: Combine warm lentils, roasted sweet potatoes, and spinach in a bowl. Garnish with fresh herbs.',
  },
  {
    id: 'bowl-3',
    aliasIds: ['3', 'bowl-3', 'kale-chickpea-bowl'],
    name: 'Mediterranean Kale Chickpea Bowl',
    description: 'Fresh kale and chickpeas tossed with cucumber, cherry tomatoes, red onion, creamy feta, and herbs.',
    image: cbgcbowl,
    prepTime: '20 min',
    servings: '2',
    calories: '480 cal',
    tag: 'Mediterranean',
    area: 'Healthy Bowl',
    category: 'Mediterranean',
    tags: ['Mediterranean', 'Fiber Rich', 'Salad Bowl'],
    route: '/recipe/bowl-3',
    ingredients: [
      { name: 'Tuscan Kale', measure: '2 cups shredded' },
      { name: 'Cooked Chickpeas', measure: '1 cup' },
      { name: 'Persian Cucumber', measure: '1 diced' },
      { name: 'Cherry Tomatoes', measure: '1 cup halved' },
      { name: 'Red Onion', measure: '1/4 thinly sliced' },
      { name: 'Feta Cheese', measure: '50g crumbled' },
      { name: 'Lemon Tahini Dressing', measure: '2 tbsp' },
    ],
    instructions:
      '1. Prepare the Kale: Wash and massage kale with olive oil and a pinch of salt to soften leaves.\n2. Mix the Veggies: Toss chickpeas, diced cucumber, tomatoes, and red onion together.\n3. Assemble: Fill bowl with massaged kale, arrange chickpea salad over top, and scatter crumbled feta.\n4. Dressing: Drizzle with lemon dressing and serve chilled.',
  },
];

export default SIGNATURE_BOWLS;

