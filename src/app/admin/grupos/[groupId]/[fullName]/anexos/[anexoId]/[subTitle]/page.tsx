"use client";

import { useParams } from "next/navigation";
import React from "react";
import Appendix1Form from "@/features/mentoring/appendix1/component/appendix1Form";
import Appendix2Form from "@/features/mentoring/appendix2/component/appendix2Form";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();
  const { groupId, fullName, subTitle } = params;

  return (
    <>
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/admin/grupos">Grupos</BreadcrumbItem>
        <BreadcrumbItem href={`/admin/grupos/${groupId}/${fullName}/anexos`}>Anexos</BreadcrumbItem>
        <BreadcrumbItem>{decodeURIComponent(String(subTitle))}</BreadcrumbItem>
      </Breadcrumbs>

      {Number(params.anexoId) === 1 && <Appendix1Form />}
      {Number(params.anexoId) === 2 && <Appendix2Form />}
    </>
  );
};
export default AttachmentDetailPage;
