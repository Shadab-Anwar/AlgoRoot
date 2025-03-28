"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./Sidebar";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userSession");
    if (!storedUser) {
      router.push("/auth/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]); 

  const handleLogout = () => {
    localStorage.removeItem("userSession");
    alert("Logged out successfully!");
    router.push("/auth/login");
  };

  const handleDeleteAccount = () => {
    const storedUserSession = localStorage.getItem("userSession");
    if (!storedUserSession) {
      alert("No user account found.");
      return;
    }
    const user = JSON.parse(storedUserSession);
    const username = user.username;

    localStorage.removeItem("userSession");
    localStorage.removeItem(username);

    alert("Your account has been deleted.");
    router.push("/auth/register");
  };

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image
            src="https://res.cloudinary.com/duwddcqzi/image/upload/v1743104740/dashsync-high-resolution-logo_geqvsq.png"
            alt="DashSync Logo"
            width={40}
            height={40}
            className="h-8"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DashSync
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
          >
            <span className="sr-only">Open user menu</span>
            <Image
              src="https://res.cloudinary.com/duwddcqzi/image/upload/v1743104563/Basic_Ui__186_vbb7pk.jpg"
              alt="User Photo"
              width={40}
              height={40}
              className="w-10 h-10 mr-20 rounded-full cursor-pointer"
            />
          </button>

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mr-8 mt-44 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {user ? `Hello ! ${user.name}` : "Welcome to AlgoRoot!"}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  {user ? (
                    <button
                      className="block cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleLogout}
                    >
                      Logout User
                    </button>
                  ) : (
                    <Link href="/auth/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Login
                    </Link>
                  )}
                </li>
                <li>
                  {user ? (
                    <button
                      className="block cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleDeleteAccount}
                    >
                      Delete User
                    </button>
                  ) : (
                    <Link href="/auth/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      Register
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
        <Sidebar/>
      </div>
    </nav>
  );
}
