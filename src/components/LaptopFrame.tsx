import React from "react";

const LaptopFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-[hsl(220,20%,96%)]">
      <div className="w-full max-w-4xl">
        {/* Screen bezel */}
        <div className="bg-[hsl(220,10%,20%)] rounded-t-2xl p-[10px] pb-0">
          {/* Camera dot */}
          <div className="flex justify-center mb-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(220,10%,35%)]" />
          </div>
          {/* Screen */}
          <div className="rounded-t-md overflow-hidden bg-background" style={{ height: "min(65vh, 520px)" }}>
            {children}
          </div>
        </div>
        {/* Keyboard base */}
        <div
          className="h-4 bg-gradient-to-b from-[hsl(220,10%,78%)] to-[hsl(220,10%,72%)] rounded-b-lg"
          style={{
            clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Bottom lip */}
        <div className="mx-auto w-[60%] h-1 bg-[hsl(220,10%,68%)] rounded-b-full" />
      </div>
    </div>
  );
};

export default LaptopFrame;
