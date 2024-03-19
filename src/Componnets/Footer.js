import React from 'react';
import logo from "../assest/logo (2).png"
const Footer = () => {
    return (
        <div className='container'>
            <div className='row'>
               
            <div class="col-md-4">
           
            <h6>Built By <a className='text-decoration-none' href='https://microters.com/'>Microters</a> 	&#169;Copyright 2024 Microters Writer. </h6>
            </div>
        <div class="col-md-4">
        <a className="navbar-brand" href="#"><img width={90} src={logo}/></a>
            </div>
        <div class="col-md-4">
        <div class="input-group mb-3">
  <input type="email" class="form-control" placeholder="Enter Your Email" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Get update</button>
</div>
            </div>
        </div>
        </div>
    );
};

export default Footer;