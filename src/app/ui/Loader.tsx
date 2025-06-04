import React from "react";

import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <FiLoader className="text-5xl animate-spin text-blue-500 duration-1000" />
    </div>
  );
};

export default Loader;
