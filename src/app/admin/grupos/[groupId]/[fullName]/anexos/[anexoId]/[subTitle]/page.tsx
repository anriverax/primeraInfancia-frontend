"use client";

import { useParams } from "next/navigation";
import Appendix1Form from "@/features/mentoring/appendix1/component/appendix1Form";
import Appendix2Form from "@/features/mentoring/appendix2/component/appendix2Form";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  return (
    <>
      {Number(params.anexoId) === 1 && <Appendix1Form />}
      {Number(params.anexoId) === 2 && <Appendix2Form />}
    </>
  );
};
export default AttachmentDetailPage;
