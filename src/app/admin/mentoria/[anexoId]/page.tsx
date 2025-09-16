"use client";

import { useParams } from "next/navigation";
import { useAttachment1Form } from "@/features/attachment/instrument1/useAttachmentForm";
import { useAttachment2Form } from "@/features/attachment/instrument2/useAttachmentForm";
import Attachment1Form from "@/features/attachment/instrument1/components/attachment";
import Attachment2Form from "@/features/attachment/instrument2/components/attachment";
const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const formikAttachment1 = useAttachment1Form();
  const formikAttachment2 = useAttachment2Form();

  // const { status, errors, setStatus } = formikAttachment1;
  // const { status, errors, setStatus } = formikAttachment2;

  return (
    <>
      {Number(params.anexoId) === 1 && <Attachment1Form formik={formikAttachment1} />}

      {Number(params.anexoId) === 2 && <Attachment2Form formik={formikAttachment2} />}
    </>
  );
};
export default AttachmentDetailPage;
