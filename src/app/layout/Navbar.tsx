'use client'

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-[1240px] mx-auto">
        <div className="text-xl font-bold">Team Management App</div>

        {/* Hamburger menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-10">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/pages/manage-team-members" className="hover:underline">Manage Members</Link>
          <Link href="/pages/contact-us" className="hover:underline">Contact Us</Link>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setIsOpen(false)} className="hover:underline">Home</Link>
          <Link href="/pages/manage-team-members" onClick={() => setIsOpen(false)} className="hover:underline">Manage Members</Link>
          <Link href="/pages/contact-us" onClick={() => setIsOpen(false)} className="hover:underline">Contact Us</Link>
        </div>
      )}
    </nav>
  );
}
