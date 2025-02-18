/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const filename: any = req.nextUrl.searchParams.get("filename");
    const blob = fs.readFileSync(`${process.cwd()}/public/${filename}`);
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "image/*",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
