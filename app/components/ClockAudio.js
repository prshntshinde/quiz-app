"use client";

import React from "react";

const ClockAudio = () => {
  function play() {
    const audio = document.getElementById("clock-audio");
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }
  return (
    <div>
      <button onClick={play}>Clock Audio</button>
      <audio id="clock-audio" src="/clock-45s.mp3">
        Audio
      </audio>
    </div>
  );
};

export default ClockAudio;
