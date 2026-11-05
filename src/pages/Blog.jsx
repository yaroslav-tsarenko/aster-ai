import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import NewsletterForm from "../components/NewsletterForm";
import GradientCard from "../components/ui/GradientCard";
import Icon from "../components/ui/Icon";
import { blogCategories, blogPosts } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

export const PostCard = ({ post, index = 0 }) => (
  <Reveal as="li" delay={(index % 3) * 80}>
    <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full">
      <div className="relative mb-6 aspect-[16/10] rounded-3xl overflow-hidden border border-n-6">
        <img src={post.cover} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-n-8/80 backdrop-blur tagline text-n-2">{post.category}</span>
      </div>
      <div className="flex items-center gap-3 mb-3 text-xs text-n-4">
        <time>{post.date}</time>
        <span className="w-1 h-1 rounded-full bg-n-5" />
        <span>{post.readTime}</span>
      </div>
      <h2 className="h5 mb-3 transition-colors group-hover:text-color-1">{post.title}</h2>
      <p className="body-2 flex-1 mb-5 text-n-4">{post.excerpt}</p>
      <div className="flex items-center gap-3">
        <img src={post.author.avatar} alt="" width={32} height={32} loading="lazy" className="w-8 h-8 rounded-full object-cover" />
        <span className="text-sm text-n-3">{post.author.name}</span>
      </div>
    </Link>
  </Reveal>
);

const Blog = () => {
  usePageMeta("Blog", "Product news, prompt guides and engineering deep-dives from the Brainwave team.");
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const [featured, ...rest] = blogPosts;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
    );
  }, [category, query]);

  const showFeatured = category === "All" && !query;
  const list = showFeatured ? rest : filtered;

  return (
    <>
      <PageHero
        tag="Blog"
        title={
          <>
            Stories, guides & <span className="text-gradient">updates</span>
          </>
        }
        text="Product news, prompt recipes and behind-the-scenes engineering from the Brainwave team."
      />

      <Section>
        <div className="container">
          <div className="flex flex-col gap-4 mb-12 md:flex-row md:items-center md:justify-between">
            <SegmentedControl
              label="Filter articles by category"
              value={category}
              onChange={setCategory}
              size="sm"
              options={blogCategories.map((c) => ({ value: c, label: c }))}
            />
            <div className="relative md:w-72">
              <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-n-4" />
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className="w-full h-11 pl-11 pr-4 bg-n-7 border border-n-6 rounded-xl outline-none text-sm transition-colors focus:border-color-1 placeholder:text-n-4"
              />
            </div>
          </div>

          {showFeatured && (
            <Reveal className="mb-16">
              <Link to={`/blog/${featured.slug}`} className="group block">
                <GradientCard innerClassName="grid overflow-hidden lg:grid-cols-2" rounded="rounded-[2rem]" innerRounded="rounded-[1.9375rem]">
                  <div className="aspect-[16/10] lg:aspect-auto lg:min-h-[24rem] overflow-hidden">
                    <img src={featured.cover} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <span className="mb-4 tagline text-color-1">Featured · {featured.category}</span>
                    <h2 className="h3 mb-4 transition-colors group-hover:text-color-1">{featured.title}</h2>
                    <p className="body-2 mb-8 text-n-3">{featured.excerpt}</p>
                    <div className="flex items-center gap-3 text-sm text-n-4">
                      <img src={featured.author.avatar} alt="" width={36} height={36} className="w-9 h-9 rounded-full object-cover" />
                      <span className="text-n-2">{featured.author.name}</span>
                      <span>·</span>
                      <time>{featured.date}</time>
                    </div>
                  </div>
                </GradientCard>
              </Link>
            </Reveal>
          )}

          {list.length ? (
            <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {list.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center body-2 text-n-4 border border-dashed border-n-6 rounded-3xl">
              No articles found. Try a different search or category.
            </p>
          )}
        </div>
      </Section>

      <Section crosses id="newsletter">
        <div className="container">
          <Reveal className="max-w-2xl mx-auto text-center">
            <h2 className="h3 mb-4">Get the best of Brainwave, monthly</h2>
            <p className="body-2 mb-8 text-n-4">One email a month with new features, prompt tips and stories. Unsubscribe any time.</p>
            <NewsletterForm className="max-w-md mx-auto" />
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default Blog;
