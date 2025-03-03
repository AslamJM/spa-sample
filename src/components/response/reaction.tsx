import { Angry, Heart, Meh, ThumbsDown, ThumbsUp } from "lucide-react";

export const reactionIcons = [
  {
    points: 5,
    Icon: Heart,
    color: "text-red-500",
  },
  {
    points: 4,
    Icon: ThumbsUp,
    color: "text-green-500",
  },
  {
    points: 3,
    Icon: Meh,
    color: "text-yellow-500",
  },
  {
    points: 2,
    Icon: ThumbsDown,
    color: "text-orange-300",
  },
  {
    points: 1,
    Icon: Angry,
    color: "text-orange-700",
  },
];
