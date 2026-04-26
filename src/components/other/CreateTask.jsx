import React from "react";

const CreateTask = () => {
  return (
    <div className=" w-full rounded-md p-5   mt-5  shadow-2xl bg-[#1c1c1c] ">
      <form action="" className="flex items-center justify-between">
        <div className="flex flex-col gap-4 w-[45%]">
          <div>
            <h3 className=" font-semibold text-sm text-gray-400">Task Title</h3>
            <input
              type="text"
              placeholder="make a video"
              className="border-2 border-gray-400 rounded-sm placeholder:text-gray-400 w-full outline-none"
            />
          </div>

          <div>
            <h3 className=" font-semibold text-sm text-gray-400">date</h3>
            <input
              type="date"
              name=""
              id=""
              className="w-full border-2 border-gray-400 rounded-sm placeholder:text-gray-400 outline-none"
            />
          </div>
          <div>
            <h3 className=" font-semibold text-sm text-gray-400">Asign to</h3>
            <input
              type="text"
              name=""
              placeholder="employee name"
              className="w-full border-2 border-gray-400 rounded-sm placeholder:text-gray-400
                outline-none"
            />
          </div>
          <div>
            <h3 className=" font-semibold text-sm text-gray-400">Category</h3>
            <input
              type="text"
              placeholder="design , dev, etc"
              className="border-2 w-full border-gray-400 rounded-sm placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 w-[45%]">
          <textarea
            className="border-2 border-emerald-700 rounded-md
                outline-none"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button className="text-white  outline-none  bg-emerald-600 text-xl py-2  rounded-sm">
            create task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
