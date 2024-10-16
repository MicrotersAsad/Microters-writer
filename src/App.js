import React, { useState } from 'react';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/components/build-style/style.css';
import Footer from './Componnets/Footer';
import "./App.css"
import GutenbergEditor from './Componnets/GutenbergEditor';
import DisplayPages from './Componnets/DisplayPages';
const App = () => {

  return (
    <div className='app'>
      {/* <Navbar/> Pass the theme color as a prop */}
      {/* <hr/> */}
      {/* <Home/> Pass the theme color as a prop */}
      {/* <div className="text-center mt-4">
        <button className="btn btn-secondary me-2" onClick={() => handleBackgroundColor('#000000')}>Black Background</button>
        <button className="btn btn-secondary" onClick={() => handleBackgroundColor('#ffffff')}>White Background</button>
      </div> */}
      <h1>HI</h1>
      <GutenbergEditor/>
      <DisplayPages/>
      <Footer/>
    </div>
  );
};

export default App;
