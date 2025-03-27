"use client"; // ✅ Ensures this runs only on the client-side

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && vantaRef.current) {
      import("vanta/dist/vanta.net.min").then((VANTA) => {
        const effect = VANTA.default({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,

          // 🎨 Customize Colors Here
          color: 0xff3f81, // Red lines
          backgroundColor: 0x000000, // Black background
        });

        setVantaEffect(effect);
      });
    }

    return () => {
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        vantaEffect.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="h-screen w-full absolute top-0 left-0 -z-10" />;
};

export default VantaBackground;