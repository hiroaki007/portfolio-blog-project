"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// import { div } from "framer-motion/client";

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  github: string;
  tags: string[];
};


export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
      fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.slice(0, 3)))
      .catch((err) => console.error(err));
    }, []);





  return (
    <motion.section
      className="container mx-auto py-10 px-4 my-8"
      initial= {{opacity: 0, y: 20}}
      animate= {{opacity: 1, y: 0}}
      transition={{ duration: 0.4 }}
    >
        <h1>Welcome to My Portfolio</h1>
        <p>
          ブログやポートフォリオをチェックしてみてね！
        </p>

        
        {/* {ポートフォリオ一覧} */}

        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
            最新のプロジェクト
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
              initial={{ opacity: 0, y: 30}}
              animate={{ opacity: 1, y: 0}}
              transition={{ delay: index * 0.1, duration: 0.5}}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
                  {project.description}
                </p>

                <div className="mt-4 flex justify-between items-center">
                  <Link href={`/portfolio/${project.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    詳細を見る
                  </Link>

                  <Link href={project.url}
                        target="_blank"
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800"
                  >
                    デモを見る
                  </Link>
                </div>
              </div>
            </motion.div>

          ))}
        </div>
        
        {/* {もっとみるボタン} */}
        <div className="text-center mt-10">
          <Link href="/portfolio"
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500 transition"
          >
            もっと見る →
          </Link>
        </div>

        {/* {ポートフォリオ一覧} */}




    </motion.section>
    
  );
}
