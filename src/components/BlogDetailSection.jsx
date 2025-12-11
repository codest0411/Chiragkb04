import useSWR from 'swr';
import { fetcher } from '../lib/api.js';

const formatDate = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

const BlogDetailSection = ({ blogId }) => {
  const { data: blog } = useSWR(blogId ? `/blogs/${blogId}` : null, fetcher);

  if (!blog) {
    return (
      <section id="blog" className="section" data-aos="fade-up">
        <div className="section-bar" data-aos="fade-down">Blog</div>
        <div className="card" data-aos="zoom-in">
          <button
            type="button"
            className="project-link mb-4"
            onClick={() => {
              if (typeof window !== 'undefined') window.location.hash = '#blog';
            }}
          >
            ← Back to blog list
          </button>
          <p>Loading blog...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section" data-aos="fade-up">
      <div className="section-bar" data-aos="fade-down">Blog Details</div>
      <div className="card blog-detail" data-aos="zoom-in">
        <button
          type="button"
          className="project-link mb-4"
          onClick={() => {
            if (typeof window !== 'undefined') window.location.hash = '#blog';
          }}
        >
          ← Back to blog list
        </button>
        {blog.preview_image_url && (
          <img
            src={blog.preview_image_url}
            alt={blog.title}
            className="blog-detail-image"
          />
        )}
        <div className="blog-detail-body" data-aos="fade-up" data-aos-delay={120}>
          <h2 className="blog-detail-title">{blog.title}</h2>
          {blog.published_at && (
            <p className="edu-dates">Published: {formatDate(blog.published_at)}</p>
          )}
          {blog.status && <p className="edu-dates">Status: {blog.status}</p>}
          {blog.excerpt && <p className="project-summary">{blog.excerpt}</p>}

          {blog.readme ? (
            <div className="blog-readme-wrapper">
              <h3 className="blog-readme-title">README</h3>
              <pre className="blog-readme">{blog.readme}</pre>
            </div>
          ) : (
            blog.content && <p className="edu-desc">{blog.content}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailSection;
