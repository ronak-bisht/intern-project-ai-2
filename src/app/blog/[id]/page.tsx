
import React from 'react';
import API_URL from '../../../../config/config';

const BlogDetailPage = async ({ params }: { params: { id: string } }) => {
    // Fetch the blog details using the dynamic id
    const response = await fetch(`${API_URL}/api/blogs/${params.id}` ,{
        cache: 'no-store', // Ensure fresh data is fetched each time
    });
    const blog = await response.json();
    if (response.status === 404) {
        return <div>Blog not found.</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-700 mb-4">By: {blog.author}</p>
            <div className="bg-gray-100 p-4 rounded">
                
                  <div
            className="" // Tailwind class for better typography
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
            </div>
          
        </div>
    );
};

export default BlogDetailPage;
