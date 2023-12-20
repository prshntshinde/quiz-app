import React from "react";
import Image from "next/image";
import pic from "../../public/wallpaper-2.png";
import pic3 from "../../public/wallpaper-3.png";
import pic4 from "../../public/wallpaper-4.png";
import pic5 from "../../public/wallpaper-5.svg";
import homepageVideo from "../../public/hmc_video1.webp";
import homepageVideo2 from "../../public/hmc_video2.webp";

const HomeImage = () => {
  return (
    <div>
      {/* <Image src={pic} alt="Church" />
      <div>
        <video autoPlay>
          <source src="../../public/hmc_video.mp4"></source>
        </video>
      </div> */}
      {/* <video src="../../public/hmc_video.mp4" autoPlay></video> */}
      <Image
        src={pic5}
        alt="Church"
        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 33vw"
        sizes="90vw"
        style={{
          width: "100%",
          height: "800px",
        }}
      />
    </div>
  );
};

export default HomeImage;
