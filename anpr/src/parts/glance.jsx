import React from 'react';
import './home.css';
function Glance(){
    return(
        <div className='site-section' id="glance">
           <div className='container'>
            <div className='row align-items-center'>
              <div className='col-lg-5 mr-auto mb-5'>
                <h1 className='section-title'>GLANCE</h1>
                <p>Introducing our ANPR Demo Video: Unlocking the Power of Automatic Number Plate Recognition

Our ANPR Demo Video showcases the incredible capabilities of our Automatic Number Plate Recognition system.</p>
<p>In this video, we provide a comprehensive overview of how our ANPR technology works and highlight its key features and benefits.</p>
<p>The video begins by presenting real-life scenarios where ANPR can make a significant impact, such as toll collection, parking management, and enhancing security in public spaces. Through engaging visuals and informative narration, we demonstrate how our ANPR system revolutionizes these applications.</p>
              </div>
              <div className='col-lg-5 mr-auto mb-5'>
                 <video src="video/anpr.mp4" className="img-fluid" controls loop />
              </div>
            </div>
          </div>
        </div>
    )
}

export default Glance;