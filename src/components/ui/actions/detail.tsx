import { Tooltip } from "@heroui/react";
import { Eye } from "lucide-react";
import Link from "next/link";

export const DetailAction = ({
  url,
  description,
  onClick
}: {
  url: string;
  description: string;
  onClick?: () => void;
}): React.JSX.Element => (
  <Tooltip content={description}>
    <Link
      href={url}
      className="p-1 text-xs text-primary-500 rounded-[0.25rem] bg-primary-500/10 cursor-pointer border border-primary-500/10 hover:text-white hover:bg-primary-500 transition-all hover:border-primary-500"
      onClick={url === "#" ? onClick : undefined}
    >
      <Eye className="h-4 w-4" />
    </Link>
  </Tooltip>
);
