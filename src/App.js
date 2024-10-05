import React from 'react';
import './App.css';
import VideoRecorder from './components/VideoRecorder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Video Diary</h1>
        <VideoRecorder />
      </header>
    </div>
  );
}

export default App;
