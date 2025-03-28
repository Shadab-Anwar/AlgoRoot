"use client";
import Details from "./components/Details";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import React, { useEffect, useState } from "react";
import { Stars } from "@react-three/drei";  
import { Canvas } from "@react-three/fiber";
import { 
  useMotionTemplate, 
  useMotionValue, 
  motion, 
  animate 
} from "framer-motion";
import Sidebar from "./components/Sidebar";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];


export default function Home() {
  const color = useMotionValue(COLORS_TOP[0]);

useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;


  return (<>
    <div>
      <main className="flex-grow">
      
      <motion.section
  style={{
    backgroundImage: useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  }}
  className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-950 text-gray-200"
>
  {/* ✅ Fixed Navbar at the Top */}
  <div className="absolute top-0 left-0 w-full z-50">
    <Navbar />
    <Sidebar/>
  </div>

  {/* Main Content */}
  <div className="w-full z-20 flex justify-center items-center flex-col mt-20 px-8">
    <Details />
  </div>

  <Footer />

  {/* Background Stars */}
  <div className="absolute inset-0 pointer-events-none">
    <Canvas>
      <Stars radius={50} count={3000} factor={4} fade speed={2} />
    </Canvas>
  </div>
</motion.section>
      </main>
    </div>

    </>
  );
}



