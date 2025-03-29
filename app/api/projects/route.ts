import { NextResponse } from "next/server";
import { promises as fs} from "fs";
import path from "path";

export async function GET() {
    
    try {
        const filePath = path.join(process.cwd(), "public/data/projects.json");
        const jsonData = await fs.readFile(filePath, "utf-8"); // 非同期でファイルを読み込む
        const projects = JSON.parse(jsonData);
    
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({error: "Failed to load projects data"}, {status: 500});
    }
}