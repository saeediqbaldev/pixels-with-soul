import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import CustomCursor from "@/components/CustomCursor";

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background cursor-none md:cursor-none">
      <CustomCursor />

      {/* Header */}
      <header className="section-padding pt-12 pb-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-extrabold font-display text-heading hover:text-primary transition-colors"
          >
            Saeed<span className="text-primary">.</span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Page Title */}
      <section className="section-padding pt-12 pb-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-4 font-body">
            Knowledge Base
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display text-heading leading-[0.95]">
            Helpful Material<span className="text-primary">.</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl font-body">
            Insights, guides, and tips on web design, development, and growing your online presence.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group glass-card overflow-hidden hover-lift"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest text-primary font-body">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold font-display text-heading mt-3 mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-dim font-body">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-16">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-foreground font-body text-sm hover:bg-secondary transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-body text-sm font-medium transition-all ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-border text-foreground font-body text-sm hover:bg-secondary transition-all disabled:opacity-30 disabled:pointer-events-none"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
