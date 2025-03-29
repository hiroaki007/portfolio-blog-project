"use client"

import { useState, useEffect } from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {

    const [date, setDate] = useState("");

    useEffect(() => {
        
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // `getMonth()` は 0 (1月) から始まるため +1
        const day = String(today.getDate()).padStart(2, "0");

        setDate(`${year}年${month}月${day}日`);

    }, []);


    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">

                {/* フッターの左側 */}
                <div className="mb-6 md:mb-0">
                    <h2 className="text-lg font-semibold">MyPortfolio</h2>
                    <p className="text-sm text-gray-400">クリエイティブなプロジェクトを紹介</p>
                    <Link href="/portfolio" className="text-blue-400 hover:text-blue-300 mt-2 inline-block">
                        ポートフォリオを見る→
                    </Link>
                </div>

                {/* SNSリンク */}
                <div className="flex space-x-6">
                    <Link href="https://twitter.com/" target="_blank">
                        <FaTwitter className="text-white hover:text-blue-400 transition text-xl" />
                    </Link>
                    <Link href="https://github.com/" target="_blank">
                        <FaGithub className="text-white hover:text-blue-400 transition text-xl" />
                    </Link>
                    <Link href="https://linkedin.com/" target="_blank">
                        <FaLinkedin className="text-white hover:text-blue-400 transition text-xl" />
                    </Link>
                </div>

            </div>
            
            <div className="text-center text-gray-500 text-sm mt-6">
            <p>&copy; {date} My Portfolio. All rights reserved.</p>
            </div>

        </footer>
    );
}
