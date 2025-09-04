"use client";

import { useParams } from "next/navigation";
import { Avatar, Chip, BreadcrumbItem, Breadcrumbs, Button, Card, CardBody } from "@heroui/react";
import { useGroupDetail } from "@/features/groupDetail/hooks/useGroupDetail";
import GroupDetailInfo from "@/features/groupDetail/components/groupDetailInfo";
import { Info, Mail, MapPin, Phone, UserMinus, Users } from "lucide-react";

const GroupDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const { groupDetail } = useGroupDetail(Number(params.groupId));

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="../grupos">Grupos</BreadcrumbItem>
        <BreadcrumbItem>Detalle</BreadcrumbItem>
      </Breadcrumbs>

      {/* HEADER - DETAIL */}
      <div className="bg-white border border-gray-200 px-6 py-6 mt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Asignación de docentes</h1>
            <p className="text-gray-600">Gestiona los docentes del grupo.</p>
          </div>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 xl:gap-6">
        <div className="col-span-1 space-y-6">
          {groupDetail && <GroupDetailInfo {...groupDetail} />}
          <div className="bg-white border border-blue-100 mt-6">
            <div className="p-6 flex items-center gap-2">
              <Users className="h-5 w-5" />
              <h3 className="text-2xl font-semibold">Mentores</h3>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-3">{groupDetail?.Mentors?.map((mentor) => ())}</ul>
            </div>
          </div>
        </div>

        <div className="col-span-3 mt-6">
          <div className="bg-white border border-gray-200">
            <div className="p-6 flex items-center gap-2">
              <h3 className="text-2xl text-black font-semibold">Docentes inscritos</h3>
            </div>

            <div className="p-6 space-y-4">
              {groupDetail?.Inscription && groupDetail.Inscription.length > 0
                ? groupDetail.Inscription.map((inscription) => (
                    <Card
                      key={inscription.id}
                      classNames={{ base: "shadow-none border border-gray-200 p-1 my-3" }}
                    >
                      <CardBody className="flex flex-row justify-between">
                        <div className="flex items-center gap-6">
                          <Avatar
                            isBordered
                            name={((): string => {
                              const names = inscription.PersonRole.Person?.fullName?.split(" ") ?? [];
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
                            <h4 className="font-semibold">{inscription.PersonRole.Person?.fullName}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                              <span className="flex items-center gap-1">
                                <Mail className="inline-block h-3 w-3" />
                                {inscription.PersonRole.Person?.User?.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="inline-block ml-2 h-3 w-3" />
                                {inscription.PersonRole.Person?.phoneNumber}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="inline-block ml-2 h-3 w-3" />
                                {`${inscription.PersonRole.Person?.WorkAssignment?.Municipality.Department.name} - ${inscription.PersonRole.Person?.WorkAssignment?.Municipality.name}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Chip
                            className={
                              inscription.status === "Activo" ? "bg-green-100 text-green-700" : ""
                            }
                          >
                            {inscription.status}
                          </Chip>
                          {inscription.status === "Activo" ? (
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
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
