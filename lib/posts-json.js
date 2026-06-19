import fs from 'fs';
import path from 'path';

// Path to the JSON file
const postsFilePath = path.join(process.cwd(), 'data/posts.json');

// Helper: read and parse JSON file
function getPostsData() {
  const fileContents = fs.readFileSync(postsFilePath, 'utf8');
  return JSON.parse(fileContents);
}

// Return all posts sorted alphabetically by team, including id (slug)
export function getSortedPostsData() {
  const allPosts = getPostsData();

  return allPosts
    .map((post) => ({
      id: post.team.toLowerCase().replace(/\s+/g, '-'), // slug for dynamic routes
      title: post.team,
      date: post.division,
      contentHtml: `<p>Division: ${post.division}</p>`,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

// Return array of objects with `params: { id }` for dynamic routes
export function getAllPostIds() {
  const allPosts = getPostsData();
  return allPosts.map((post) => ({
    params: { id: post.team.toLowerCase().replace(/\s+/g, '-') },
  }));
}

// Given an ID, return that single post
export function getPostData(id) {
  const allPosts = getPostsData();
  const post = allPosts.find(
    (p) => p.team.toLowerCase().replace(/\s+/g, '-') === id
  );
  if (!post) return null;

  return {
    id,
    title: post.team,
    date: post.division,
    contentHtml: `<p>Division: ${post.division}</p>`,
  };
}
