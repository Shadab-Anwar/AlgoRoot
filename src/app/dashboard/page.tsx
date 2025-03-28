"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userSession"); 
  
    if (!storedUser) {
      router.push("/auth/login"); 
    } else {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("userSession"); // Removes the stored user session
    alert("Logged out successfully!");
    router.push("/auth/login"); // Redirect to login page
  };
  
  const handleDeleteAccount = () => {
    const storedUserSession = localStorage.getItem("userSession");
  
    if (!storedUserSession) {
      alert("No user account found.");
      return;
    }
  
    const user = JSON.parse(storedUserSession);
    const username = user.username;
  
    // Remove user session and stored user data
    localStorage.removeItem("userSession");
    localStorage.removeItem(username);
  
    alert("Your account has been deleted.");
    router.push("/auth/register");
  };
  
  
  

  return user ? (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleDeleteAccount}>Delete your account</button>
    </div>
  ) : null; // Hide UI until redirection happens
}

