"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Like What You Read",
    description:
      "Enjoying a blog? Show appreciation by liking it and let others know it’s worth reading.",
    emoji: "❤️",
    footer: "Show some love",
  },
  {
    title: "Explore Diverse Content",
    description:
      "From deep tech insights to creative writing — explore blogs by creators from across the world.",
    emoji: "🌍",
    footer: "Find your next favorite",
  },
  {
    title: "Tip with Crypto",
    description:
      "Support authors directly with crypto tips — fast, borderless, and meaningful.",
    emoji: "💸",
    footer: "Empower creators",
  },
  {
    title: "Pay to Access Premium Blogs",
    description:
      "Unlock premium, high-value content by paying with crypto — reward knowledge and effort.",
    emoji: "🔐",
    footer: "Access exclusive content",
  },
  {
    title: "Join a Community of Experts",
    description:
      "Be part of a thriving network of writers, developers, artists, and curious minds.",
    emoji: "🤝",
    footer: "Grow with peers",
  },
  {
    title: "Learn & Support Authentically",
    description:
      "Enhance your skills by reading blogs that help — and tip authors if they brought you value.",
    emoji: "📚",
    footer: "Let learning thrive",
  },
];

const Index = () => {
  const router = useRouter();
  return (
    <main>
      <section className="py-10 text-gray-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest mb-4 text-blog-dark">
              blog3
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6 font-medium">
              Your decentralized home for writing, reading, and supporting
              creators with crypto.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition hover:cursor-pointer"
                onClick={() => router.push("/new")}
              >
                ✍️ Start Writing
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-gray-800 font-semibold hover:bg-gray-100 transition hover:cursor-pointer"
                onClick={() => router.push("/explore")}
              >
                🔍 Explore Blogs
              </Button>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 mb-10">
          <h2 className="text-3xl font-extrabold text-blog-dark">Why blog3?</h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            A platform designed for creators and readers in the decentralized
            world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 text-center">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl flex flex-col justify-between border border-gray-200 bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h3 className="text-2xl font-bold mb-3 text-blog-dark">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                {item.description}
              </p>
              <span className="inline-block text-pink-600 font-semibold text-lg tracking-wide">
                {item.emoji} <span className="ml-1">{item.footer}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;
