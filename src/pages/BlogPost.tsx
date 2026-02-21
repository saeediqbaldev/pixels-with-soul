import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import CustomCursor from "@/components/CustomCursor";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-bold font-display text-heading mt-8 mb-3">
            {block.replace("### ", "")}
          </h3>
        );
      }
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold font-display text-heading mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("> ")) {
        return (
          <blockquote
            key={i}
            className="border-l-4 border-primary pl-6 py-2 my-8 text-lg italic text-muted-foreground font-body"
          >
            {block.replace("> ", "")}
          </blockquote>
        );
      }
      if (block.startsWith("| ")) {
        const rows = block.split("\n").filter((r) => !r.match(/^\|\s*-/));
        const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim());
        const data = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
        return (
          <div key={i} className="overflow-x-auto my-6">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface">
                  {headers?.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left text-heading font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, j) => (
                  <tr key={j} className="border-t border-border">
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 text-muted-foreground">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      if (block.startsWith("```")) {
        const code = block.replace(/```\w*\n?/, "").replace(/```$/, "");
        return (
          <pre key={i} className="bg-surface rounded-xl p-6 my-6 overflow-x-auto text-sm font-mono text-foreground border border-border">
            <code>{code}</code>
          </pre>
        );
      }
      if (block.match(/^(\d+\.\s|\-\s)/m)) {
        const items = block.split("\n").filter(Boolean);
        const isOrdered = items[0]?.match(/^\d+\./);
        const ListTag = isOrdered ? "ol" : "ul";
        return (
          <ListTag
            key={i}
            className={`my-4 space-y-2 font-body text-muted-foreground ${
              isOrdered ? "list-decimal" : "list-disc"
            } pl-6`}
          >
            {items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{
                __html: item
                  .replace(/^(\d+\.\s|\-\s)/, "")
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                  .replace(/`(.*?)`/g, '<code class="bg-surface px-1.5 py-0.5 rounded text-primary text-sm">$1</code>')
              }} />
            ))}
          </ListTag>
        );
      }
      return (
        <p
          key={i}
          className="text-muted-foreground font-body leading-relaxed mb-4"
          dangerouslySetInnerHTML={{
            __html: block
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
              .replace(/`(.*?)`/g, '<code class="bg-surface px-1.5 py-0.5 rounded text-primary text-sm">$1</code>')
          }}
        />
      );
    });
  };

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
            to="/blog"
            className="flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="section-padding pt-8 pb-0">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-primary font-body">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-heading mt-4 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-body mb-10">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="section-padding pb-0">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden aspect-[16/9]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section-padding py-12">
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 lg:p-16">
          {renderContent(post.content)}
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold font-display text-heading mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.id}`}
                  className="group glass-card overflow-hidden hover-lift"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs uppercase tracking-widest text-primary font-body">
                      {rp.category}
                    </span>
                    <h3 className="text-lg font-bold font-display text-heading mt-2 group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
