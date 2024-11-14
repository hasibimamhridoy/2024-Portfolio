import fs from "fs";
import matter from "gray-matter";
import path from "path";
export interface PostData {
  title: string;
  date: string;
  description: string;
  content: string;
  slug: string;
}
const contentDirectory = path.join(process.cwd(), "content");

export function getAllPosts(): PostData[] {
  let posts: PostData[] = [];

  // Function to read posts recursively from a directory
  const readPostsFromDirectory = (directory: string) => {
    const filesAndDirs = fs.readdirSync(directory);

    filesAndDirs.forEach((fileOrDir) => {
      const fullPath = path.join(directory, fileOrDir);

      // If it's a directory, recursively read its contents
      if (fs.lstatSync(fullPath).isDirectory()) {
        readPostsFromDirectory(fullPath);
      } else {
        // Only process markdown files
        if (path.extname(fileOrDir) === ".md") {
          const post = parsePost(fullPath);
          if (post) posts.push(post);
        }
      }
    });
  };

  // Start reading from the root content directory
  readPostsFromDirectory(contentDirectory);

  return posts;
}

function parsePost(fullPath: string): PostData | null {
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  if (!data.title || !data.date) {
    console.warn(`Missing metadata in ${fullPath}`);
    return null;
  }

  return {
    slug: fullPath.replace(`${contentDirectory}/`, "").replace(/\.md$/, ""),
    title: data.title,
    date: data.date,
    description: data.description || "",
    content,
  };
}
export function getPostBySlug(...slugParts: (string | undefined)[]) {
  // Filter out undefined parts, then assert the result as string[]
  const filteredSlugParts = slugParts.filter(Boolean) as string[];
  const filePath = path.join(contentDirectory, ...filteredSlugParts) + ".md";

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: filteredSlugParts.join("/"),
      title: data.title,
      date: data.date,
      description: data.description || "",
      content,
    };
  } catch (error) {
    console.error(`Error loading post at ${filePath}:`, error);
    return null;
  }
}
