import { useMemo } from "react";
import { SchoolList } from "../dashboard.type";
import { Listbox, ListboxItem } from "@heroui/react";
import Link from "next/link";

type TopDepartmentProps = {
  filtered: SchoolList[];
  setSelectedDepto: React.Dispatch<React.SetStateAction<string | null>>;
};

const ItemCounter = ({ num }: { num: number }): React.JSX.Element => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{num}</span>
  </div>
);

const TopDepartment = ({ filtered, setSelectedDepto }: TopDepartmentProps): React.JSX.Element => {
  /* eslint-disable react-hooks/exhaustive-deps */
  const stats = useMemo(() => {
    const total = filtered?.length;

    const byDepto: Record<string, number> = {};

    filtered.forEach((e) => {
      const deptName = e.departmentName || "Sin departamento";
      byDepto[deptName] = (byDepto[deptName] || 0) + 1;
    });

    const ranking = Object.entries(byDepto).sort((a, b) => b[1] - a[1]);

    return {
      total,
      byDepto,
      ranking
    };
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div className="mt-3">
      <div className="flex justify-between">
        <p className="text-sm font-bold">Departamentos</p>
        {stats.ranking.length < 14 && (
          <Link
            href="#"
            className="text-primary-500 hover:underline"
            onClick={() => setSelectedDepto(null)}
          >
            Ver todos
          </Link>
        )}
      </div>

      <Listbox
        aria-label="User Menu"
        className="p-0 gap-0 mt-2"
        itemClasses={{
          base: "py-1 first:rounded-t-lg last:rounded-b-lg rounded-none data-[hover=true]:bg-neutral-100/80"
        }}
        onAction={(key) => setSelectedDepto(key as string)}
      >
        {stats.ranking.map(([name, count]) => (
          <ListboxItem
            classNames={{ title: `${name === "Cabañas" ? "font-bold" : ""}` }}
            key={name}
            endContent={<ItemCounter num={count} />}
          >
            {name}
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  );
};

export default TopDepartment;
