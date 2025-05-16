"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import getAllBlogs from "../../actions/getAllBlogs";
import { useUser } from "@civic/auth-web3/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Explore = () => {
  const [activeTab, setActiveTab] = useState<"all" | "premium">("all");
  const [blogs, setBlogs] = useState<any>();
  const [premiumBlogs, setPremiumBlogs] = useState<any>();
  const [featuredBlog, setFeaturedBlog] = useState<any>();
  const userContext = useUser();
  const router = useRouter();

  async function getBlogs() {
    const allBlogs = await getAllBlogs();
    if (allBlogs) setBlogs(allBlogs);
    setFeaturedBlog(
      allBlogs.reduce((blog1, blog2) => {
        return Number(blog1._count.likes) > Number(blog2._count.likes)
          ? blog1
          : blog2;
      })
    );
    setPremiumBlogs(allBlogs.filter((blog) => blog.isPremium));
  }

  useEffect(() => {
    getBlogs();
  }, [userContext.authStatus]);

  if (!blogs) return <p>Loading...</p>;
  return (
    <div className="font-sans">
      <section className="py-14 px-4 ">
        <div className="max-w-7xl mx-auto hover:cursor-pointer">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
            🌟 Featured Post
          </h2>
          {featuredBlog && (
            <div
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition hover:shadow-xl duration-300"
              onClick={() => router.push(`/blog/${featuredBlog.id}`)}
            >
              <div className="md:flex">
                <div className="md:w-1/3 h-64 md:h-auto bg-gray-100">
                  {featuredBlog.imageUrl && (
                    <img
                      src={featuredBlog.imageUrl}
                      alt={featuredBlog.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="md:w-2/3 p-6 md:p-8">
                  <div className="flex items-center mb-2">
                    <span className="text-xs uppercase font-semibold text-purple-600 tracking-wide">
                      Featured
                    </span>
                    {featuredBlog.isPremium && (
                      <span className="ml-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs py-1 px-3 rounded-full font-semibold shadow-sm">
                        Premium
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{featuredBlog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                      ✍️ By {featuredBlog.blogOwner.name}
                    </span>
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-600 font-semibold hover:bg-purple-500 hover:text-white transition"
                      asChild
                    >
                      <Link href={`/blog/${featuredBlog.id}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              📰 Latest Posts
            </h2>
            <Tabs
              defaultValue="all"
              className="w-[250px]"
              onValueChange={setActiveTab}
            >
              <TabsList className="bg-gray-100 border rounded-md">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-purple-500 data-[state=active]:text-white font-medium"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="premium"
                  className="data-[state=active]:bg-pink-500 data-[state=active]:text-white font-medium"
                >
                  Premium
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === "all"
              ? blogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    author={blog.blogOwner.name}
                    date={blog.createdAt}
                    isPremium={blog.isPremium}
                    imageUrl={blog.imageUrl}
                    likes={blog._count.likes}
                  />
                ))
              : premiumBlogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    excerpt={blog.excerpt}
                    author={blog.blogOwner.name}
                    date={blog.createdAt}
                    isPremium={blog.isPremium}
                    imageUrl={blog.imageUrl}
                    likes={blog._count.likes}
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
