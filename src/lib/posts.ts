import { getCollection, type CollectionEntry } from "astro:content";

export const PAGE_SIZE = 6;
const WORDS_PER_MINUTE = 200;
const RELATED_COUNT = 3;

export async function getPublishedPosts(): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) return "دقيقة واحدة";
  if (minutes === 2) return "دقيقتان";
  if (minutes >= 3 && minutes <= 10) return `${minutes} دقائق`;
  return `${minutes} دقيقة`;
}

export function formatArabicDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-SA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    numberingSystem: "latn",
  }).format(date);
}

export function getRelatedPosts(
  current: CollectionEntry<"blog">,
  allPosts: CollectionEntry<"blog">[],
): CollectionEntry<"blog">[] {
  const others = allPosts.filter((post) => post.id !== current.id);

  const scored = others.map((post) => {
    const sharedTags = post.data.tags.filter((tag) => current.data.tags.includes(tag)).length;
    return { post, sharedTags };
  });

  scored.sort((a, b) => {
    if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
    return b.post.data.date.valueOf() - a.post.data.date.valueOf();
  });

  return scored.slice(0, RELATED_COUNT).map(({ post }) => post);
}
