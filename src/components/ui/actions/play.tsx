import { Tooltip } from "@heroui/react";
import { Play } from "lucide-react";
import Link from "next/link";

export const PlayAction = ({
  url,
  description
}: {
  url: string;
  description: string;
}): React.JSX.Element => (
  <Tooltip content={description}>
    <Link
      href={url}
      className="p-1 text-xs text-success-500 rounded-[0.25rem] bg-success-500/10 cursor-pointer border border-success-500/10 hover:text-white hover:bg-success-500 transition-all hover:border-success-500"
    >
      <Play className="h-4 w-4" />
    </Link>
  </Tooltip>
);
