import { ModalLayout } from "@/features/admin/components/modal";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input } from "@heroui/react";
import { MapPin } from "lucide-react";
import { useZoneForm } from "../../hooks/useZoneForm";
import { IZoneList } from "../../zoneType";

type ZoneFormProps = {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
  data?: IZoneList | null;
};

const ZoneForm = ({ toggleVisibility, data }: ZoneFormProps): React.JSX.Element => {
  const zoneFormik = useZoneForm({ data, toggleVisibility });
  const { handleSubmit, touched, errors, getFieldProps, isSubmitting } = zoneFormik;

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
      <form className="p-5 text-white space-y-4" onSubmit={handleSubmit}>
        <Input
          {...getFieldProps("name")}
          {...getInputProps("text", "Nombre de la zona", touched.name, errors.name)}
        />
        <div className="flex flex-row gap-2 py-4">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            Guardar zona
          </Button>
          <Button fullWidth onPress={() => toggleVisibility("Z")}>
            Cancelar
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default ZoneForm;
