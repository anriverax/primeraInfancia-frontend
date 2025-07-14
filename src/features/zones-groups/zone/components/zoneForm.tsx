import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input } from "@heroui/react";
import { MapPin } from "lucide-react";
import { useZoneForm } from "../../hooks/useZoneForm";
import ModalLayout from "@/features/admin/components/modal/partials/layout/modalLayout";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { cn } from "@/shared/utils/tv";
import { ZGModalHeader } from "../../zGModalHeader";

const ZoneForm = (): React.JSX.Element => {
  const { zoneFormik, reset, data } = useZoneForm();
  const { handleSubmit, touched, status, errors, setStatus, getFieldProps, isSubmitting } = zoneFormik;

  const { getInputProps } = useCustomFormFields();
  console.log("ZoneForm");
  return (
    <ModalLayout size="md">
      <ZGModalHeader
        title={data ? "Editar zona" : "Nuevo zona"}
        description="Agregue una nueva zona geográfica"
      >
        <MapPin className="h-5 w-5" />
      </ZGModalHeader>

      <div className={cn({ "p-5": Object.keys(errors).length > 0 && status === 401 })}>
        {Object.keys(errors).length > 0 && status === 401 && (
          <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
        )}
      </div>

      <form className="p-5 space-y-4" onSubmit={handleSubmit}>
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
