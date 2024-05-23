import React from "react";
import { TrendData } from "../../Data/TrendData";

export default function TrendCard() {
  return (
    <div className="flex flex-col gap-[1rem] bg-[#FFFFFFA3] p-[1rem] rounded-[1rem] pl-[2rem]">
      <h3 className="">Trends for your</h3>
      {TrendData.map((data, id) => {
        return (
          <div className="flex flex-col gap-[0.5rem]" key={id}>
            <span className="font-bold">#{data.name}</span>
            <span className="text-[13px]">{data.shares}K shares</span>
          </div>
        );
      })}
    </div>
  );
}
