"use client"
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import formatBlogName from '@/lib/formatBlogName';
import 'react-quill/dist/quill.snow.css';
import API_URL from '../../../config/config';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function AdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });
  const [view, setView] = useState<'list' | 'create'>('list'); // State to toggle between views
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const router = useRouter();

  const stripHtmlTags = (str: string) => {
    if (!str) return '';
    return str.replace(/<\/?[^>]+(>|$)/g, "").trim();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await fetch(`${API_URL}/api/blogs`);
    const data = await response.json();
    setBlogs(data.blogs);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`${API_URL}/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setShowDeleteModal(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if the Quill editor content is empty
    if (!newBlog.content || stripHtmlTags(newBlog.content) === '') {
      setErrorMessage('Content is required.');
      return;
    }

    const response = await fetch(`${API_URL}/api/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBlog, blogId: formatBlogName(newBlog.title) }),
    });

    if (response.ok) {
      fetchBlogs(); // Refresh the blog list
      setNewBlog({ title: '', content: '', author: '' }); // Reset form
      setErrorMessage(''); // Clear any previous error message
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Page</h1>

      <div className="mb-4">
        <button
          onClick={() => setView('list')}
          className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${view === 'list' ? 'font-bold' : ''}`}
        >
          Blog List
        </button>
        <button
          onClick={() => setView('create')}
          className={`bg-green-500 text-white px-4 py-2 rounded ${view === 'create' ? 'font-bold' : ''}`}
        >
          Create Blog
        </button>
      </div>

      {/* Blog List View */}
      {view === 'list' && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Blogs</h2>
          <ul>
            {blogs.map((blog) => (
              <li key={blog._id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                <div>
                  <h3 className="font-semibold">{blog.title}</h3>
                  <p>{stripHtmlTags(blog.content).substring(0, 50)}...</p>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setBlogToDelete(blog._id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => router.push(`/admin/update/${blog.blogId}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {showDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-lg">
                <h3>Are you sure you want to delete this blog?</h3>
                <div className="mt-4">
                  <button
                    onClick={() => handleDelete(blogToDelete!)}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Blog Form */}
      {view === 'create' && (
        <form onSubmit={handleCreateBlog} className="mb-6">
          <h2 className="text-xl font-semibold">Create Blog</h2>
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            placeholder="Title"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          <div className="mb-4">
            <label className="block mb-2 text-[0.9rem] text-black font-semibold" htmlFor="blogDescription">Blog Description</label>
            <ReactQuill
              value={newBlog.content}
              theme='snow'
              onChange={(value) => setNewBlog({ ...newBlog, content: value })}
            />
            {errorMessage && <div className="text-red-500 text-xs mt-2">{errorMessage}</div>}
          </div>
          <input
            type="text"
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
            placeholder="Author"
            required
            className="border rounded p-2 mb-2 w-full"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Create Blog
          </button>
        </form>
      )}
    </div>
  );
}
