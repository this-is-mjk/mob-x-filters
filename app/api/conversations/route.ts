import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

let cachedData: any = null;

export async function GET() {
  if (!cachedData) {
    const filePath = path.join(
      process.cwd(),
      "app",
      "data",
      "conversations.json"
    );
    try {
      const fileContents = await fs.readFile(filePath, "utf-8");
      cachedData = JSON.parse(fileContents);
    } catch (err) {
      console.error("Error reading conversations.json:", err);
      return NextResponse.json(
        { error: "Failed to load data" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(cachedData);
}
