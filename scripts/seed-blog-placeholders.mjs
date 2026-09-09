// One-time scaffolding script — creates a draft placeholder for each of
// the 17 posts on the old WordPress site, using the titles/dates from
// the relaunch research (Debrief Relaunch artifact, "The back
// catalogue" table). Slugs here are best guesses (kebab-cased titles)
// and are UNCONFIRMED until the WordPress XML export is processed —
// see docs/MIGRATION.md. Every placeholder stays draft: true so it
// never appears on the live site or in the RSS feed until real content
// replaces it.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..', 'src', 'content', 'blog');

const posts = [
  ['Half-Life 1 Custom Map – Chaocity3 by Sulsa', '2022-10-04'],
  ['Migrating to Google Shared/Team Drive', '2019-07-31'],
  ["Using 'git sync' to automate common Git commands", '2018-03-16'],
  ['Migrating your project to Git LFS', '2017-09-29'],
  ['Creating a cutout shader for doors and windows', '2016-08-10'],
  ['Improving the FBX workflow between 3ds Max and Unity3D', '2016-07-15'],
  ['Why is Physics.UpdateBodies using up so much time? 20ms to 2ms', '2016-07-02'],
  ['Important Tips on Hiring a Video Games Writer', '2015-10-07'],
  ['How to Improve the Performance of Unity3D Animations', '2015-09-21'],
  ['Tuning Git for large binary repositories', '2014-12-14'],
  ['Using Meraki to deploy SMB networks', '2014-10-10'],
  ['Installing Mono3 on Ubuntu 12.04', '2014-08-18'],
  ['Edit and Apply registry settings via PowerShell', '2014-03-04'],
  ['Using Git with 3D Games', '2013-11-06'],
  ['Performing a Clean Install of F5 BIG-IP software', '2013-08-02'],
  ['Collaborative Code Design', '2013-07-02'],
  ['Unity 4 and Visual Studio 2012', '2013-06-23'],
];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

for (const [title, date] of posts) {
  const slug = slugify(title);
  const body = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `pubDate: ${date}`,
    'draft: true',
    `originalPath: "/${slug}/" # UNCONFIRMED — verify against the WordPress export`,
    '---',
    '',
    '_Placeholder — pending migration from the old WordPress export. Slug and originalPath above are a best guess from the title and need confirming against the real permalink before this goes live (draft: false)._',
    '',
  ].join('\n');
  await mkdir(root, { recursive: true });
  await writeFile(join(root, `${slug}.md`), body, 'utf8');
}

console.log(`Seeded ${posts.length} draft blog placeholders.`);
