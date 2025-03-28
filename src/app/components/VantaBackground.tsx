"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    let effectInstance: any = null;

    if (typeof window !== "undefined" && vantaRef.current) {
      import("vanta/dist/vanta.net.min").then((VANTA) => {
        // Ensure correct access to VANTA.NET
        const VantaNet = (VANTA as any).default || (VANTA as any).NET;
        if (typeof VantaNet === "function") {
          effectInstance = new VantaNet({
            el: vantaRef.current,
            THREE, // ✅ Explicitly pass THREE.js
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff3f81,
            backgroundColor: 0x000000,
          });

          setVantaEffect(effectInstance);
        }
      });
    }

    return () => {
      if (effectInstance && typeof effectInstance.destroy === "function") {
        effectInstance.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="h-screen w-full absolute top-0 left-0 -z-10" />;
};

// ✅ Ensure it's client-side only
export default dynamic(() => Promise.resolve(VantaBackground), { ssr: false });
