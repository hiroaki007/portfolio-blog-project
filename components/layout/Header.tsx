"use client";


import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { div } from "framer-motion/client";


export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <motion.header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center py-4 px-6 bg-gray-600">
                <Link href="/" className="text-2xl font-bold text-gray-300">My Portfolio</Link>

                <nav className="hidden md:flex space-x-6">
                    <ul className="flex md:flex space-x-6">
                        <li><Link href="/blog" className="hover:text-blue-500 transition">Blog</Link></li>
                        <li><Link href="/portfolio" className="hover:text-blue-500 transition">PortFolio</Link></li>
                        <li><Link href="/about" className="hover:text-blue-500 transition">About</Link></li>
                        <li><Link href="/contact" className="hover:text-blue-500 transition">Contact</Link></li>
                    </ul>                
                </nav>
                
                {/* ハンバーガーメニュー（モバイル用） */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Menu size={28} />
                </button>

                {/* モバイルメニュー */}

                {isOpen && (
                    <motion.div
                        className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden"
                        initial= {{ opacity: 0, y: -10 }}
                        animate= {{ opacity: 1, y: 0 }}
                    >
                        <nav className="flex flex-col items-center space-y-4 py-6 list-none">
                            <li><Link href="/blog" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>Blog</Link></li>
                            <li><Link href="/portfolio" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>PortFolio</Link></li>
                            <li><Link href="/about" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>About</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-500 transition" onClick={() => setIsOpen(false)}>Contact</Link></li>
                        </nav>
                        
                    </motion.div>
                )}

            </div>
        </motion.header>
    );
}