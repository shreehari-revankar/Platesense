import React,{useRef} from 'react';
import './home.css';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Plate from './images/slide/slide1.jpg';
import Yolo from "./images/slide/slide2.png";
import Tess from './images/slide/slide3.jpg'
import TessYolo from './images/slide/slide4.jpg'
function Home(){
  const sliderRef = useRef(null);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
    return(
        <div className='contain align-card' id='home'>
          
            <Carousel  draggable={false} swipeable={false} afterChange={() => {sliderRef.current.previous();}} slides={1} responsive={responsive} arrows={false}  infinite={true}  autoPlay={true} autoPlaySpeed={3000}>
           <div className="card2">
            <h1 className='section-title2'>PLATESENSE</h1>
          <p className='para'>Introducing "Platesense," our cutting-edge number plate recognition system that combines the power of YOLOv8, a highly efficient object detection algorithm, with the accuracy of Tesseract, an open-source OCR engine. With Platesense, we have developed an advanced solution for real-time number plate detection and text extraction.</p>
                </div>
                <div className="card2">
            <h1 className='section-title2'>YOLOv8</h1>
          <p className='para'>YOLOv8 (You Only Look Once version 8) is an object detection algorithm known for its real-time object detection capabilities. It can efficiently detect and locate various objects, including vehicles and license plates, in an image or video. YOLOv8 is trained on a large dataset of labeled images, enabling it to accurately identify license plates within a given scene.</p>
                </div>
                <div className="card2">
            <h1 className='section-title2'>TESSERACT</h1>
          <p className='para'>Tesseract, on the other hand, is a popular open-source OCR (Optical Character Recognition) engine. It is capable of recognizing and extracting text from images, including the alphanumeric characters on license plates. Tesseract works by analyzing the visual patterns of the characters and converting them into machine-readable text.</p>
                </div>
                <div className="card2">
            <h1 className='section-title2'>TESSERACT WITH YOLOv8</h1>
          <p className='para'>By integrating YOLOv8 and Tesseract into a website, you can develop an ANPR system that takes an input image or video stream, processes it using YOLOv8 to identify and localize license plates, and then passes the extracted license plate images to Tesseract for text recognition.</p>
                </div>
              </Carousel>
              <Carousel draggable={false} swipeable={false}  ref={sliderRef} slides={1} responsive={responsive}  infinite={true}  arrows={false} >
           
              <div className="card2">
            <img className='img-fluid2' src = {Plate} />
            
                </div>
                <div className="card2">
            <img className='img-fluid2' src = {TessYolo} />
            
                </div>
                <div className="card2">
            <img className='img-fluid2' src = {Tess}/>
            
                </div>
                <div className="card2">
            <img className='img-fluid2' src = {Yolo} />
            
                </div>
              </Carousel>
          </div>
    )
}
export default Home;