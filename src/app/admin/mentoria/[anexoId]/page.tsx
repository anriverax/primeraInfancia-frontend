"use client";

import Attachment1Form from "@/features/mentoring/components/attachment/attachment1Form";
import Attachment2Form from "@/features/mentoring/components/attachment/attachment2Form";
import Attachment3Form from "@/features/mentoring/components/attachment/attachment3Form";
import { useAttachment1Form } from "@/features/mentoring/hooks/useAttachment1Form";
import { useAttachment2Form } from "@/features/mentoring/hooks/useAttachment2Form";
import { useAttachment3Form } from "@/features/mentoring/hooks/useAttachment3Form";
import { useParams } from "next/navigation";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const formikAttachment1 = useAttachment1Form();
  const formikAttachment2 = useAttachment2Form();
  const formikAttachment3 = useAttachment3Form();
  return (
    <>
      {Number(params.anexoId) === 1 && <Attachment1Form formik={formikAttachment1} />}

      {Number(params.anexoId) === 2 && <Attachment2Form formik={formikAttachment2} />}

      {Number(params.anexoId) === 3 && <Attachment3Form formik={formikAttachment3} />}
    </>
  );
};
export default AttachmentDetailPage;
