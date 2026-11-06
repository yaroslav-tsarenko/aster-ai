import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import Section from "../components/Section";
import Reveal from "../components/ui/Reveal";
import SegmentedControl from "../components/ui/SegmentedControl";
import NewsletterForm from "../components/NewsletterForm";
import Icon from "../components/ui/Icon";
import Artwork from "../components/brand/Artwork";
import Avatar from "../components/brand/Avatar";
import { blogCategories, blogPosts } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

export const PostCard = ({ post, index = 0 }) => (
  <Reveal as="li" delay={(index % 3) * 60}>
    <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full">
      <div className="mb-5 aspect-[16/10] overflow-hidden rounded-lg border border-line">
        <Artwork
          scene={post.cover.scene}
          palette={post.cover.style}
          seed={post.cover.seed}
          className="transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <div className="flex items-center gap-3 mb-3 font-mono text-2xs text-fg-3">
        <span className="text-fg-2">{post.category}</span>
        <span className="text-fg-4">/</span>
        <time>{post.date}</time>
        <span className="text-fg-4">/</span>
        <span>{post.readTime}</span>
      </div>
      <h2 className="t-h4 mb-2 transition-colors group-hover:text-fg-2">{post.title}</h2>
      <p className="t-small flex-1 mb-5 text-fg-3">{post.excerpt}</p>
      <div className="flex items-center gap-2.5">
        <Avatar name={post.author.name} size={26} />
        <span className="text-sm text-fg-2">{post.author.name}</span>
      </div>
    </Link>
  </Reveal>
);

const Blog = () => {
  usePageMeta("Blog", "Product notes, research workflows and engineering write-ups from the Aster team.");
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
        label="Blog"
        title="Notes on research, writing and the product"
        text="How we build Aster, and how people use it for briefs, papers and campaigns. One post every two weeks or so."
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
      />

      <section className="pb-20 md:pb-24 lg:pb-32">
        <div className="container">
          <div className="flex flex-col gap-4 pb-6 mb-12 border-b border-line md:flex-row md:items-center md:justify-between">
            <SegmentedControl
              label="Filter articles by category"
              value={category}
              onChange={setCategory}
              options={blogCategories.map((c) => ({ value: c, label: c }))}
            />
            <div className="relative md:w-72">
              <Icon name="search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
              <label htmlFor="blog-search" className="sr-only">Search articles</label>
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles"
                className="w-full h-9 pl-9 pr-3 bg-surface border border-line-strong rounded-md outline-none text-sm transition-colors focus:border-fg-3 placeholder:text-fg-4"
              />
            </div>
          </div>

          {showFeatured && (
            <Reveal className="mb-16 lg:mb-20">
              <Link to={`/blog/${featured.slug}`} className="group grid-12 gap-y-6 items-center">
                <div className="col-span-4 md:col-span-8 lg:col-span-7 aspect-[16/10] overflow-hidden rounded-lg border border-line">
                  <Artwork
                    scene={featured.cover.scene}
                    palette={featured.cover.style}
                    seed={featured.cover.seed}
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="col-span-4 md:col-span-8 lg:col-span-5">
                  <p className="t-label mb-4 text-fg-3">Latest / {featured.category}</p>
                  <h2 className="t-h2 mb-4 transition-colors group-hover:text-fg-2">{featured.title}</h2>
                  <p className="t-lead mb-8">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-sm text-fg-3">
                    <Avatar name={featured.author.name} size={30} />
                    <span className="text-fg-2">{featured.author.name}</span>
                    <time className="font-mono text-2xs">{featured.date}</time>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {list.length ? (
            <ul className="grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {list.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </ul>
          ) : (
            <p className="py-20 text-center text-sm text-fg-3 border border-dashed border-line-strong rounded-lg">
              No articles match. Try another search or category.
            </p>
          )}
        </div>
      </section>

      <Section id="newsletter">
        <div className="container grid-12 gap-y-6 items-end">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-6">
            <h2 className="t-h2 mb-3">One email a month</h2>
            <p className="t-lead">New posts, release notes and a research workflow worth stealing. Unsubscribe in one click.</p>
          </Reveal>
          <Reveal delay={80} className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8">
            <NewsletterForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
};

export default Blog;
