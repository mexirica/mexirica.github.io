import type { CollectionEntry } from 'astro:content';

export const sortPosts = (posts: CollectionEntry<'blog'>[]) =>
  [...posts].sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());

export const sortWorks = (works: CollectionEntry<'works'>[]) =>
  [...works].sort((a, b) => {
    const order =
      (a.data.order ?? Number.MAX_SAFE_INTEGER) - (b.data.order ?? Number.MAX_SAFE_INTEGER);
    return order || b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
  });

export const collectTags = (posts: CollectionEntry<'blog'>[]) =>
  [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
