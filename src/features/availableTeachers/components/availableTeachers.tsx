import { Avatar, Card, CardBody, Pagination } from "@heroui/react";
import { useAvailableTeacher } from "../hooks/useAvailableTeacher";
import { Mail, MapPin, Phone } from "lucide-react";

interface AvailableTeachersProps {
  zoneId: number;
  groupId: number;
}

const AvailableTeachers = ({ zoneId, groupId }: AvailableTeachersProps): React.JSX.Element => {
  const { availableTeacherList, meta, handleChangePage } = useAvailableTeacher(
    zoneId as number,
    groupId as number
  );

  return (
    <>
      {availableTeacherList.length > 0
        ? availableTeacherList.map((teacher) => (
            <Card key={teacher.id} classNames={{ base: "shadow-none border border-gray-200 p-1 my-3" }}>
              <CardBody className="flex flex-row justify-between">
                <div className="flex items-center gap-6">
                  <Avatar
                    isBordered
                    name={((): string => {
                      const names = teacher.fullName?.split(" ") ?? [];
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
                    <h4 className="font-semibold">{teacher.fullName}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="inline-block h-3 w-3" />
                        {teacher.User?.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="inline-block ml-2 h-3 w-3" />
                        {teacher.phoneNumber}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="inline-block ml-2 h-3 w-3" />
                        {teacher.address}
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        : null}
      <div className="flex justify-center">
        {meta && (
          <Pagination
            isCompact
            showControls
            initialPage={meta.currentPage}
            variant="light"
            total={meta.lastPage}
            onChange={(e) => handleChangePage(e)}
          />
        )}
      </div>
    </>
  );
};

export default AvailableTeachers;
