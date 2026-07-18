import type { PostEntry } from "../types";
import type { ContentSectionKey } from "../data/contentSections";

const getPostsForSection = (posts: PostEntry[], section: ContentSectionKey) =>
  posts.filter(post => post.data.tags.includes(section));

export default getPostsForSection;
