import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Image from "next/image";            // ← added

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">blog</h1>
      </BlurFade>
      {posts
        .sort((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ? -1
            : 1
        )
        .map((post, id) => (
          <BlurFade
            delay={BLUR_FADE_DELAY * 2 + id * 0.05}
            key={post.slug}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center space-x-4 mb-4"
            >
              {/* Thumbnail */}
              {post.metadata.image && (
                <div className="relative w-32 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    fill
                    className="object-contain object-center"
                    priority={false}
                  />
                </div>
              )}

              {/* Title & Date */}
              <div className="flex flex-col">
                <p className="tracking-tight">{post.metadata.title}</p>
                <p className="h-6 text-xs text-muted-foreground">
                  {post.metadata.publishedAt}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
