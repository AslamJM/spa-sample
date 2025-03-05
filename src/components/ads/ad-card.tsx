import { ExternalLink } from "lucide-react";
import { Card, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

type Props = {
  ad: {
    id: number;
    bgColor: string;
    textColor: string;
    title: string;
    tagline: string;
    disclaimer: string;
    logo: string;
  };
};

const ads = [
  {
    id: 2,
    logo: "/placeholder.svg?height=100&width=100",
    title: "DeadlineCrusher",
    tagline:
      "For when you've procrastinated so long even caffeine can't save you.",
    disclaimer:
      "Side effects may include eye twitching, keyboard smashing, and explaining to your boss why it's 'almost done' for the 7th time. ⏰",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    id: 3,
    logo: "/placeholder.svg?height=100&width=100",
    title: "BugSquasher Pro",
    tagline:
      "Because your code isn't going to debug itself. Though that would be nice, wouldn't it?",
    disclaimer:
      "We can't promise it'll fix ALL your bugs, but at least you'll have something else to blame besides yourself. 🐛",
    bgColor: "bg-green-500",
    textColor: "text-white",
  },
  {
    id: 4,
    logo: "/placeholder.svg?height=100&width=100",
    title: "MeetingEscaper",
    tagline:
      "The app that sends fake emergency calls to get you out of meetings that should've been emails.",
    disclaimer:
      "Legal team wants us to clarify: we're not responsible for your terrible excuses when asked about the 'emergency' later. 📞",
    bgColor: "bg-purple-500",
    textColor: "text-white",
  },
  {
    id: 5,
    logo: "/placeholder.svg?height=100&width=100",
    title: "StackOverflowPro",
    tagline:
      "Why solve problems yourself when you can copy-paste someone else's solution?",
    disclaimer:
      "Subscription includes automatic comment removal so no one knows you didn't write it yourself. Your secret's safe with us. 🤫",
    bgColor: "bg-orange-500",
    textColor: "text-white",
  },
];

export default function AdCard({ ad }: Props) {
  return (
    <Card className="overflow-hidden border hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className={`${ad.bgColor} p-4`}>
        <div className="h-12 w-full relative mb-2">
          {ad.id === 1 ? (
            <img
              src={ad.logo || "/placeholder.svg"}
              alt={ad.title}
              className="object-contain"
            />
          ) : (
            <div className={`font-bold text-xl ${ad.textColor}`}>
              {ad.title}
            </div>
          )}
        </div>
        <p className={`text-sm ${ad.textColor} font-medium`}>{ad.tagline}</p>
      </div>
      <CardFooter className="p-3 bg-gray-50 flex flex-col items-start">
        <Badge variant="outline" className="mb-2 text-xs">
          ADS VIA CARBON
        </Badge>
        <p className="text-xs text-muted-foreground italic">{ad.disclaimer}</p>
        <div className="w-full flex justify-end mt-2">
          <Badge
            variant="secondary"
            className="text-xs cursor-pointer flex items-center gap-1"
          >
            See how <ExternalLink className="h-3 w-3" />
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}
