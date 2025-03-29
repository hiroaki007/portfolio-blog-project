"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion"; 
import Image from "next/image";
import Link from "next/link";


type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    github: string;
    tags: string[];
}



export default function ProjectDetail() {
    const params = useParams(); 
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);


        useEffect(() => {
            const fetchProject = async () => {
                
                if(!params.id) return;
                try {

                    const res = await fetch("/api/projects")
                    if (!res.ok) throw new Error("データ取得に失敗しました。");
                    const data: Project[] = await res.json();

                    const foundProject = data.find((p:Project) => p.id === params.id);
                        if(!foundProject) {
                            router.push("/portfolio");
                        } else {
                            setProject(foundProject);
                        }
                        
                } catch(error) {
                        console.error( error);
                        router.push("/portfolio");
                } finally {
                        setLoading(false);
                } 
            };

            fetchProject();    
        }, [params.id]);
        
        if (loading) {
            return <p className="text-center text-gray-600">読み込み中...</p>;
          }
        
          if (!project) {
            return <p className="text-center text-red-500">プロジェクトが見つかりませんでした。</p>;
          }
        

    return (

        <motion.section 
            className="container mx-auto py-10 mb-6"
            initial= {{ opacity: 0, y: 20}}
            animate= {{ opacity: 1, y: 0}}
            transition={{duration: 0.6 }}
        >
            <h1 className="text-4xl font-bold text-center mb-6 text-white dark:text-gray-800">{project.title}</h1>
            <motion.div 
                className="flex justify-center mb-6"
                initial= {{scale: 0.9, opacity: 0}}
                animate= {{scale: 1, opacity: 1}}
                transition={{ duration: 0.6}}
            >
                
                <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="rounded-lg shadow-md"
                />
            </motion.div>

            <motion.div 
                className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
                initial= {{ opacity: 0}}
                animate= {{ opacity: 1}}
                transition={{ delay: 0.5, duration: 0.7}}
            >

                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link 
                        href={project.github} 
                        target="_blank" 
                        className="flex-1 text-center bg-gray-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition"
                    >
                        GitHub リポジトリ
                    </Link>

                    <Link 
                        href={project.url} 
                        target="_blank"
                        className="flex-1 text-center bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500 transition"
                        >
                        
                        デモサイトを見る
                    </Link>
                </div>


            </motion.div>
            <div className="mt-8 text-center">
                <Link 
                    href="/portfolio"
                    className="text-blue-500 hover:underline text-lg font-semibold"
                >
                    ← ポートフォリオ一覧に戻る
                </Link>
            </div>
        </motion.section>
    );
}
