import React, { useState } from 'react';
import Home from './Componnets/Home';
import Navbar from './Componnets/Navbar';
import Footer from './Componnets/Footer';
import "./App.css"
const App = () => {

  return (
    <div className='app'>
      {/* <Navbar/> Pass the theme color as a prop */}
      {/* <hr/> */}
      <Home/> {/* Pass the theme color as a prop */}
      {/* <div className="text-center mt-4">
        <button className="btn btn-secondary me-2" onClick={() => handleBackgroundColor('#000000')}>Black Background</button>
        <button className="btn btn-secondary" onClick={() => handleBackgroundColor('#ffffff')}>White Background</button>
      </div> */}
      <Footer/>
    </div>
  );
};

export default App;
