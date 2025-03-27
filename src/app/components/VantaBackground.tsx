"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VantaBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && vantaRef.current instanceof HTMLElement) {
      import("vanta/dist/vanta.net.min").then((module) => {
        const VantaNet = module.default.NET;
        const effect = VantaNet({
            el: vantaRef.current!,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,        // ✅ Required by VantaOptions
            scaleMobile: 1.0,  // ✅ Required for mobile responsiveness
            color: 0xff3f81,
            backgroundColor: 0x000000,
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
