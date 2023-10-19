import React from "react";

export function BarraProgreso({ progress }) {
  const progressPercentage = `${progress}`;

  return (
    <div className="mt-2">
      <div className="bg-gray-300 h-4 rounded-full">
        <div
          className="bg-blue-500 h-full rounded-full"
          style={{ width: progressPercentage }}
        ></div>
      </div>
      <p className="mt-1 text-gray-600">{progressPercentage}</p>
    </div>
  );
}
