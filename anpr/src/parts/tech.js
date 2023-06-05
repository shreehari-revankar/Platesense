import React from 'react';
import './home.css';
import Reactlogo from './images/tech/react.png';
import Colab from './images/tech/colab.png';
import Tfjs from './images/tech/tenserflowjs.png';
import Tesseract from './images/tech/tesseractjs.png';
function Tech(){
    return(
        <div>
        <div className='site-section' id='technologies'>
            <div className='container'>
            <div className='row align-items-center'>
            <div className='col-lg-5 mr-auto mb-5'>
            <h2 className="section-title">TECHNOLOGIES</h2></div></div></div>
           <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-5 mr-auto mb-5'>
                <img className='img-fluid' src={Reactlogo} />
              </div>
              <div className='col-lg-5 mr-auto mb-5'>
                <img className='img-fluid' src={Colab} />
              </div>
              <div className='col-lg-5 mr-auto mb-5'>
                <img className='img-fluid' src={Tfjs} />
              </div>
              <div className='col-lg-5 mr-auto mb-5'>
                <img className='img-fluid' src={Tesseract} />
              </div>
            </div>
          </div>
        </div>
        <footer className='footer-section bg-dark'>
        <div className="container">
              <div className="row">
                
                <div className="col-md-4">
                  <h3>INFO</h3>
                  <p>Tesseract.js is a library mainy build for extracting text info mainly from scanned document. It shows low accuracy while extracting info from cctv footage. Different Browser handles image differently which affects the performance of the tessaract accuracy.</p>
                </div>
              
              <div className="col-md-4 ml-auto">
              <h3>Links</h3>
                  <ul className="list-unstyled footer-links">
                    <li><a href="#home" >Home</a></li>
                    <li><a href="#features-section" >Features</a></li>
                    <li><a href="#glance" >Glance</a></li>
                    <li><a href="#demo" >Demo</a></li>
                    <li><a href="https://github.com/shreehari-revankar">Github</a></li>
                  </ul>
              </div>
              <div className="col-md-4 ml-auto">
              <h3>About us</h3>
              <p>We love problem solving and programming.</p>
              </div>
        </div>
        </div>
        </footer>
        </div>
    )
}

export default Tech;