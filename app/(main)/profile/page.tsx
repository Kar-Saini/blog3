"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Heart,
  DollarSign,
  ThumbsUp,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import getUserDetails from "@/app/actions/getUserDetails";

const Dashboard = () => {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (!id) router.push("/login");
    else setUserId(id);
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const details = await getUserDetails(userId);
        if (!details) {
          router.push("/login");
          return;
        }
        setUserDetails(details);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, router]);
  console.log(userDetails);
  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-lg text-red-500">Failed to load user data</div>
      </div>
    );
  }
  const { blogs = [] } = userDetails;
  const totalLikes = userDetails.blogs
    .map((blog: any) => blog.likes.length)
    .reduce((a, b) => a + b);
  const totalTips = userDetails.blogs
    .map((blog: any) => blog.tips.length)
    .reduce((a, b) => a + b);

  console.log(totalLikes);
  console.log(totalTips);

  const totalViews = 0; // This would come from the API in a real app
  const mostRecentBlogs = blogs.slice(-2);
  return (
    <div className="p-4 md:p-8 space-y-4 w-full h-screen flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 flex items-center gap-2">
        <BookOpen className="h-6 w-6" /> Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
        <div className="md:w-3/5 flex flex-col h-full">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-pink-600 flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Your Blogs ({blogs.length})
              </CardTitle>
              <p className="text-sm text-gray-500">
                Manage and track all your published content
              </p>
            </CardHeader>
            <Separator />

            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-250px)] w-full p-4">
                {blogs.length > 0 ? (
                  <ul className="space-y-6">
                    {blogs.map((blog: any) => (
                      <li
                        key={blog.id}
                        className="text-sm text-gray-700 border border-gray-300 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {blog.title}
                            </h3>
                            {blog.isPremium && (
                              <Badge
                                variant="outline"
                                className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              >
                                <Star className="h-3 w-3 mr-1" /> Premium
                              </Badge>
                            )}
                          </div>

                          <p className="text-gray-600">{blog.excerpt}</p>

                          <div className="flex flex-wrap gap-2 mt-1">
                            {blog.tags.split(",").map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-gray-100 text-gray-700"
                              >
                                {tag.trim()}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(
                                  new Date(blog.createdAt),
                                  "MMM d, yyyy"
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-3 w-3 text-red-500" />
                                {blog.likes.length} likes
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-green-500" />
                                {blog.tips.length} tips
                              </span>
                            </div>

                            <button
                              className="text-indigo-600 hover:text-indigo-800 font-medium"
                              onClick={() => router.push(`/blogs/${blog.id}`)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-12 text-center text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium">
                      You haven't created any blogs yet
                    </p>
                    <p className="mt-2">
                      Start sharing your thoughts with the world
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                      onClick={() => router.push("/create-blog")}
                    >
                      Create Your First Blog
                    </button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/5 flex flex-col justify-between">
          <Card className="">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-indigo-700">
                Content Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-indigo-600 mb-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">Total Blogs</span>
                  </div>
                  <p className="text-2xl font-bold">{blogs.length}</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-pink-600 mb-1">
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">Total Likes</span>
                  </div>
                  <p className="text-2xl font-bold">{totalLikes}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Across all your content
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">Tips Received</span>
                  </div>
                  <p className="text-2xl font-bold">{totalTips}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    From your readers
                  </p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="font-medium">Views</span>
                  </div>
                  <p className="text-2xl font-bold">{totalViews}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Total content views
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-emerald-600">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mostRecentBlogs.length == 0 && (
                <div className="text-center py-6 text-gray-500">
                  <Clock className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                  <p>No recent activity to display</p>
                  <p className="text-sm mt-1">
                    Start creating content to see updates here
                  </p>
                </div>
              )}
              {mostRecentBlogs.map((mostRecentBlog: any) => (
                <div className="space-y-4 mb-2" key={mostRecentBlog.id}>
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h3 className="font-medium">Latest Blog Published</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {mostRecentBlog.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>
                        {format(
                          new Date(mostRecentBlog.createdAt),
                          "MMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
