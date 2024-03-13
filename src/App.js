import React, { useState } from 'react';
import Home from './Componnets/Home';
import Navbar from './Componnets/Navbar';

const App = () => {
  const [themeColor, setThemeColor] = useState('white'); // Initial theme color

  const handleBackgroundColor = (color) => {
    setThemeColor(color === '#000000' ? 'white' : 'black'); // Toggle theme color based on background color
  };

  return (
    <div style={{ backgroundColor: themeColor, minHeight: '100vh', transition: 'background-color 0.5s ease' }}>
      <Navbar textColor={themeColor} /> {/* Pass the theme color as a prop */}
      <Home textColor={themeColor} /> {/* Pass the theme color as a prop */}
      {/* <div className="text-center mt-4">
        <button className="btn btn-secondary me-2" onClick={() => handleBackgroundColor('#000000')}>Black Background</button>
        <button className="btn btn-secondary" onClick={() => handleBackgroundColor('#ffffff')}>White Background</button>
      </div> */}
    </div>
  );
};

export default App;
