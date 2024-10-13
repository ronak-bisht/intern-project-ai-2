"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const UpdateBlogPage = ({ params }: { params: { id: string } }) => {
    const [blog, setBlog] = useState({ title: '', content: '', author: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [contentError, setContentError] = useState<string | null>(null); // Error for content validation

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/blogs/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch blog details');
                }
                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError('Error loading blog details.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogDetails();
    }, [params.id]);

    const stripHtmlTags = (str: string) => {
        if (!str) return '';
        return str.replace(/<\/?[^>]+(>|$)/g, "").trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const handleContentChange = (value: string) => {
        setBlog({ ...blog, content: value });
        if (value && stripHtmlTags(value) !== '') {
            setContentError(null); // Clear error if content is valid
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation: Check if the Quill editor content is empty
        if (!blog.content || stripHtmlTags(blog.content) === '') {
            setContentError('Content is required.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/blogs/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blog),
            });
            if (!response.ok) {
                throw new Error('Failed to update blog');
            }
            alert('Blog updated successfully!');
        } catch (err) {
            setError('Error updating blog.');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Update Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={blog.author}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Content</label>
                    <ReactQuill
                        value={blog.content}
                        theme="snow"
                        onChange={handleContentChange}
                    />
                    {contentError && <div className="text-red-500 text-xs mt-2">{contentError}</div>}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Update Blog
                </button>
            </form>
        </div>
    );
};

export default UpdateBlogPage;
