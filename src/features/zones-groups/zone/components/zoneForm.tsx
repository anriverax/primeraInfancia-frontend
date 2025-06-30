import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input } from "@heroui/react";
import { MapPin } from "lucide-react";
import { useZoneForm } from "../../hooks/useZoneForm";
import ModalLayout from "@/features/admin/components/modal/partials/layout/modalLayout";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";

const ZoneForm = (): React.JSX.Element => {
  const { zoneFormik, reset, data } = useZoneForm();
  const { handleSubmit, touched, status, errors, setStatus, getFieldProps, isSubmitting } = zoneFormik;

  const { getInputProps } = useCustomFormFields();

  return (
    <ModalLayout size="md">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <h3 className="text-lg font-medium">{data ? "Editar zona" : "Nueva Zona"}</h3>
          </div>
        </div>
        <p className="text-blue-100 text-sm mt-1">Agregue una nueva zona geográfica</p>
      </div>
      <div className="p-5">
        {Object.keys(errors).length > 0 && status === 401 && (
          <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
        )}
      </div>

      <form className="p-5 text-white space-y-4" onSubmit={handleSubmit}>
        <Input
          {...getFieldProps("name")}
          {...getInputProps("text", "Nombre de la zona", touched.name, errors.name)}
        />
        <div className="flex flex-row gap-2 py-4">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            {`${data ? "Actualizar zona" : "Crear zona"}`}
          </Button>
          <Button fullWidth onPress={() => reset()}>
            Cancelar
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default ZoneForm;
