"use client";

import { useParams } from "next/navigation";
import { useAttachment1Form } from "@/features/attachment/instrument1/useAttachmentForm";
import { useAttachment2Form } from "@/features/attachment/instrument2/useAttachmentForm";
import { useAttachment3Form } from "@/features/attachment/instrument3/useAttachmentForm";
import { useAttachment5Form } from "@/features/attachment/instrument5/useAttachmentForm";
import { useAttachment6Form } from "@/features/attachment/instrument6/useAttachmentForm";
import { useAttachment7Form } from "@/features/attachment/instrument7/useAttachmentForm";
import { useAttachment8Form } from "@/features/attachment/instrument8/useAttachmentForm";
import Attachment1Form from "@/features/attachment/instrument1/components/attachment";
import Attachment2Form from "@/features/attachment/instrument2/components/attachment";
import Attachment3Form from "@/features/attachment/instrument3/components/attachment";
import Attachment5Form from "@/features/attachment/instrument5/components/attachment";
import Attachment6Form from "@/features/attachment/instrument6/components/attachment";
import Attachment7Form from "@/features/attachment/instrument7/components/attachment";
import Attachment8Form from "@/features/attachment/instrument8/components/attachment";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  const formikAttachment1 = useAttachment1Form();
  const formikAttachment2 = useAttachment2Form();
  const formikAttachment3 = useAttachment3Form();
  const formikAttachment5 = useAttachment5Form();
  const formikAttachment6 = useAttachment6Form();
  const formikAttachment7 = useAttachment7Form();
  const formikAttachment8 = useAttachment8Form();
  return (
    <>
      {Number(params.anexoId) === 2 && <Attachment1Form formik={formikAttachment1} />}

      {Number(params.anexoId) === 3 && <Attachment2Form formik={formikAttachment2} />}

      {Number(params.anexoId) === 4 && <Attachment3Form formik={formikAttachment3} />}

      {Number(params.anexoId) === 5 && <Attachment5Form formik={formikAttachment5} />}

      {Number(params.anexoId) === 6 && <Attachment6Form formik={formikAttachment6} />}

      {Number(params.anexoId) === 7 && <Attachment7Form formik={formikAttachment7} />}

      {Number(params.anexoId) === 8 && <Attachment8Form formik={formikAttachment8} />}
    </>
  );
};
export default AttachmentDetailPage;
