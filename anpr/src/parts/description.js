import React from 'react';
import './home.css';
import PIC from './images/des.png'
function Des(){
    return(
        <div className='site-section'>
           <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-5 mr-auto mb-5'>
                <img className='img-fluid' src={PIC} />
              </div>
              <div className='col-lg-5 mr-auto mb-5'>
                <h1 className='section-title'>PLATESENSE</h1>
                <p>Platesence is an advance number plate recognition system. The advanced number plate recognition system utilizes YOLO for accurate object detection and Tesseract for precise optical character recognition, enabling efficient and reliable extraction of number plate information.</p>
              <ul className="ul-check list-unstyled success">
              <li className="black-text">Ease Of Use</li>
              <li className="black-text">Saves Manual Labour</li>
              <li className="black-text">Brilliant Accuracy</li>
              <li className="black-text">Fully Automatic Number Plate Detection</li>
              <li className="black-text">Text Recognition</li>
              <li className="black-text">Offence Registration</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Des;