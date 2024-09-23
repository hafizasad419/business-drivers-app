import React from 'react';
import { Blog } from '../../Components';
import { blogs } from './blogs'

const BlogPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-darkBlue mb-8">Latest Tech Insights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Blog key={blog.id} {...blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogPage;