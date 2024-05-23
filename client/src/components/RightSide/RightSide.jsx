import React, { useState } from "react";
import NavIcons from "../NavIcons/NavIcons";
import TrendCard from "../TrendCard/TrendCard";

export default function RightSide() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="fixed w-2/12 flex flex-col gap-2">
      <NavIcons />
      <TrendCard />
      <button
        className="h-[3rem] w-[80%] self-center"
        onClick={() => setOpenModal(true)}
      >
        Share
      </button>
    </div>
  );
}
