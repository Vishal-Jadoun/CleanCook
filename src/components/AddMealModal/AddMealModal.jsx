import React, { useState } from 'react';
import Modal from '../common/Modal';
import { FormInput, FormSelect } from '../common/FormInputs';
import './AddMealModal.css';

const SLOTS = [
  { value: 'breakfast', label: 'Breakfast 🍞' },
  { value: 'lunch', label: 'Lunch 🥗' },
  { value: 'dinner', label: 'Dinner 🍲' },
  { value: 'snack', label: 'Snack 🍎' }
];

/**
 * AddMealModal Component (Modules 55-60 Form Handling & Validation)
 */
const AddMealModal = ({
  isOpen,
  onClose,
  days = [],
  defaultDay = 'Monday',
  defaultSlot = 'lunch',
  onSave
}) => {
  const [targetDay, setTargetDay] = useState(defaultDay);
  const [slot, setSlot] = useState(defaultSlot);

  React.useEffect(() => {
    if (isOpen) {
      setTargetDay(defaultDay);
      setSlot(defaultSlot);
    }
  }, [isOpen, defaultDay, defaultSlot]);
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    prepTime: '20 mins',
    tag: 'Healthy',
    image: '',
    ingredientsInput: '1 cup Quinoa, 150g Chicken Breast, 1 tbsp Olive Oil'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value || !value.trim()) return 'Recipe / meal name is required.';
        if (value.trim().length < 3) return 'Name must be at least 3 characters.';
        return '';
      case 'calories':
        if (!value) return 'Calories are required.';
        if (Number(value) <= 0 || Number(value) > 3000) return 'Calories must be between 1 and 3000.';
        return '';
      case 'protein':
      case 'carbs':
      case 'fat':
        if (value !== '' && Number(value) < 0) return 'Cannot be negative.';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    ['name', 'calories', 'protein', 'carbs', 'fat'].forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, calories: true });
    if (!validateAll()) return;

    // Parse ingredients from comma-separated input
    const ingredients = formData.ingredientsInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => ({ item, amount: '1 serving' }));

    const mealData = {
      name: formData.name.trim(),
      calories: parseInt(formData.calories, 10),
      protein: parseInt(formData.protein, 10) || 0,
      carbs: parseInt(formData.carbs, 10) || 0,
      fat: parseInt(formData.fat, 10) || 0,
      prepTime: formData.prepTime || '15 mins',
      tags: [formData.tag || 'Custom'],
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80',
      ingredients: ingredients.length ? ingredients : [{ item: formData.name, amount: '1 meal' }]
    };

    onSave(targetDay, slot, mealData);

    // Reset
    setFormData({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: '',
      prepTime: '20 mins',
      tag: 'Healthy',
      image: '',
      ingredientsInput: ''
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title="Plan Custom Meal" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="add-meal-form">
        <div className="form-row-2col">
          <FormSelect
            label="Target Day"
            id="targetDay"
            value={targetDay}
            onChange={(e) => setTargetDay(e.target.value)}
            options={days}
            required
          />

          <FormSelect
            label="Meal Slot"
            id="slot"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            options={SLOTS}
            required
          />
        </div>

        <FormInput
          label="Meal / Recipe Name"
          id="name"
          placeholder="e.g. Lemon Herb Roasted Chicken"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : ''}
          required
        />

        <div className="form-row-3col">
          <FormInput
            label="Calories (kcal)"
            id="calories"
            type="number"
            placeholder="550"
            value={formData.calories}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.calories ? errors.calories : ''}
            required
          />

          <FormInput
            label="Protein (g)"
            id="protein"
            type="number"
            placeholder="35"
            value={formData.protein}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.protein ? errors.protein : ''}
          />

          <FormInput
            label="Carbs (g)"
            id="carbs"
            type="number"
            placeholder="40"
            value={formData.carbs}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.carbs ? errors.carbs : ''}
          />
        </div>

        <div className="form-row-2col">
          <FormInput
            label="Fat (g)"
            id="fat"
            type="number"
            placeholder="15"
            value={formData.fat}
            onChange={handleChange}
          />

          <FormInput
            label="Prep Time"
            id="prepTime"
            placeholder="e.g. 25 mins"
            value={formData.prepTime}
            onChange={handleChange}
          />
        </div>

        <FormInput
          label="Ingredients (comma-separated)"
          id="ingredientsInput"
          placeholder="e.g. 200g Chicken, 1 lemon, 2 sprigs Rosemary"
          value={formData.ingredientsInput}
          onChange={handleChange}
        />

        <FormInput
          label="Image URL (optional)"
          id="image"
          placeholder="https://..."
          value={formData.image}
          onChange={handleChange}
        />

        <div className="modal-actions-bar">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Save to Planner
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddMealModal;
