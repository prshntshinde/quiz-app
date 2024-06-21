"use client";
import React from "react";
import Image from "next/image";

import pic4 from "../../public/wallpaper-4.png";

const HomeImage = () => {
  return (
    <div id="">
      <Image
        alt="Church Picture"
        src={pic4}
        className="max-w-full mx-auto rounded-lg shadow-xl dark:shadow-gray-800"
      />
    </div>
  );
};

export default HomeImage;
