"use client"

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    github: string;
    tags: string[];
};


export default function Portfolio() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => {
            setProjects(data);
            setFilteredProjects(data);
        })
        .catch((err) => console.error(err));
    }, []);


    // タグをクリックしたときのフィルター処理
    const filterByTag = (tag: string | null) => {
        if(tag === selectedTag) {
            setSelectedTag(null);
            setFilteredProjects(projects);
        } else {
            setSelectedTag(tag);
            setFilteredProjects(projects.filter((project) => project.tags.includes(tag!)));
        }
    };

    // 検索処理（タイトル & 説明）
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        const lowerCaseQuery = query.toLowerCase();

        const searchedProjects = projects.filter(
            (p) =>
                p.title.toLowerCase().includes(lowerCaseQuery) ||
                p.description.toLowerCase().includes(lowerCaseQuery)      
        );

        setFilteredProjects(searchedProjects);
    };



    // タグ一覧を取得
    const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)));


    return (
        <motion.section 
            className="container mx-auto py-10 my-10"
            initial= {{ opacity: 0, y: 20}}
            animate= {{ opacity: 1, y: 0}}
            transition={{ duration: 0.6}}
        >
            <h1 className="text-5xl font-bold text-center mb-8">ポートフォリオ</h1>

            {/* 検索バー */}
            <motion.div 
                className="flex justify-center mb-6"
                initial= {{ opacity: 0, y: -10}}
                animate= {{ opacity: 1, y: 0}}
                transition= {{delay: 0.2, duration: 0.5}}
            >
                <input 
                    type="text" 
                    placeholder="プロジェクトを検索..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md w-80 text-black"
                />
            </motion.div>

            {/* {タグフィルター} */}
            <motion.div 
                className="flex flex-wrap justify-center gap-2 mb-6"
                initial= {{ opacity: 0, y: -10 }}
                animate= {{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5}}
            >
                <button 
                    onClick={() => filterByTag(null)}
                    className={`px-3 py-1 rounded-md text-sm ${
                    selectedTag === null ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                }`}
                >
                    すべて
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => filterByTag(tag)}
                        className={`px-3 py-1 rounded-md text-sm ${
                            selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                        }`}
                    >
                        {tag}
                    </button>
                )) }

            </motion.div>


            <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-1 gap-6"
                initial= {{ opacity: 0}}
                animate= {{ opacity: 1}}
                transition={{ delay: 0.4, duration: 0.5}}
            >
                {filteredProjects.length > 0 ? ( 
                    filteredProjects.map((project) => (
                        <motion.div 
                            key={project.id} className="bg-white shadow-md rounded-lg p-4"
                            initial= {{ opacity: 0, y: 30}}
                            animate= {{ opacity: 1, y: 0}}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                            
                            
                            <img
                                src={project.image}
                                alt={project.title}                     
                                className="w-full h-64 object-cover"
                            />

                            <h2 className="text-x1 font-semibold mt-4">{project.title}</h2>
                            <p className="text-gray-600 mt-2">{project.description}</p>
                            <div className="flex gap-2 mt-4">
                                {project.tags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => filterByTag(tag)}
                                        className={`px-2 py-1 text-sm rounded-md ${
                                            selectedTag === tag ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-800"
                                        }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <Link href={`/portfoilo/${project.id}`} className="text-blue-500 hover:underline">
                                    詳細を見る
                                </Link>
                                <Link href={project.url} className="text-gray-600 dark:text-gray-400 hover:text-gray-800">
                                    デモを見る
                                </Link>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-3">該当するプロジェクトがありません。</p>
                )}
            </motion.div>
        </motion.section>
    );
}