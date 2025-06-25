import { ModalLayout } from "@/features/admin/components/modal";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input } from "@heroui/react";
import { MapPin } from "lucide-react";
import { useGroupForm } from "../../hooks/useGroupForm";
import { IZoneList } from "../../zoneType";

type GroupFormProps = {
  toggleVisibility: (_form: "Z" | "G", _data?: null) => void;
  data?: IZoneList | null;
};

const GroupForm = ({ data }: GroupFormProps): React.JSX.Element => {
  const groupFormik = useGroupForm({ data });
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting } = groupFormik;

  const { getInputProps } = useCustomFormFields();

  return (
    <ModalLayout size="md">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg font-medium">Nuevo Grupo</h3>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-1">Complete la información del grupo</p>
      </div>
      <form className="p-5 text-white space-y-6" onSubmit={handleSubmit}>
        <Input
          {...getFieldProps("name")}
          {...getInputProps("text", "Nombre del grupo", touched.name, errors.name)}
        />
        <Input
          {...getFieldProps("name")}
          {...getInputProps("text", "Nombre del grupo", touched.name, errors.name)}
        />
        <div className="flex flex-row gap-2 py-4">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            Guardar zona
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default GroupForm;
