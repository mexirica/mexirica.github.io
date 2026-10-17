import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { withBase } from '../lib/url';
import { SITE } from '../consts';
import { locale } from '../i18n';
import { postPath, postsForLocale, sortPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = sortPosts(
    postsForLocale(await getCollection('blog', ({ data }) => !data.draft), 'en'),
  );

  return rss({
    title: SITE.title,
    description: SITE.rssDescription,
    site: context.site ?? 'https://example.com',
    // Feed readers use <language> to pick a reading direction and hyphenation.
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
