import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  });

  const validate = (formData) => {
    let validationErrors = {};
    if (!formData.name) validationErrors.name = 'Name is required';
    if (!formData.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.age) {
      validationErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      validationErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      validationErrors.guestName = 'Guest name is required';
    }
    return validationErrors;
  };

  const { errors, handleValidation } = useFormValidation(validate);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = handleValidation(formData);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div>
        <h1>Registration Summary</h1>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Age:</strong> {formData.age}</p>
        <p><strong>Attending with Guest:</strong> {formData.attendingWithGuest}</p>
        {formData.attendingWithGuest === 'Yes' && <p><strong>Guest Name:</strong> {formData.guestName}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
      </div>
      <div>
        <label>Are you attending with a guest?</label>
        <select
          name="attendingWithGuest"
          value={formData.attendingWithGuest}
          onChange={handleChange}
        >
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      {formData.attendingWithGuest === 'Yes' && (
        <div>
          <label>Guest Name:</label>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
          />
          {errors.guestName && <p style={{ color: 'red' }}>{errors.guestName}</p>}
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
