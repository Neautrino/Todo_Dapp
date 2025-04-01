import React from "react";

const Loading = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin text-blue-500">
          <i className="lucide lucide-loader h-10 w-10"></i>
        </div>
      </div>
    )
  }

  return (
    <>{children}</>
  )
};

export default Loading;