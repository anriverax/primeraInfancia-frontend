import Link from "next/link";
import { GroupList } from "../../groupType";
import { User } from "lucide-react";
import { Spinner } from "@heroui/react";

interface GroupListComponentProps {
  groups: GroupList[];
  isLoading: boolean;
  isError: boolean;
}

const GroupListComponent = ({
  groups,
  isLoading,
  isError
}: GroupListComponentProps): React.JSX.Element => {
  if (isLoading && !groups)
    return <Spinner classNames={{ label: "text-foreground mt-4" }} label="dots" variant="dots" />;

  if (isError && !groups)
    return (
      <p className="text-red-500">
        Error al cargar los grupos. Por favor, inténtalo de nuevo más tarde.
      </p>
    );

  return (
    <div className="space-y-2">
      {groups.map((group, index) => (
        <Link
          key={index}
          href={`./grupos/${group.id}`}
          className="flex cursor-pointer items-center gap-3 p-2 rounded-lg border border-gray-200 hover:bg-white transition-all duration-200"
        >
          <div className="flex-1">
            <p className="font-medium text-sm truncate">{group.name}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <User className="w-3 h-3" />
              <span>{`${group.memberCount} inscritos`}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GroupListComponent;
