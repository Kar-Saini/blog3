"use client";
import { useEffect, useState } from "react";
import TipAuthor from "@/components/TipAuthor";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Calendar, Tag } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@civic/auth-web3/react";
import getBlogById from "@/app/actions/getBlogById";
import toast from "react-hot-toast";

import getUserDetailsByCivicAddress from "@/app/actions/getUserDetailsByCivicAddress";
import likeBlog from "@/app/actions/likeBlog";

const BlogPage = () => {
  const { blogId } = useParams();
  const userContext = useUser();
  const router = useRouter();
  const [blog, setBlog] = useState<any>();
  const [currentUser, setCurrentUser] = useState<any>();

  useEffect(() => {
    if (!blogId) router.push("/explore");
    async function getBlogAndCurrentUserDeatails() {
      try {
        const blog = await getBlogById(blogId as string);
        setBlog(blog);
        console.log(userContext);
        const currentUserDetails = await getUserDetailsByCivicAddress(
          userContext?.solana?.address.toString()
        );
        console.log(currentUserDetails);
        console.log(blog);
        setCurrentUser(currentUserDetails);
      } catch (error) {
        toast.error("Error finding blog/user " + error);
        router.push("/explore");
      }
    }
    getBlogAndCurrentUserDeatails();
  }, []);

  async function handleLike() {
    try {
      const res = await likeBlog(blog.id, currentUser.id);
      toast.success(res);
    } catch (error) {
      toast.error("Error : " + error);
      console.log(error);
    }
  }
  const handlePurchase = () => {};

  function handleTip() {}
  if (!blog) {
    return (
      <div className="min-h-screen  font-mono">
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    let html = content;

    // Handle headers
    html = html.replace(
      /^# (.+)$/gm,
      '<h1 class="text-3xl font-bold my-4">$1</h1>'
    );
    html = html.replace(
      /^## (.+)$/gm,
      '<h2 class="text-2xl font-semibold my-3">$1</h2>'
    );
    html = html.replace(
      /^### (.+)$/gm,
      '<h3 class="text-xl font-semibold my-2">$1</h3>'
    );

    // Handle paragraphs
    html = html.replace(/^(?!<h|\|).+$/gm, '<p class="my-2">$&</p>');

    // Handle lists
    html = html.replace(/^- (.+)$/gm, '<li class="ml-6 list-disc">$1</li>');
    html = html.replace(
      /^[0-9]\. (.+)$/gm,
      '<li class="ml-6 list-decimal">$1</li>'
    );

    if (html.includes("| ")) {
      const tableRows = html.match(/\|.+\|/g) || [];
      if (tableRows.length > 0) {
        let table =
          '<div class="overflow-x-auto my-4"><table class="w-full border-collapse">';
        tableRows.forEach((row, index) => {
          const cells = row.split("|").filter((cell) => cell.trim() !== "");
          if (index === 0) {
            table += "<thead><tr>";
            cells.forEach((cell) => {
              table += `<th class="border border-gray-300 px-4 py-2 bg-gray-100">${cell.trim()}</th>`;
            });
            table += "</tr></thead><tbody>";
          } else if (index === 1 && row.includes("---")) {
            // Skip the separator row
          } else {
            table += "<tr>";
            cells.forEach((cell) => {
              table += `<td class="border border-gray-300 px-4 py-2">${cell.trim()}</td>`;
            });
            table += "</tr>";
          }
        });
        table += "</tbody></table></div>";
        html = html.replace(/\|[\s\S]*?\n\n/, table);
      }
    }

    return { __html: html };
  };

  return (
    <div className="min-h-screen font-mono w-full ">
      <main className="container py-10 px-4">
        <article className="max-w-6xl mx-auto">
          <header className="mb-10">
            {blog.imageUrl && (
              <div className="mb-6 rounded-2xl overflow-hidden shadow-lg h-[300px] md:h-[400px]">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <time
                dateTime={blog.createdAt}
                className="text-sm text-purple-700 font-semibold flex items-center"
              >
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              {blog.tags.split(",").map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-pink-600 border-pink-400 bg-pink-100 font-semibold flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}

              {blog.isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow">
                  <Lock className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {blog.title}
            </h1>

            <div className="flex items-center">
              <div>
                <p className="font-bold text-lg text-blue-800">
                  By {blog.blogOwner.name}
                </p>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-gray-800">
            {blog.isPremium &&
            currentUser &&
            (currentUser.id !== blog.blogOwnerId ||
              (currentUser.purchasedBlogs &&
                !currentUser.purchasedBlogs
                  .map((b) => b.id)
                  .includes(blog.id))) ? (
              <div className="bg-white p-10 rounded-xl border border-purple-200 text-center shadow-lg">
                <Lock className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-2xl font-bold mb-2 text-purple-700">
                  Premium Content
                </h3>
                <p className="mb-6 text-gray-600">
                  This article is available exclusively for premium readers.
                </p>
                <Button
                  onClick={handlePurchase}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow hover:opacity-90"
                >
                  Pay 0.01 SOL to Unlock
                </Button>
              </div>
            ) : (
              <div
                className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm blog-content"
                dangerouslySetInnerHTML={renderContent(blog.content)}
              />
            )}
          </div>

          {currentUser && currentUser.id !== blog.blogOwnerId && (
            <div className="mt-12">
              <TipAuthor
                authorId={blog.blogOwner.id}
                authorName={blog.blogOwner.name}
              />
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogPage;
