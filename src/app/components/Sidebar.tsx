"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        !(event.target as HTMLElement).closest("#sidebar") &&
        !(event.target as HTMLElement).closest("#menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        id="menu-button"
        onClick={toggleSidebar}
        className="absolute top-5 right-5 z-[60] bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {/* Overlay (Darker Background when Sidebar Opens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[50]"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-5 z-[100] shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className={`block px-4 py-2 rounded-lg transition ${
                pathname === "/" ? "bg-blue-500" : "hover:bg-gray-700"
              }`}
            >
              Details Page
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;


