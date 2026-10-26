import React, { useState } from 'react';
import Modal from '../common/Modal';
import { FormInput, FormSelect } from '../common/FormInputs';
import './AddItemModal.css';

const CATEGORIES = [
  'Produce',
  'Dairy',
  'Meat',
  'Pantry',
  'Frozen',
  'Snacks',
  'Beverages',
  'Sweets'
];

/**
 * AddItemModal Component (Modules 55-60 Form Handling & Validation, 61-66 Modals)
 */
const AddItemModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Produce',
    price: '',
    qty: 1,
    store: 'FreshMart'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value || !value.trim()) return 'Item name is required.';
        if (value.trim().length < 2) return 'Item name must be at least 2 characters.';
        return '';
      case 'price':
        if (value === '' || value === null) return 'Price is required.';
        if (Number(value) <= 0) return 'Price must be greater than $0.00.';
        return '';
      case 'qty':
        if (!value || Number(value) < 1) return 'Quantity must be at least 1.';
        return '';
      default:
        return '';
    }
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
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
    setTouched({ name: true, price: true, qty: true });
    if (!validateAll()) return;

    onAdd({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      qty: parseInt(formData.qty, 10),
      store: formData.store
    });

    // Reset form
    setFormData({
      name: '',
      category: 'Produce',
      price: '',
      qty: 1,
      store: 'FreshMart'
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} title="Add Grocery Item" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate className="add-item-form">
        <FormInput
          label="Item Name"
          id="name"
          placeholder="e.g. Organic Almond Milk"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name ? errors.name : ''}
          required
        />

        <div className="form-row-2col">
          <FormSelect
            label="Category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            options={CATEGORIES}
            required
          />

          <FormInput
            label="Store"
            id="store"
            placeholder="e.g. Whole Foods"
            value={formData.store}
            onChange={handleChange}
          />
        </div>

        <div className="form-row-2col">
          <FormInput
            label="Price ($)"
            id="price"
            type="number"
            step="0.01"
            placeholder="3.99"
            value={formData.price}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.price ? errors.price : ''}
            required
          />

          <FormInput
            label="Quantity"
            id="qty"
            type="number"
            min="1"
            value={formData.qty}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.qty ? errors.qty : ''}
            required
          />
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            + Add to Cart
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddItemModal;
