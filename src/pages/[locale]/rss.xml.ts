import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext, GetStaticPaths } from 'astro';
import { SITE } from '../../consts';
import { PREFIXED_LOCALES, type Locale } from '../../i18n';
import { getPageStrings } from '../../i18n/pages';
import { postPath, postsForLocale, sortPosts } from '../../lib/content';
import { withBase } from '../../lib/url';

export const getStaticPaths = (() =>
  PREFIXED_LOCALES.map((locale) => ({
    params: { locale },
    props: { locale },
  }))) satisfies GetStaticPaths;

export async function GET(context: APIContext) {
  const { locale } = context.props as { locale: Locale };
  const posts = sortPosts(
    postsForLocale(await getCollection('blog', ({ data }) => !data.draft), locale),
  );
  return rss({
    title: SITE.title,
    description: getPageStrings(locale).rssDescription,
    site: context.site ?? 'https://example.com',
    customData: `<language>${locale}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: withBase(postPath(post)),
      categories: post.data.tags,
    })),
  });
}
