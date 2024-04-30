"use client";

import React from "react";

export default function Modal(props) {
  // console.log(props)
  if (!props.isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm">
      <div className="w-[1050px] flex flex-col">
        <button
          className="text-xl font-bold text-red-500 place-self-end"
          onClick={() => props.onClose()}
        >
          X
        </button>
        <div className="p-2 bg-white rounded">{props.children}</div>
      </div>
    </div>
  );
}
