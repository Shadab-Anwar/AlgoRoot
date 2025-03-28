import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-transparent shadow-sm dark:bg-transparent">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-white sm:text-center dark:text-white">
          © 2025 <Link href="/" className="hover:underline">DashSync™</Link>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
