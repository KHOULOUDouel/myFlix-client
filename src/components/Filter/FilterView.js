import React, { useState } from 'react';

export const FilterView = ({ onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleChange = (e) => {
    setFilter(e.target.value);
    onFilter(e.target.value);
  };

  return (
    <input
      type="text"
      value={filter}
      onChange={handleChange}
      placeholder="Filter movies by title"
    />
  );
};
