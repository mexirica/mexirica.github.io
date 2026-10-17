import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';
import { localizedPath } from './url';

type BlogEntry = CollectionEntry<'blog'>;
type WorkEntry = CollectionEntry<'works'>;

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

export const postsForLocale = (posts: BlogEntry[], locale: Locale) =>
  posts.filter((post) => post.data.locale === locale);

export const postSlug = (post: BlogEntry) => post.data.slug ?? post.id.split('/').at(-1)!;

export const postTranslationKey = (post: BlogEntry) => post.data.translationKey ?? postSlug(post);

export const postPath = (post: BlogEntry) =>
  localizedPath(`/blog/${postSlug(post)}/`, post.data.locale);

export const worksForLocale = (works: WorkEntry[], locale: Locale) =>
  works.filter((work) => work.data.locale === locale);

export const workSlug = (work: WorkEntry) =>
  work.data.slug ?? work.data.translationKey ?? work.id.split('/').at(-1)!;

export const workTranslationKey = (work: WorkEntry) => work.data.translationKey ?? workSlug(work);

export const workPath = (work: WorkEntry) =>
  localizedPath(`/works/${workSlug(work)}/`, work.data.locale);
