import React from "react";

export default function Skeleten() {
  return (
    <div className="bg-white shadow rounded-lg mb-6 animate-pulse">
      <div>
        <div className="flex flex-row px-2 py-3 mx-3">
          <div className="w-auto h-auto rounded-full">
            <div className="w-12 h-12 object-cover rounded-full shadow cursor-pointer bg-gray-300" />
          </div>
          <div className="flex flex-col w-full mb-2 ml-4 mt-1">
            <div className="bg-gray-300 h-8 w-full text-sm font-semibold rounded" />
            <div className="flex w-full mt-1">
              <div className="bg-gray-300 h-8 w-full font-thin text-xs rounded" />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100"></div>
        <div className="text-gray-300 font-medium text-sm mb-7 mt-6 mx-3 px-2">
          <div className="grid grid-cols-6 col-span-2   gap-2  ">
            <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
              <div className="h-full w-[735px] bg-gray-300 " />
            </div>
            <div className=" overflow-hidden rounded-xl col-span-3 max-h-[10rem]">
              <div className="h-40 w-[1470px] bg-gray-300" />
            </div>
            <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
              <div className="h-full w-[687p] bg-gray-300" />
            </div>
            <div className=" overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
              <div className="h-full w-[687px] bg-gray-300" />
            </div>
            <div className="relative overflow-hidden rounded-xl col-span-2 max-h-[10rem]">
              <div className="h-40 w-[765px] bg-gray-300" />
            </div>
          </div>
        </div>

        <div className="w-12/12 h-10 rounded bg-gray-300 text-sm mb-6 mx-3 px-2" />
      </div>
      <div className="flex justify-start mb-4 border-t border-gray-100 px-4">
        <div className="flex w-10 h-10 mt-1 pt-2 pl-5 rounded-full bg-gray-300" />
        <div className="flex justify-end w-full mt-1 pt-2 gap-2">
          <div className="flex w-10 h-10 mt-1 pt-2 pl-5 rounded-full bg-gray-300" />
          <div className="flex w-10 h-10 mt-1 pt-2 pl-5 rounded-full bg-gray-300" />
        </div>
      </div>
      <div className="flex w-full border-t border-gray-100">
        <div className="mt-3 mx-5 flex flex-row text-xs">
          <div className="flex w-14 h-6 bg-gray-300 font-normal rounded-md mb-2 mr-4 items-center" />
          <div className="flex w-14 h-6 bg-gray-300 font-normal rounded-md mb-2 mr-4 items-center" />
        </div>
        <div className="mt-3 mx-5 w-full flex justify-end text-xs">
          <div className="flex w-20 h-6 bg-gray-300 font-normal rounded-md mb-2 items-center" />
        </div>
      </div>

      {/* <CommentSection postId={data._id} /> */}
    </div>
  );
}
