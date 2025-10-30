"use client";

import { useParams } from "next/navigation";
import Appendix1Form from "@/features/mentoring/appendix1/component/appendix1Form";
import Appendix2Form from "@/features/mentoring/appendix2/component/appendix2Form";
import Appendix3Form from "@/features/mentoring/appendix3/component/appendix3Form";
import Appendix5Form from "@/features/mentoring/appendix5/component/appendix5Form";
import Appendix7Form from "@/features/mentoring/appendix7/component/appendix7Form";
import Appendix8Form from "@/features/mentoring/appendix8/component/appendix8Form";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  return (
    <>
      {Number(params.anexoId) === 1 && <Appendix1Form />}
      {Number(params.anexoId) === 2 && <Appendix2Form />}
      {Number(params.anexoId) === 3 && <Appendix3Form />}
      {Number(params.anexoId) === 4 && <Appendix5Form />}
      {Number(params.anexoId) === 6 && <Appendix7Form />}
      {Number(params.anexoId) === 7 && <Appendix8Form />}
    </>
  );
};
export default AttachmentDetailPage;
