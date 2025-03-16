import React, { useState } from 'react';
import LocationPicker from './LocationApi/LocationPicker';

const ParentComponent = () => {
  const [value1, setValue1] = useState(null); // For latitude
  const [value2, setValue2] = useState(null); // For longitude

  return (
    <div>
      <LocationPicker setValue1={setValue1} setValue2={setValue2} />
      <p>Latitude: {value1}</p>
      <p>Longitude: {value2}</p>
    </div>
  );
};

export default ParentComponent;
