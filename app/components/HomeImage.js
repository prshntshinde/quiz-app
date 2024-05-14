"use client";
import React from "react";
import Image from "next/image";

import pic4 from "../../public/wallpaper-4.png";

const HomeImage = () => {
  return (
    <div id="">
      {/* <Image src={pic} alt="Church" />
      <div>
        <video autoPlay>
          <source src="../../public/hmc_video.mp4"></source>
        </video>
      </div> */}
      {/* <video src="../../public/hmc_video.mp4" autoPlay></video> */}
      {/* <Image
        src={pic5}
        alt="Church"
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
        sizes="90vw"
        style={{
          width: "100%",
          height: "800px",
        }}
      /> */}
      {/* <video
        autoplay
        loop
        muted
        style={{ width: "500px", height: "500px" }}
        src="https://www.youtube.com/watch?v=RcEelCkSioI&ab_channel=PrashantShinde"
      >
        <source src="https://www.youtube.com/watch?v=RcEelCkSioI&ab_channel=PrashantShinde" />
      </video> */}
      {/* <ReactPlayer
        light={<img src="pic5" alt="Thumbnail" />}
        url={"https://youtu.be/WSnTerUCG4o"}
        width="1000px"
        height="500px"
      /> */}

      <Image
        alt="Church Picture"
        src={pic4}
        className="max-w-full mx-auto rounded-lg shadow-xl dark:shadow-gray-800"
      />
    </div>
  );
};

export default HomeImage;
