"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Heart, HeartIcon, ThumbsUp } from "lucide-react";

interface TipAuthorProps {
  authorId: string;
  authorName: string;
  handleLike: () => void;
  handletip: (amount: number) => void;
  liked: boolean;
}

const TipAuthor = ({
  authorId,
  authorName,
  handleLike,
  liked,
  handleTip,
}: TipAuthorProps) => {
  const [tipAmount, setTipAmount] = useState(0.01);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-2xl">
      <h3 className="text-xl font-extrabold text-blog-accent mb-4 flex items-center">
        <Heart className="mr-2 h-5 w-5 text-blog-accent animate-pulse" />
        Support <span className="ml-1">{authorName}</span>
      </h3>

      <div className="mb-5">
        <p className="text-sm text-gray-700 mb-2 font-semibold uppercase">
          Tip Amount (SOL)
        </p>
        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(Number(e.target.value))}
              className="w-24 font-bold border-blog-accent text-blog-accent focus-visible:ring-blog-accent"
              step={0.001}
            />
            <Button
              onClick={() => handleTip(tipAmount)}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 hover:cursor-pointer text-white font-bold px-6 py-2 rounded-lg transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Send Tip"}
            </Button>
          </div>
          <div className="flex gap-3">
            {liked ? (
              <div className="flex gap-2 items-center">
                <HeartIcon className="h-4 w-4 text-red-500" />
                Liked
              </div>
            ) : (
              <Button
                onClick={handleLike}
                variant="outline"
                className="border-blue-600 text-blue-600 font-semibold flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
              >
                <ThumbsUp className="h-4 w-4" />
                Like
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipAuthor;
