"use client";

import React from "react";
//import clockSound from "../../public/clock.mp3";

const ClockAudio = () => {
  function play() {
    var audio = document.getElementById("clock-audio");
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
      <audio id="clock-audio" src="/clock.mp3">
        Audio
      </audio>
    </div>
  );
};

export default ClockAudio;
