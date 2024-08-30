import React from "react";

const Loading = ({ message }) => {
  return (
    <div className="flex flex-col h-full m-auto w-[700px]">
      <div role="status" className="max-w-[700px] animate-pulse relative mt-40">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        {message && (
          <p className="mt-4 mb-2 text-sm text-gray-500 dark:text-gray-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
