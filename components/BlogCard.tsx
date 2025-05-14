import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    id: string;
  };
  date: string;
  isPremium: boolean;
  imageUrl?: string;
}

const BlogCard = ({
  id,
  title,
  excerpt,
  author,
  date,
  isPremium,
  imageUrl,
}: BlogCardProps) => {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-md h-full flex flex-col">
        {imageUrl && (
          <div className="h-48 w-full overflow-hidden bg-gray-100">
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <CardContent className="flex-grow p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-mono text-lg font-medium text-blog-dark line-clamp-2">
              {title}
            </h3>
            {isPremium && (
              <Badge className="bg-blog-accent font-mono text-xs flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>
          <p className="text-blog-muted line-clamp-3 text-sm font-mono mb-3">
            {excerpt}
          </p>
        </CardContent>
        <CardFooter className="pt-0 pb-4 px-5 flex justify-between text-xs text-blog-muted font-mono">
          <span>By {author.name}</span>
          <time dateTime={date}>
            {new Date(date).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </time>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
