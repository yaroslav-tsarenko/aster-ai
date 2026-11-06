import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../components/Section";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import NewsletterForm from "../components/NewsletterForm";
import Artwork from "../components/brand/Artwork";
import Avatar from "../components/brand/Avatar";
import { PostCard } from "./Blog";
import { blogPosts } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import useToast from "../hooks/useToast";
import { copyToClipboard } from "../lib/utils";
import NotFound from "./NotFound";

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-px" aria-hidden="true">
      <div className="h-full bg-accent origin-left" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
};

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="t-h3 mt-12 mb-4">{block.text}</h2>;
    case "quote":
      return <blockquote className="my-10 pl-5 border-l-2 border-accent text-xl leading-8 tracking-[-0.01em] text-fg">{block.text}</blockquote>;
    case "list":
      return (
        <ul className="my-6 space-y-2.5 pl-5 list-disc marker:text-fg-4">
          {block.items.map((i) => (
            <li key={i} className="t-body text-fg-2">{i}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="my-6 p-4 overflow-x-auto scrollbar-thin rounded-md bg-surface border border-line font-mono text-[0.8125rem] leading-6 text-fg-2">
          <code>{block.text}</code>
        </pre>
      );
    default:
      return <p className="t-body mb-6 text-fg-2 md:text-[1.0625rem] md:leading-8">{block.text}</p>;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const post = blogPosts.find((p) => p.slug === slug);
  usePageMeta(post ? post.title : "Article not found", post?.excerpt);

  if (!post) return <NotFound />;

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    const ok = await copyToClipboard(shareUrl);
    toast(ok ? "Link copied to clipboard" : "Could not copy the link", { tone: ok ? "success" : "error" });
  };

  return (
    <>
      <ReadingProgress />
      <section className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container">
          <Breadcrumbs
            className="mb-10"
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.category },
            ]}
          />
          <Reveal className="grid-12 gap-y-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-9">
              <p className="t-label mb-5 text-fg-3">{post.category} / {post.readTime}</p>
              <h1 className="t-h1">{post.title}</h1>
              <p className="t-lead max-w-2xl mt-6">{post.excerpt}</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap items-center gap-4 mt-10 pt-6 border-t border-line text-sm">
            <Avatar name={post.author.name} size={36} />
            <div>
              <p className="text-fg">{post.author.name}</p>
              <p className="text-xs text-fg-3">{post.author.role}</p>
            </div>
            <time className="ml-auto font-mono text-xs text-fg-3">{post.date}</time>
          </div>
        </div>
      </section>

      <div className="container">
        <Reveal className="aspect-[16/9] overflow-hidden rounded-xl border border-line md:aspect-[21/9]">
          <Artwork scene={post.cover.scene} palette={post.cover.style} seed={post.cover.seed} />
        </Reveal>
      </div>

      <section className="py-16 md:py-20">
        <div className="container grid-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-3">
              <p className="t-label text-fg-4">Share</p>
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center gap-2 text-sm text-fg-3 transition-colors hover:text-fg"
              >
                <Icon name="link" size={15} /> Copy link
              </button>
              <a
                href={`https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-fg-3 transition-colors hover:text-fg"
                aria-label="Share on X (opens in a new tab)"
              >
                <Icon name="external" size={15} /> Post on X
              </a>
            </div>
          </aside>
          <article className="col-span-4 md:col-span-8 lg:col-span-7">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 mt-16 pt-6 border-t border-line">
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-fg-2 transition-colors hover:text-fg">
                <Icon name="chevronLeft" size={15} /> All articles
              </Link>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 text-sm text-fg-3 transition-colors hover:text-fg lg:hidden"
                aria-label="Copy link to this article"
              >
                <Icon name="link" size={15} /> Copy link
              </button>
            </div>
          </article>
        </div>
      </section>

      <Section>
        <div className="container">
          <div className="flex items-end justify-between gap-4 mb-10">
            <h2 className="t-h2">Keep reading</h2>
            <Link to="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-fg-2 hover:text-fg">
              All articles <Icon name="arrowRight" size={14} />
            </Link>
          </div>
          <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </ul>
          <div className="grid-12 gap-y-6 items-end mt-20 pt-10 border-t border-line">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <h2 className="t-h3 mb-2">New posts, once a month</h2>
              <p className="t-small text-fg-3">No product announcements dressed up as articles.</p>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;
