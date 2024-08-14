import { Loader } from "lucide-react";
import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center flex-1">
      <Loader className="size-4 text-muted-foreground animate-spin" />
    </div>
  );
};

export default LoaderSpinner;
