// app/page.tsx
import Image from 'next/image';

import axios from 'axios';
import Link from 'next/link';
import stripHtmlTags from '@/lib/stripHtmlTags';
// async function fetchBlogs(): Promise<Blog[]> {
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
//     cache: 'no-store', // To prevent caching if you want the latest data every time
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch blogs');
//   }

//   const data = await response.json();
//   return data.blogs;
// }

export default async function BlogList() {
  let blogs: Blog[] = [];

  try {
    // blogs = await fetchBlogs();
    const {data}=await axios(`http://localhost:3000/api/blogs`)
    blogs=data.blogs
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            
          
            <div key={blog._id} className="bg-white c-shadow-md rounded-lg p-4">
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
