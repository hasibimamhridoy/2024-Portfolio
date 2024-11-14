import { getAllPosts } from "@/lib/helper";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/content/posts/${post.slug}`}>
              <h2>{post.title}</h2>
              <p>{post.date}</p>
              <p>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
