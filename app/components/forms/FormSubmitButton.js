import React from "react";

export default function FormSubmitButton(props) {
  return (
    <button
      type="submit"
      className="p-2 text-white bg-blue-500 w-fit hover:scale-105"
      disabled={props.isLoading}
    >
      {props.isLoading && <span>Adding...</span>}
      {!props.isLoading && <span>{props.value}</span>}
    </button>
  );
}
