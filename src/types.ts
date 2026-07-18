import type socialIcons from "@assets/socialIcons";
import type { CollectionEntry } from "astro:content";

type PrimaryPostEntry = CollectionEntry<"posts">;

export type PostEntry = Omit<PrimaryPostEntry, "collection"> & {
  collection: "blog" | "posts";
};
export type PostData = PrimaryPostEntry["data"];

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
