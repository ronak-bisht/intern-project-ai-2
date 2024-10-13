// app/page.tsx

'use client'; // Add this directive at the top

import { useEffect, useState } from 'react';
import Link from 'next/link';
import stripHtmlTags from '@/lib/stripHtmlTags';

interface Blog {
  _id: string;
  blogId: string;
  title: string;
  content: string;
  author: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/blogs`, {
          cache: 'no-store', // Use 'no-store' to ensure fresh data is fetched each time
        });

        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }

        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Error fetching blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white shadow-md rounded-lg p-4">
              <Link href={`blog/${blog.blogId}`}>
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">
                  {blog.content.length > 100
                    ? `${stripHtmlTags(blog.content).substring(0, 100)}...`
                    : stripHtmlTags(blog.content)}
                </p>
                <p className="text-sm text-gray-500">Author: {blog.author}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
