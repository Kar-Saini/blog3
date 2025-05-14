"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Heart, ThumbsUp } from "lucide-react";

interface TipAuthorProps {
  authorId: string;
  authorName: string;
}

const TipAuthor = ({ authorId, authorName }: TipAuthorProps) => {
  const [tipAmount, setTipAmount] = useState(0.01);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleTip = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: `You tipped ${tipAmount} ETH to ${authorName}!`,
        description: "Thank you for supporting quality content.",
      });
    }, 1500);
  };

  return (
    <div className="bg-white shadow-lg border border-gray-200 p-6 rounded-2xl">
      <h3 className="text-xl font-extrabold text-blog-accent mb-4 flex items-center">
        <Heart className="mr-2 h-5 w-5 text-blog-accent animate-pulse" />
        Support <span className="ml-1">{authorName}</span>
      </h3>

      <div className="mb-5">
        <p className="text-sm text-gray-700 mb-2 font-semibold uppercase">
          Tip Amount (ETH)
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
              onClick={handleTip}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Send Tip"}
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 font-semibold flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              <ThumbsUp className="h-4 w-4" />
              Like
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipAuthor;
