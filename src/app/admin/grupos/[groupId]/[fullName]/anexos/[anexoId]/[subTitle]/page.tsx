"use client";

import { useParams } from "next/navigation";
import Appendix1Form from "@/features/mentoring/appendix1/component/appendix1Form";
import Appendix2Form from "@/features/mentoring/appendix2/component/appendix2Form";
import Appendix3Form from "@/features/mentoring/appendix3/component/appendix3Form";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  return (
    <>
      {Number(params.anexoId) === 1 && <Appendix1Form />}
      {Number(params.anexoId) === 2 && <Appendix2Form />}
      {Number(params.anexoId) === 3 && <Appendix3Form />}
    </>
  );
};
export default AttachmentDetailPage;
