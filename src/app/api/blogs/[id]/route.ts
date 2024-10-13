import dbConnect from "@/lib/dbConnect";
import Blog from "@/model/blogSchema";
import { NextResponse } from "next/server";

// Fetch a single blog (GET /api/blogs/[id])
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await dbConnect();
        const blog = await Blog.findOne({blogId:params.id});
        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
};


// Update a blog (PUT /api/blogs/[id])
export const PUT = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        const body = await req.json();
        await dbConnect();
        
        // Find the blog by blogId and update it
        const updatedBlog = await Blog.findOneAndUpdate(
            { blogId: params.id }, // Match the blog by blogId
            body,
            { new: true } // Return the updated document
        );

        if (!updatedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog updated", blog: updatedBlog }, { status: 200 });
    } catch (error) {
        console.error("Error updating blog:", error);
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
};


// Delete a blog (DELETE /api/blogs/[id])
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    try {
        await dbConnect();
        const deletedBlog = await Blog.findByIdAndDelete(params.id);
        if (!deletedBlog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Blog deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
    }
};
