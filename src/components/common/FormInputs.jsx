import React from 'react';
import './FormInputs.css';

/**
 * Reusable Form Input Component (Modules 55-60)
 * Includes field validation display, labels, and accessible states.
 */
export const FormInput = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  min,
  max,
  step,
  className = ''
}) => {
  return (
    <div className={`form-field-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-field-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`form-field-input ${error ? 'input-error' : ''}`}
      />
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};

export const FormSelect = ({
  label,
  id,
  value,
  onChange,
  options = [],
  error,
  required = false,
  className = ''
}) => {
  return (
    <div className={`form-field-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-field-label">
          {label} {required && <span className="required-star">*</span>}
        </label>
      )}
      <div className="select-wrapper">
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className={`form-field-select ${error ? 'input-error' : ''}`}
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      </div>
      {error && <span className="field-error-text">{error}</span>}
    </div>
  );
};
