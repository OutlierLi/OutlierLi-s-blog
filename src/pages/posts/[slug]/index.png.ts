import type { APIRoute } from "astro";
import { generateOgImageForPost } from "@utils/generateOgImages";
import getAllPosts from "@utils/getAllPosts";
import { slugifyStr } from "@utils/slugify";
import type { PostEntry } from "../../../types";

export async function getStaticPaths() {
  const posts = await getAllPosts(({ data }) => !data.draft && !data.ogImage);

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await generateOgImageForPost(props as PostEntry), {
    headers: { "Content-Type": "image/png" },
  });
