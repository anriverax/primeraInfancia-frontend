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
  if (isLoading && (!groups || groups.length === 0))
    return <Spinner classNames={{ label: "text-foreground mt-4" }} label="dots" variant="dots" />;

  if (isError && (!groups || groups.length === 0))
    return (
      <p className="text-red-500">
        Error al cargar los grupos. Por favor, inténtalo de nuevo más tarde.
      </p>
    );

  if (!groups || groups.length === 0) {
    return <p className="text-muted-foreground">No hay grupos disponibles.</p>;
  }

  return (
    <div className="space-y-2">
      {groups.map((group, index) => (
        <Link
          key={group.id ?? index}
          href={group.id ? `/grupos/${group.id}` : "#"}
          aria-disabled={!group.id}
          className="flex cursor-pointer items-center gap-3 p-2 rounded-lg border border-gray-200 hover:bg-white transition-all duration-200"
        >
          <div className="flex-1">
            <p className="font-medium text-sm truncate">{group.name}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <User className="w-3 h-3" />
              <span>{`${group.memberCount ?? 0} inscritos`}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GroupListComponent;
