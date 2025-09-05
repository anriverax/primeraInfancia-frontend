import { Avatar, Button, Card, CardBody, Chip, Pagination } from "@heroui/react";
import { Inscription } from "../../groupType";
import { Mail, MapPin, Phone, UserMinus } from "lucide-react";
import { useMemo, useState } from "react";

type ListTeachersProps = {
  inscription: Inscription[];
};

const ListTeachers = ({ inscription }: ListTeachersProps): React.JSX.Element => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(inscription.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return inscription.slice(start, end);
  }, [page, inscription]);

  return (
    <div className="col-span-3 mt-6">
      <div className="bg-white border border-gray-200">
        <div className="px-6 pt-6 flex items-center gap-2">
          <h3 className="text-2xl text-black font-semibold">Docentes inscritos</h3>
        </div>

        <div className="px-6 pt-3 space-y-4">
          {items.map((ins: Inscription) => (
            <Card key={ins.id} classNames={{ base: "shadow-none p-1 my-3" }}>
              <CardBody className="flex flex-row justify-between">
                <div className="flex items-center gap-6">
                  <Avatar
                    isBordered
                    name={((): string => {
                      const names = ins.teacher.fullName?.split(" ") ?? [];
                      if (names.length === 0) return "";
                      const first = names[0][0] ?? "";
                      const last = names[names.length - 1][0] ?? "";
                      return (first + last).toUpperCase();
                    })()}
                    classNames={{
                      name: "font-bold"
                    }}
                  />
                  <div>
                    <h4 className="font-semibold">{ins.teacher.fullName}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="inline-block h-3 w-3" />
                        {ins.teacher.User.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="inline-block ml-2 h-3 w-3" />
                        {ins.teacher.phoneNumber}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="inline-block ml-2 h-3 w-3" />
                        {ins.teacher.school}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Chip className={ins.status === "Activo" ? "bg-green-100 text-green-700" : ""}>
                    {ins.status}
                  </Chip>
                  {ins.status === "Activo" ? (
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-red-600 data-[hover=true]:text-red-700 data-[hover=true]:bg-red-50"
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="flex w-full justify-center py-6">
          <Pagination
            isCompact
            showControls
            initialPage={page}
            variant="light"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListTeachers;
