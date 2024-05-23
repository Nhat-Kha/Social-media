import React from "react";

export default function Container({ children }) {
  return (
    <>
      <div className="text-red-500">{children}</div>
    </>
  );
}
