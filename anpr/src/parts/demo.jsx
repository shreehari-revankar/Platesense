import React, { useState, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import MagicDropzone from 'react-magic-dropzone';
import upload from './images/upload.png';
import './tes.css';
import { useDimension } from './utils/dimension-hook';
import {non_max_suppression} from './utils/proresult.js';
import {crop} from './utils/cropimg.js';


function shortenedCol(arrayofarray, indexlist) {
  return arrayofarray.map(function (array) {
      return indexlist.map(function (idx) {
          return array[idx];
      });
  });
}

function Demo(){
  const [model, setModel] = useState(null);
  const dimensions = useDimension();
  const [labels, setLabels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fil,setFil] = useState(0);
  const [filstate,setFilstate] = useState("Apply Filter");
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const imageRef = useRef(null);
  const MODEL_URL = process.env.PUBLIC_URL + '/detection/';
  const MODEL_JSON = MODEL_URL + 'model.json';
  const LABELS_URL= MODEL_URL + 'labels.json';
  
  const fetchModel = useCallback((model) => {
    setModel(model);
}, []);

const fetchLabels = useCallback((labels) => {
    setLabels(labels);
}, []);

  const loadModel = async () => {
    setLoading(true);
    const savedModel = localStorage.getItem('anpr');
    const savedLabels = localStorage.getItem('anprlabels');
    if (savedModel && savedLabels) {
      const model = await tf.loadGraphModel('indexeddb://anpr'); 
      let labels_json = JSON.parse(savedLabels);
      fetchModel(model);
      fetchLabels(labels_json);
      console.log("saved anpr found");
    } else {
      // Loading Model for first time
      const model = await tf.loadGraphModel(MODEL_JSON);
      fetchModel(model);
      const response = await fetch(LABELS_URL);
      let labels_json = await response.json();
      fetchLabels(labels_json)
      localStorage.setItem('anpr', true);
      model.save('indexeddb://anpr')
      localStorage.setItem('anprlabels', JSON.stringify(labels_json));
      console.log("saved anpr");
    }
    setLoading(false);
    setLoaded(true);
  }
  const checkModel = async () =>{
    const imagee =  new Image();
    imagee.src = image;
    const width1 = imagee.naturalWidth;
    const height1= imagee.naturalHeight;
    const batched = tf.tidy(() => {

      const img = tf.browser.fromPixels(imagee);
      const small = tf.image.resizeBilinear(img, [416, 416]).div(255);
      return small.expandDims(0);
      })
      const result = await model.execute(batched);
      const transRes =await result.transpose([0, 2, 1]);
      const boxes = tf.tidy(() => {
        const w = transRes.slice([0, 0, 2], [-1, -1, 1]); // get width
        const h = transRes.slice([0, 0, 3], [-1, -1, 1]); // get height
        const x1 = tf.sub(transRes.slice([0, 0, 0], [-1, -1, 1]), tf.div(w, 2)); // x1
        const y1 = tf.sub(transRes.slice([0, 0, 1], [-1, -1, 1]), tf.div(h, 2)); // y1
        let object = tf.concat([x1,y1,tf.add(x1, w),tf.add(y1, h)],2).squeeze();
        return object;
      });
      const scores = tf.tidy(() => {
        const rawScores = transRes.slice([0, 0, 4], [-1, -1, 1]).squeeze(); // class scores
        return rawScores;
      });
      var detections = non_max_suppression(boxes.arraySync(),scores.arraySync());
      const boxes_plot =  shortenedCol(detections, [0,1,2,3]);
      var ratio = [];
      ratio[0]=await (width1/416);
      ratio[1]=await (height1/416);
      const resultURL=await crop(imagee,boxes_plot,ratio,fil);
      setImage2(resultURL);
      tf.dispose(result);
      tf.dispose(transRes);
      tf.dispose(boxes);
      tf.dispose(scores);
      tf.dispose(detections);
  }
  const onDrop = (accepted, rejected, links) => {
    if (accepted && accepted.length > 0) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImage(reader.result);
        });
        reader.readAsDataURL(accepted[0]);
    }
}
const Applyfil = () => {
  if(fil===0){
    setFil(1);
   setFilstate("Remove Filter");
  }
  else{
    setFil(0);
   setFilstate("Apply Filter");
  }
  
}
  return (
    <div className="site-section bg-dark" id="demo">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 mb-5">
                  <h2 className="section-title">DEMO</h2>
                  <p>*Note: The Model is mostly suitable for backend. For demo purpose the model is deployed in front end. It may take time to load.</p>
                </div>
              </div>
            </div>
        <div className="header-div">
            <p className="demo-title">ANPR DETECTION</p>
            <p>This currently uses Custom YOLOv8 Model + Tesseract.js </p>
          </div>{loaded ? (<div><div className="center-div">
      <div className="card1"><MagicDropzone className="dropzone" accept="image/jpeg, image/png, .jpg, .jpeg, .png" multiple={false} onDrop={onDrop}>
        <div className="center-div-wrap">
          {image ? (
              <img className="dropzone-image" src={image} width="100px" alt="drop" />
          ) : (
              <div>
                  <div className="center-div">
                      <img src={upload} width="50" height="50" alt="upload" />
                  </div>
                  <div style={{ display: 'block' }}>
                      <p>Drag/drop files over here</p>
                  </div>
              </div>
          )}
      </div>
     </MagicDropzone></div>
     </div>
     <div className="center-div">
     {image2 ? (
         <div style={{
             width: `${dimensions.width}px`,
             height: `${dimensions.height}px`,
         }}>
             <div className="image-container">
                 <img 
                     src={image2} 
                     className="image-canvas"
                     alt="ok"
                     ref={imageRef}  
                     style={{
                       width: `${dimensions.width}px`,
                       height: `${dimensions.height}px`,
                   }}
                 />
             </div>
         </div>
     ):image ? (<div style={{
       width: `${dimensions.width}px`,
       height: `${dimensions.height}px`,
   }}>
       <div className="image-container">
           <img 
               src={image} 
               ref={imageRef} 
               alt="ok" 
               style={{
                 width: `${dimensions.width}px`,
                 height: `${dimensions.height}px`,
             }}
           />
       </div>
   </div>):<div></div>}</div>
   <div className="center-div" style={{ padding: '2em'}}>
   <button className="css-btn" style={{ width: '60%' }} onClick={Applyfil}>{filstate}</button>
   <button className="css-btn" style={{ width: '60%' }} onClick={checkModel}>Apply ANPR</button>
 </div></div>):
     loading ? <div className="center-div" style={{ padding: '2em'}}><button className="css-btn" style={{ width: '60%' }}>LOADING</button> </div>: <div className="center-div" style={{ padding: '2em'}}><button className="css-btn center-div" style={{ width: '60%' }} onClick={loadModel}><p>LOAD MODEL TOTAL SIZE-260 MB</p></button></div>}
     
     
     </div>);
}

export default Demo;