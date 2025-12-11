import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

const getContentPreview = (content, maxLength = 320) => {
  if (!content) return '';
  if (content.length <= maxLength) return content;
  return `${content.slice(0, maxLength).trim()}...`;
};

const BlogSection = ({ onOpenBlog }) => {
  const { data: blogs } = useSWR('/blogs', fetcher);

  return (
    <section id="blog" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Blog</div>
      <div className="projects-grid">
        {blogs?.map((blog, index) => (
          <button
            key={blog.id}
            type="button"
            className="card blog-card"
            data-aos="fade-up"
            data-aos-delay={index * 80}
            onClick={() => onOpenBlog?.(blog.id)}
          >
            {blog.preview_image_url && (
              <img
                src={blog.preview_image_url}
                alt={blog.title}
                className="blog-preview-image"
              />
            )}
            <h3 className="blog-title">{blog.title}</h3>
            {blog.published_at && (
              <p className="blog-card-date">{formatDate(blog.published_at)}</p>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
