import React, { useRef } from 'react';

// import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';

function App() {
  //Setup References
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //Load facemesh
  const runFacemsh = async () => {
    const net = await facemesh.load({
      inputResolution: { width: 640, height: 480 }, scale: 0.8
    });
    setInterval(() => {
      detect(net)
    }, 100)
  };

  //Detect Function
  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
      //Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //Set Video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set Canvas width 
      canvasRef.current.width = videoWidth;
      canvasRef.current.heigth = videoHeight;

      //Make detections
      const face = await net.estimateFaces(video);
      console.log(face);

      //Get canvas context for drawing
    }
  };

  runFacemsh();

  return (
    <div className="App">
      <header className='App-header'>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "centr",
            zIndex: 9,
            width: 640,
            height: 480
          }} />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "centr",
            zIndex: 9,
            width: 640,
            height: 480
          }} />

      </header>

    </div>
  );
}

export default App;
