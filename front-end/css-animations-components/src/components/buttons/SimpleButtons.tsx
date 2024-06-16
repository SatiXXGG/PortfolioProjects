import { useState } from "react";
import Box from "../containers/Box";

export default function SimpleButton() {
  const [isSelected, setSelect] = useState(false);
  const settedClass = isSelected ? "bg-green-500" : "bg-red-500";
  return (
    <Box className="px-4">
      <button className="w-32 rounded-md px-2 py-2 text-md hover:scale-105 active:scale-110 bg-purple-800 text-white transition-all">
        Example
      </button>
      <button
        onClick={() => setSelect(isSelected ? false : true)}
        className={
          "rounded-md px-2 py-2 text-md hover:scale-105 active:scale-110  text-white transition-all " +
          settedClass
        }
      >
        {isSelected ? "Selected" : "Not Selected"}
      </button>

      <button className="bg-cyan-600 text-white hover:scale-105 active:scale-110 rounded-md px-2 py-2 text-md flex relative transition-all text-center">
        Copy
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#ffffff"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="absolute right-2 bottom-[25%]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
          <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
        </svg>
      </button>
    </Box>
  );
}
