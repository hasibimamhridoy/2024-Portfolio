import { getPostBySlug } from "@/lib/helper";
import "github-markdown-css/github-markdown.css"; // Import GitHub-style markdown CSS
import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface PostPageProps {
  params: {
    slug?: string[]; // Optional catch-all slug as an array
  };
}

const md = new MarkdownIt();

export default async function PostPage({ params }: PostPageProps) {
  // Join the slug segments and separate by category, subcategory, and post slug as needed
  const slugArray = params.slug || [];
  const [category, subcategory, slug] = slugArray;

  // Retrieve the post based on category, subcategory, and slug
  const post = getPostBySlug(category, subcategory, slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post?.title}</h1>
      <p>{post?.date}</p>
      <ReactMarkdown className={`markdown-body`}>{post?.content}</ReactMarkdown>

      {/* <div dangerouslySetInnerHTML={{ __html: md.render(post.content) }} /> */}
    </article>
  );
}
