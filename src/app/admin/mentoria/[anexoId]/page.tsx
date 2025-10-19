"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useAppendix1Form } from "@/features/mentoring/appendix1/useAttachmentForm";
import { useAppendix2Form } from "@/features/mentoring/appendix2/useAttachmentForm";
import TrainerDetailView from "@/features/mentoring/appendix1/component/detail";
import Appendix2View from "@/features/mentoring/appendix2/component/detail";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const search = useSearchParams();
  const inscriptionIdParam = search.get("inscriptionId");
  const inscriptionId = inscriptionIdParam ? Number(inscriptionIdParam) : undefined;

  const formikAppendix1 = useAppendix1Form(inscriptionId);
  const formikAppnedix2 = useAppendix2Form(inscriptionId);

  return (
    <>
      {Number(params.anexoId) === 1 && (
        <TrainerDetailView formik={formikAppendix1} id={Number(params.anexoId)} inscription={inscriptionId} />
      )}

      {Number(params.anexoId) === 2 && (
        <Appendix2View formik={formikAppnedix2} id={Number(params.anexoId)} />
      )}
    </>
  );
};
export default AttachmentDetailPage;
