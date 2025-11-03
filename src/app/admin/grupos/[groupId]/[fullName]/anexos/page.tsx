"use client";

import TrainerView from "@/features/mentoring/component/trainerView";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
import { useParams } from "next/navigation";

const Gradepage = (): React.JSX.Element => {
  const params = useParams();

  return (
    <>
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/admin/grupos">Grupos</BreadcrumbItem>
        <BreadcrumbItem>Anexos</BreadcrumbItem>
      </Breadcrumbs>
      <TrainerView
        inscriptionId={Number(params.groupId)}
        teacher={decodeURIComponent(params.fullName?.toString() || "")}
      />
    </>
  );
};

export default Gradepage;
