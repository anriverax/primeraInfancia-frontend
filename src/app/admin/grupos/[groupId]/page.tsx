"use client";

import { useParams } from "next/navigation";
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs } from "@heroui/react";

import { useGroupDetail } from "@/features/groupDetail/hooks/useGroupDetail";
import { Key, useState } from "react";
import GroupDetailInfo from "@/features/groupDetail/components/groupDetailInfo";

const GroupDetailPage = (): React.JSX.Element => {
  const [selected, setSelected] = useState<Key>("photos");
  const params = useParams();

  const { groupDetail } = useGroupDetail(Number(params.groupId));

  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem>Dashboard</BreadcrumbItem>
        <BreadcrumbItem>Grupos</BreadcrumbItem>
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
        <GroupDetailInfo {...groupDetail!} />
        <div className="bg-white border border-gray-200 mt-6 col-span-3">
          <div className="p-6 flex items-center gap-2">
            <h3 className="text-2xl text-black font-semibold">Inscripción de docentes</h3>
          </div>

          <div className="p-6 space-y-4">
            <Tabs
              fullWidth
              color="primary"
              aria-label="Options"
              selectedKey={selected as string}
              classNames={{
                cursor: "group-data-[key=music]:bg-[#7828c9]"
              }}
              onSelectionChange={setSelected}
            >
              <Tab key="photos" title="Estudiantes Asignados">
                <Card>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="music" title="Estudiantes Disponibles">
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>{" "}
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>{" "}
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>{" "}
                <Card>
                  <CardBody>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur.
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailPage;
