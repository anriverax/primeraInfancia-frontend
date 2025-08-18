import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input, NumberInput, Select, SelectItem } from "@heroui/react";
import { Users } from "lucide-react";
import ModalLayout from "@/shared/ui/modal/modalLayout";
import { ZoneInput } from "../../zone/zoneType";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { cn } from "@/shared/utils/tv";
import { useGroupForm } from "../hooks/useGroupForm";
import { useGroupSelectBox } from "../hooks/useGroupSelectBox";
import { ModalHeaderCustom } from "../../../shared/ui/modal/modalHeaderCustom";

type GroupFormProps = {
  isOpen: boolean;
};

const GroupForm = ({ isOpen }: GroupFormProps): React.JSX.Element => {
  const { groupFormik, reset, data } = useGroupForm();
  const {
    values,
    status,
    touched,
    errors,
    handleSubmit,
    getFieldProps,
    isSubmitting,
    setFieldValue,
    setStatus
  } = groupFormik;

  const { zonesList } = useGroupSelectBox();

  const { getInputProps, getTextAreaProps, getSelectProps } = useCustomFormFields();

  return (
    <ModalLayout size="md" isOpen={isOpen}>
      <ModalHeaderCustom
        title={data ? "Editar grupo" : "Nuevo Grupo"}
        description="Complete la información del grupo"
      >
        <Users className="h-5 w-5" />
      </ModalHeaderCustom>
      <div className={cn({ "p-5": Object.keys(errors).length > 0 && status === 401 })}>
        {Object.keys(errors).length > 0 && status === 401 && (
          <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
        )}
      </div>
      <form className="p-5 text-white space-y-6" onSubmit={handleSubmit}>
        <Input
          {...getFieldProps("name")}
          {...getInputProps("text", "Nombre del grupo", touched.name, errors.name)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput
            {...getFieldProps("memberCount")}
            onChange={(e) => {
              if (!isNaN(Number(e))) setFieldValue("memberCount", e);
            }}
            {...getTextAreaProps("Límite de integrantes", "", touched.memberCount, errors.memberCount)}
          />

          <Select
            items={zonesList ? zonesList : []}
            {...getSelectProps(
              "Seleccione una zona",
              zonesList ? zonesList.length : 0,
              values.zoneId,
              touched.zoneId,
              errors.zoneId
            )}
            {...getFieldProps("zoneId")}
          >
            {(zone: ZoneInput) => <SelectItem key={zone.id}>{zone.name}</SelectItem>}
          </Select>
        </div>
        <div className="flex flex-row gap-2 py-4">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            {`${data ? "Actualizar grupo" : "Crear grupo"}`}
          </Button>
          <Button fullWidth onPress={() => reset()}>
            Cancelar
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default GroupForm;
