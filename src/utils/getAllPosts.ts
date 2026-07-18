import { getCollection } from "astro:content";
import type { PostEntry } from "../types";

const postContentModules = import.meta.glob("../content/posts/**/*.{md,mdx}");

const getPostCollection = async (collection: "blog" | "posts") => {
  if (collection === "posts" && Object.keys(postContentModules).length === 0) {
    return [];
  }

  try {
    const entries = await getCollection(collection);
    return Array.isArray(entries) ? (entries as PostEntry[]) : [];
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes(`The collection **${collection}** does not exist`)
    ) {
      return [];
    }

    throw error;
  }
};

const getAllPosts = async (
  filter?: (post: PostEntry) => boolean
): Promise<PostEntry[]> => {
  const [legacyPosts, posts] = await Promise.all([
    getPostCollection("blog"),
    getPostCollection("posts"),
  ]);

  const postsBySlug = new Map<string, PostEntry>();

  for (const post of legacyPosts) {
    postsBySlug.set(post.slug, post);
  }

  for (const post of posts) {
    postsBySlug.set(post.slug, post);
  }

  const allPosts = Array.from(postsBySlug.values());
  return filter ? allPosts.filter(filter) : allPosts;
};

export default getAllPosts;
