import React from 'react';
import logo from "../assest/ai-buster-logo.png"
import { FaBeer, FaEnvelope, FaMailBulk, FaSkype, FaWhatsapp } from "react-icons/fa";
import '../App.css'
const Navbar = () => {
  return (
    <div>
      <div className='bg-primary p-2 text-white text-center'>
        <span className='text-center'><svg className='svg-icons' xmlns="https://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z"></path></svg>
       <span>  We are online here
       <img decoding="async" draggable="false" role="img" class="emoji" src="https://s.w.org/images/core/emoji/14.0.0/svg/1f449.svg" alt="👉"/>
      
        </span>
        <span>
        <a target="_blank" aria-label="List item" rel="noopener noreferrer" href="https://join.skype.com/invite/xWgO0tVtvE1h"><FaSkype className='text-white'/></a>
        <a className='ps-2' target="_self" aria-label="List item" rel="noopener noreferrer" href="https://api.whatsapp.com/send?phone=01706909724"><FaWhatsapp className='text-white'/></a>
        <a className='ps-2' target="_self" aria-label="List item" rel="noopener noreferrer" href="mailto:aibusterofficial@gmail.com"><FaEnvelope className='text-white'/></a>
        </span>
        
        </span>
      </div>

    <nav className={`navbar navbar-expand-lg navbar-light`} >
      <div className="container">
        <a className="navbar-brand" href="https://aibuster.com/"><img width={225} height={43} src={logo}/></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" href="https://aibuster.com/how-we-works/">How We Works?</a>
            <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Services
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">
                <div className='d-flex'>
              <div className=''>
              <span class="astra-mm-icon-label icon-item-342 bg-menu-dropdwon">
                <span class="ahfb-svg-iconset ast-inline-flex bg-menu-dropdwon"><svg className=' dot' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"></path>
                </svg></span></span>
              </div>
              <div>
              Wordpress AI Auto Blogging
              </div>
                </div>
           </a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
          
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
            <a className="nav-link" href="#">About</a>
            <a className="nav-link" href="#">Contact</a>
          </div>
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
