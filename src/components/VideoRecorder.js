import React, { useRef, useState } from 'react';

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  
      // Check audio and video streams
      const audioTracks = stream.getAudioTracks();
      const videoTracks = stream.getVideoTracks();
  
      if (audioTracks.length > 0) {
        console.log("Audio track detected:", audioTracks[0].label);
      } else {
        console.log("No audio track available");
      }
  
      if (videoTracks.length > 0) {
        console.log("Video track detected:", videoTracks[0].label);
      } else {
        console.log("No video track available");
      }

      // Display the stream in the video element
      videoRef.current.srcObject = stream;
      
      // Initialize the MediaRecorder with both audio and video tracks
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus' // Ensure audio is captured
      });
      let chunks = [];
  
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
  
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setVideoBlob(blob);
        chunks = [];
      };
  
      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h1>Video Recorder</h1>
      <video ref={videoRef} autoPlay playsInline></video>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {videoBlob && (
        <a href={URL.createObjectURL(videoBlob)} download="recording.webm">
          Download Video
        </a>
      )}
    </div>
  );
};

export default VideoRecorder;
