"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import useAuthGuard from "@/hooks/useAuthGuard";
import clsx from "clsx";
import addNewBlog from "../../actions/addNewBlog";
import toast from "react-hot-toast";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPremium, setIsPremium] = useState(true);
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const userId = useAuthGuard();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await addNewBlog(
        title,
        excerpt,
        content,
        tags,
        isPremium,
        userId!,
        imageUrl,
        price
      );
      toast.success("Blog Added!!, BlogId: " + res);
      router.push("/explore");
    } catch (error) {
      console.log(error);
      toast.error("Error adding blog" + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  font-mono">
      <main className="container py-10 px-4  mx-auto">
        <div className="max-w-5xl mx-auto  bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            ✏️ Create New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-indigo-600 font-semibold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter your post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="font-mono border-pink-300 focus:ring-pink-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="excerpt"
                className="text-indigo-600 font-semibold"
              >
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                placeholder="Brief summary of your post (appears in previews)"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="font-mono border-purple-300 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-indigo-600 font-semibold"
              >
                Content (Markdown supported)
              </Label>
              <Textarea
                id="content"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={15}
                className="font-mono border-indigo-300 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-indigo-600 font-semibold">
                Tags (comma separated)
              </Label>
              <Input
                id="tags"
                placeholder="blockchain, defi, nft"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="font-mono borde  r-emerald-300 focus:ring-emerald-500"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="imageUrl"
                className="text-indigo-600 font-semibold"
              >
                Image URL
              </Label>
              <Input
                id="imageUrl"
                placeholder="www.example.com"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="font-mono borde  r-emerald-300 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                id="premium"
                checked={isPremium}
                onCheckedChange={() => setIsPremium(!isPremium)}
                className={clsx(
                  "border border-gray-400",
                  "bg-gray-300 data-[state=checked]:bg-pink-600"
                )}
              />

              <label
                htmlFor="premium"
                className="text-pink-600 font-medium cursor-pointer"
              >
                Make this post premium content
              </label>
            </div>

            {isPremium && (
              <div className="bg-gradient-to-br from-yellow-100 to-pink-100 border-l-4 border-pink-400 p-4 rounded-md text-sm shadow flex flex-col gap-2">
                <p className="text-pink-700 font-medium">
                  💎 Premium posts require readers to pay ETH to access. You’ll
                  receive 95% of all payments.
                </p>

                <label className="text-sm font-semibold text-pink-700">
                  Set price (ETH):
                </label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="p-1 rounded border border-pink-400 text-pink-700"
                />
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold shadow-md hover:opacity-90 transition-all"
              >
                {isSubmitting ? "Publishing..." : "🚀 Publish Post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
                className="border-indigo-400 text-indigo-700 hover:bg-indigo-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewPost;
