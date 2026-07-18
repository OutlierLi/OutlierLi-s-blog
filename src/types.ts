import type socialIcons from "@assets/socialIcons";
import type { CollectionEntry } from "astro:content";

type LegacyPostEntry = CollectionEntry<"blog">;

export type PostEntry = Omit<LegacyPostEntry, "collection"> & {
  collection: "blog" | "posts";
};
export type PostData = LegacyPostEntry["data"];

export type Site = {
  website: string;
  author: string;
  desc: string;
  title: string;
  ogImage?: string;
  lightAndDarkMode: boolean;
  postPerPage: number;
  scheduledPostMargin: number;
};

export type SocialObjects = {
  name: keyof typeof socialIcons;
  href: string;
  active: boolean;
  linkTitle: string;
}[];
