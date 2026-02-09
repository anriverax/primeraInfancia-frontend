import { Tooltip } from "@heroui/react";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export const UserAddAction = ({
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
      className="p-1 text-xs text-neutral-500 rounded-[0.25rem] bg-neutral-500/10 cursor-pointer border border-neutral-500/10 hover:text-white hover:bg-neutral-500 transition-all hover:border-neutral-500"
      onClick={url === "#" ? onClick : undefined}
    >
      <UserPlus className="h-4 w-4" />
    </Link>
  </Tooltip>
);
