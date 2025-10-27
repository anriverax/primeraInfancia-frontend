"use client";

import { useParams } from "next/navigation";
import Appendix1Form from "@/features/mentoring/appendix1/component/appendix1Form";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();

  return <>{Number(params.anexoId) === 1 && <Appendix1Form />}</>;
};
export default AttachmentDetailPage;
