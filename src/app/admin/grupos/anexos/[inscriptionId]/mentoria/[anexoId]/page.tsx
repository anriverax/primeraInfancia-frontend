"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useAppendix1Form } from "@/features/mentoring/appendix1/useAttachmentForm";
import { useAppendix2Form } from "@/features/mentoring/appendix2/useAttachmentForm";
import TrainerDetailView from "@/features/mentoring/appendix1/component/detail";
import Appendix2View from "@/features/mentoring/appendix2/component/detail";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams(); // route params from folder segments
  const search = useSearchParams(); // query string params

  // route params -> numbers
  const inscriptionId = params?.inscriptionId ? Number(params.inscriptionId) : undefined;
  const anexoId = params?.anexoId ? Number(params.anexoId) : undefined;

  // read a query param: ?fullName=...
  const fullName = search.get("fullName") ?? undefined;

  const formikAppendix1 = useAppendix1Form(inscriptionId);
  const formikAppnedix2 = useAppendix2Form(inscriptionId);

  return (
    <>
      {fullName && <h3 className="px-4">Docente: {fullName}</h3>}

      {anexoId === 1 && (
        <TrainerDetailView formik={formikAppendix1} id={1} inscription={inscriptionId} />
      )}

      {anexoId === 2 && <Appendix2View formik={formikAppnedix2} id={2} />}
    </>
  );
};
export default AttachmentDetailPage;
