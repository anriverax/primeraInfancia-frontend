import { useParams } from "next/navigation";
import { useAppendix1Form } from "@/features/mentoring/appendix1/useAttachmentForm";
import { useAppendix2Form } from "@/features/mentoring/appendix2/useAttachmentForm";
import TrainerDetailView from "@/features/mentoring/appendix1/component/detail";
import Appendix2View from "@/features/mentoring/appendix2/component/detail";

const AttachmentDetailPage = (): React.JSX.Element => {
  const params = useParams();
  const formikAppendix1 = useAppendix1Form();
  const formikAppnedix2 = useAppendix2Form();
  return (
    <>
      {Number(params.anexoId) === 1 && (
        <TrainerDetailView formik={formikAppendix1} id={Number(params.anexoId)} />
      )}

      {Number(params.anexoId) === 2 && (
        <Appendix2View formik={formikAppnedix2} id={Number(params.anexoId)} />
      )}
    </>
  );
};
export default AttachmentDetailPage;
