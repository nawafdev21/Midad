import { getCollection, type CollectionEntry } from "astro:content";

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => b.data.year - a.data.year);
}
