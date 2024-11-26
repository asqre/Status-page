import React from "react";
import { ImSpinner9 } from "react-icons/im";

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-start justify-center z-[5000000] select-none">
      <div className="relative flex flex-col items-center gap-4 mt-[20%]">
        <ImSpinner9
          size={30}
          className="animate-spin"
          color="var(--color-primary)"
        />
        <p className="text-primary font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
