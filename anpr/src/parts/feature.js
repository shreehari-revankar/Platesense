import React from 'react';
import './home.css';
import Tm1 from './images/icons/12.png';
import Tm2 from './images/icons/11.png';
import Li1 from './images/icons/21.png';
import Li2 from './images/icons/22.png';
import Pk1 from './images/icons/31.png';
import Pk2 from './images/icons/32.png';
import Pm1 from './images/icons/41.png';
import Pm2 from './images/icons/42.png';
import To1 from './images/icons/51.png';
import To2 from './images/icons/52.png';
import Se1 from './images/icons/61.png';
import Se2 from './images/icons/62.png';
import MultiCarousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
function Fea(){
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return(
        <div className="site-section bg-dark" id="features-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-5">
                  <h2 className="section-title">Features</h2>
                </div>
              </div>
            </div>
            <div className='align-card'>
            <MultiCarousel slides={5} responsive={responsive} infinite={true} autoPlay={true} showDots={true} dotListClass="custom-dot-list-style" autoPlaySpeed={1800} >
           <div className="card">
                <div className="card-side front">
                <div className='align-card'><img src={Tm1} className='slide-icons'/><br></br><h3>Traffic Monitoring and Management</h3></div>
                </div>
                <div className="card-side back">
                <div className='align-card'><img src={Tm2} className='slide-icons'/><p>Number plate recognition systems can be used to monitor and manage traffic flow, detect violations such as speeding or running red lights, and provide valuable data for traffic analysis and planning.</p></div>
                </div>
                </div>
                <div className="card">
                <div className="card-side front">
                <div className='align-card'><img src={Li1} className='slide-icons'/><h3>Law Enforcement</h3></div>
                </div>
                <div className="card-side back">
                <div className='align-card'><img src={Li2} className='slide-icons'/><p>Advanced number plate recognition helps law enforcement agencies in identifying stolen vehicles, tracking suspects, and investigating criminal activities by automatically comparing number plate data with databases of wanted vehicles or persons of interest.</p></div>
                </div>
                </div><div className="card">
                <div className="card-side front">
                <div className='align-card'><img src={Pk1} className='slide-icons'/><h3>Parking Management</h3></div>
                </div>
                <div className="card-side back">
                <div className='align-card'><img src={Pk2} className='slide-icons'/><p>Number plate recognition systems are employed in parking facilities for automated entry and exit, ticketless parking, and efficient enforcement of parking regulations.</p></div>
                </div>
                </div><div className="card">
                <div className="card-side front">
                <div className='align-card'><img src={Pm1} className='slide-icons'/><h3>Electronic Payment Systems</h3></div>
                </div>
                <div className="card-side back">
                <div className='align-card'><img src={Pm2} className='slide-icons'/><p>Advanced number plate recognition enables seamless integration with electronic payment systems, facilitating cashless transactions at fuel stations, drive-through restaurants, and other service points.</p></div>
                </div>
                </div><div className="card">
                <div className="card-side front">
                <div className='align-card'><img src={To1} className='slide-icons'/><h3>Toll Collection</h3></div>
                </div>
                <div className="card-side back">
                <div className='align-card'><img src={To2} className='slide-icons'/><p>Automated toll collection systems use number plate recognition to identify vehicles and charge appropriate toll fees without the need for manual intervention, improving efficiency and reducing congestion at toll booths.</p></div>
                </div>
                </div><div className="card">
                <div className="card-side front">
                <div className='align-card'><img src={Se1} className='slide-icons'/><h3>Road Safety and Surveillance</h3></div>
                </div>
                <div className="card-side back">
                <div className='align-card'><img src={Se2} className='slide-icons'/><p>Advanced number plate recognition assists in monitoring and enforcing road safety regulations by detecting and penalizing traffic violations, enhancing overall road safety and reducing accidents.</p></div>
                </div>
              </div>
              </MultiCarousel>
              </div>
        </div>
    )
}

export default Fea;