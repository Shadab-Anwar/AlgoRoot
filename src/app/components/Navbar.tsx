"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {

      const router = useRouter();
      const [user, setUser] = useState<{ name: string } | null>(null);
    
      useEffect(() => {
        const storedUser = localStorage.getItem("userSession"); // Retrieve the user session
      
        if (!storedUser) {
          router.push("/auth/login"); // Redirect if no user is found
        } else {
          setUser(JSON.parse(storedUser)); // Store the correct user in state
        }
      }, []);
      
    
      const handleLogout = () => {
        localStorage.removeItem("userSession"); // Clear only the session data
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
      
        localStorage.removeItem("userSession"); // Remove session
        localStorage.removeItem(username); // Remove user data
      
        alert("Your account has been deleted.");
        router.push("/auth/register");
      };

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    // Add event listener when dropdown is open
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
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://res.cloudinary.com/duwddcqzi/image/upload/v1743104740/dashsync-high-resolution-logo_geqvsq.png" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          DashSync
          </span>
        </a>

        {/* User Button and Dropdown */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
          >
            <span className="sr-only ">Open user menu</span>
            <img className="w-10 h-10 mr-20 rounded-full cursor-pointer" src="https://res.cloudinary.com/duwddcqzi/image/upload/v1743104563/Basic_Ui__186_vbb7pk.jpg" alt="user photo" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div ref={dropdownRef} className="absolute right-0 mr-8 mt-44 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{user ? `Hello ! ${user.name}` : "Welcome to AlgoRoot!"}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  {user ? <button className="block cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleLogout}>Logout User</button> : <a href="/auth/login">Login</a>}
                </li>
                <li>
                {user ? <button className="block cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" onClick={handleDeleteAccount}>Delete User</button> : <a href="/auth/register">Login</a>}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
