import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        await dbConnect();
        await Blog.create(body);
        return NextResponse.json({ message: "Blog created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
    }
};

export const GET = async () => {
    try {
        await dbConnect();
        const blogs = await Blog.find();
        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
};
