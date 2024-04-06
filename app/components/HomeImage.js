"use client";
import React from "react";
import Image from "next/image";
// import pic from "../../public/wallpaper-2.png";
// import pic3 from "../../public/wallpaper-3.png";
import pic4 from "../../public/wallpaper-4.png";
// import pic5 from "../../public/wallpaper-5.svg";
// import homepageVideo from "../../public/hmc_video1.webp";
// import homepageVideo2 from "../../public/hmc_video2.webp";
// import ReactPlayer from "react-player";

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
