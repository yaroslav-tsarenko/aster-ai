import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Section from "../components/Section";
import Breadcrumbs from "../components/ui/Breadcrumbs";
import Reveal from "../components/ui/Reveal";
import Icon from "../components/ui/Icon";
import NewsletterForm from "../components/NewsletterForm";
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
    <div className="fixed top-[4.75rem] left-0 right-0 z-40 h-0.5 lg:top-[5.25rem]" aria-hidden="true">
      <div className="h-full bg-conic-gradient origin-left" style={{ transform: `scaleX(${progress / 100})` }} />
    </div>
  );
};

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="h4 mt-12 mb-4">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-color-1 quote text-n-1">“{block.text}”</blockquote>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3 pl-5 list-disc marker:text-color-1">
          {block.items.map((i) => (
            <li key={i} className="body-2 text-n-2">{i}</li>
          ))}
        </ul>
      );
    case "code":
      return (
        <pre className="my-6 p-5 overflow-x-auto scrollbar-thin rounded-2xl bg-n-7 border border-n-6 font-code text-sm leading-6 text-color-2">
          <code>{block.text}</code>
        </pre>
      );
    default:
      return <p className="body-1 mb-6 text-n-3">{block.text}</p>;
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
    toast(ok ? "Link copied to clipboard" : "Couldn't copy the link", { tone: ok ? "success" : "error" });
  };

  return (
    <>
      <ReadingProgress />
      <Section crosses customPaddings className="pt-12 pb-12 md:pt-20 lg:pt-24">
        <div className="container max-w-4xl relative z-2">
          <Breadcrumbs
            className="mb-10"
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.category },
            ]}
          />
          <Reveal>
            <span className="inline-block mb-5 px-3 py-1 rounded-full bg-n-7 tagline text-color-1">{post.category}</span>
            <h1 className="h1 mb-8">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-n-4">
              <img src={post.author.avatar} alt="" width={44} height={44} className="w-11 h-11 rounded-full object-cover" />
              <div>
                <p className="text-n-1">{post.author.name}</p>
                <p className="text-xs">{post.author.role}</p>
              </div>
              <span className="hidden sm:block w-px h-8 bg-n-6" />
              <time>{post.date}</time>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </Section>

      <div className="container max-w-5xl">
        <Reveal className="p-0.5 rounded-3xl bg-conic-gradient">
          <div className="aspect-[16/9] rounded-[1.4rem] overflow-hidden bg-n-8">
            <img src={post.cover} alt="" className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>

      <Section>
        <article className="container max-w-3xl">
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <div className="flex flex-wrap items-center justify-between gap-4 mt-16 pt-8 border-t border-n-6">
            <Link to="/blog" className="inline-flex items-center gap-2 button text-n-3 transition-colors hover:text-n-1">
              <Icon name="chevronLeft" size={16} /> All articles
            </Link>
            <div className="flex items-center gap-2">
              <span className="mr-2 text-sm text-n-4">Share</span>
              <button
                type="button"
                onClick={copyLink}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-n-7 text-n-3 transition-colors hover:bg-n-6 hover:text-n-1"
                aria-label="Copy link to this article"
              >
                <Icon name="link" size={18} />
              </button>
              <a
                href={`https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-n-7 text-n-3 transition-colors hover:bg-n-6 hover:text-n-1"
                aria-label="Share on X (opens in a new tab)"
              >
                <Icon name="external" size={18} />
              </a>
            </div>
          </div>
        </article>
      </Section>

      <Section crosses>
        <div className="container">
          <h2 className="h3 mb-12">Keep reading</h2>
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <PostCard key={p.slug} post={p} index={i} />
            ))}
          </ul>
          <div className="max-w-xl mx-auto mt-24 text-center">
            <h2 className="h5 mb-3">Enjoyed this article?</h2>
            <p className="body-2 mb-6 text-n-4">Get new posts delivered to your inbox once a month.</p>
            <NewsletterForm />
          </div>
        </div>
      </Section>
    </>
  );
};

export default BlogPost;
