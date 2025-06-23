"use client";

import { AvatarUpload, CvUpload, DuiUpload } from "@/features/admin/components/upload";
import { Button, ModalBody } from "@heroui/react";
import ModalHeaderCustom from "../ModalHeaderCustom";
import { UploadCloud } from "lucide-react";
import { useUploadFiles } from "@/features/admin/hooks/useUploadFiles";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { useUploadhandle } from "@/features/admin/hooks/useUploadHandle";

const UploadFilesModal = (): React.JSX.Element => {
  const formikFiles = useUploadFiles();
  const { values, errors, status, setFieldValue, setStatus } = formikFiles;

  const { onChangeCv, onChangeImages, onChangeAvatar } = useUploadhandle(setFieldValue);
  const badRequest = Boolean(status && status >= 400);

  return (
    <>
      <ModalHeaderCustom
        title="Subir archivos"
        description="Adjunta tu CV, tu DUI y tu foto de perfil para completar tu registro"
        icon={<UploadCloud className="h-6 w-6 text-gray-600" />}
      />
      <ModalBody>
        {Object.keys(errors).length > 0 && badRequest && (
          <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
        )}
        <form onSubmit={formikFiles.handleSubmit}>
          <CvUpload file={values.file} setFile={onChangeCv} />
          <DuiUpload images={values.images} setImages={onChangeImages} />
          <AvatarUpload avatar={values.avatar} setAvatar={onChangeAvatar} />
          <div className="flex flex-row gap-2 py-4">
            <Button fullWidth type="submit" color="primary">
              Subir archivos
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

export default UploadFilesModal;
