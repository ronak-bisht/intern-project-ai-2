import mongoose, { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    blogId: { type: String, required: true },
    author: { type: String },
    createdAt: { type: Date, default: Date.now },
    readTime: { type: String },
});

// Check if the model already exists before defining it
const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
