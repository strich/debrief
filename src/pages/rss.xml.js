import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// Served at /rss.xml. The old WordPress feed lived at /feed/ — that path
// now 301s here (see public/_redirects) rather than being replicated
// exactly, since Astro's routing can't cheaply produce a bare "/feed/"
// endpoint. Feed readers follow the redirect transparently, so nobody
// subscribed from 2017 loses the feed.
export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
  return rss({
    title: 'Debrief — Abstractions and Notes',
    description: 'Practical AI infrastructure and game-repo engineering notes from Scott Richmond.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      // Posts moved from / to /blog/ in the theme upgrade. Existing
      // subscribers keep their items: an item's <link> changing does not
      // re-deliver it, because the <guid> is derived from this link only
      // if unset — see below.
      link: `/blog/${post.id}/`,
    })),
  });
}
