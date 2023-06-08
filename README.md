![PLATESENSE](/INFO/logo2.png)

# Platesense
An Advance Number Plate Recognition System.

You can try the demo [here](https://shreehari-revankar.github.io/Platesense/).

![Demo](/INFO/demo.png)

This repository contains the implementation of an Automatic Number Plate Recognition (ANPR) system using the YOLO (You Only Look Once) object detection framework and the Tesseract Optical Character Recognition (OCR) engine. ANPR is a technology that enables the automatic detection, extraction, and recognition of vehicle license plates from images or video streams. The repository encompasses all the necessary components to deploy a robust ANPR system. 

## Description

Manual recognition relies on human operators visually inspecting and recording license plate numbers, which is time-consuming and prone to human error. It is a labor-intensive process that becomes challenging when dealing with high volumes of vehicles. Human operators can experience fatigue, leading to reduced accuracy and missed plate readings. Additionally, manual recognition lacks real-time capabilities, limiting its effectiveness in applications such as law enforcement or toll collection, where immediate identification and response are crucial.

ANPR systems address these limitations by automating the process, providing faster, more accurate, and real-time license plate recognition capabilities.The ANPR system aims to automatically detect and recognize license plates from images or video streams. It leverages the power of YOLO, a state-of-the-art deep learning algorithm, to efficiently locate and extract the regions of interest (ROI) that contain license plates within the input images. The YOLO model has been trained on a dataset of labeled license plate images, enabling it to accurately identify and localize license plates in real-time.

Once the license plate regions are extracted, the Tesseract.js engine is utilized to extract the textual data from the plates. Tesseract is a robust OCR library that can accurately recognize characters and digits from images. It processes the extracted license plate regions and converts them into text, providing the recognized alphanumeric information from the license plates.

## Dataset

Our comprehensive dataset comprises a collection of high-resolution images capturing traffic scenes. These images depict a variety of vehicles present on the road, and each vehicle's license plate region is annotated with corresponding coordinate values. The dataset is specifically captured using cameras installed on traffic light signals, ensuring a consistent and standardized perspective.

Our dataset offers a rich collection of images that encompass various aspects of traffic and license plate detection. It serves as a valuable resource for training and evaluating ANPR systems, enabling the development of robust and accurate solutions for automatic number plate recognition.

You can check dataset [here.](https://universe.roboflow.com/pesu-zokxc/all-camera-violations)

## Training

 * We have developed a custom YOLO (You Only Look Once) model specifically trained to detect the Region of Interest (ROI), which corresponds to the number plate region in images. YOLO is a state-of-the-art object detection algorithm known for its efficiency and accuracy in real-time object detection tasks.

 * The training process involves feeding our model with a large dataset of annotated images, consisting of various vehicle images with labeled number plate regions. By iteratively optimizing the model's parameters, it learns to accurately identify and localize number plate regions in different images.

 * Once the YOLO model is trained, we take the additional step of converting it into TensorFlow.js (TFJS) format. TensorFlow.js is a library that allows running machine learning models directly in a web browser or on a Node.js server. By converting the model to TFJS, we ensure compatibility and enable seamless deployment in Node.js environments.

# Dependencies

* [TensorFlow.js](https://www.tensorflow.org/js)
* [Tesseract.js](https://tesseract.projectnaptha.com/)
* [npm](https://www.npmjs.com/)
* [React.js](https://reactjs.org/)

# Installation

### Prerequisites

Install Node.js and npm using the link above. Follow instructions on their respective websites. Npm is included with Node.js

### Instructions

Clone the repository
```bash
git clone https://github.com/shreehari-revankar/Platesense.git
```

Install all the dependencies
```bash
cd anpr
npm install
```

# Usage

Run the project
```bash
cd anpr
npm start
```

Open a web browser and go to
```bash
http://localhost:3000
```

## License

This project is licensed under the MIT License. Feel free to modify and distribute it according to the terms of the license.

## Acknowledgements

We would like to acknowledge the creators of the YOLO algorithm for their valuable contributions to the field of object detection. Their work has been instrumental in making this project possible.

## Contact

For any inquiries or questions, please feel free to contact.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[MIT License Link](https://github.com/shreehari-revankar/Platesense/blob/main/LICENSE)