import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { Button, Input, NumberInput, Select, SelectItem, Textarea } from "@heroui/react";
import { Users } from "lucide-react";
import { useGroupForm } from "../../hooks/group/useGroupForm";
import ModalLayout from "@/features/admin/components/modal/partials/layout/modalLayout";
import { IPersonList } from "../groupType";
import { ZoneInput } from "../../zone/zoneType";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { cn } from "@/shared/utils/tv";
import { ZGModalHeader } from "../../zGModalHeader";
import { useGroupSelectBox } from "../../hooks/group/useGroupSelectBox";

const GroupForm = (): React.JSX.Element => {
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

  const { zonesList, personList } = useGroupSelectBox();

  const { getInputProps, getTextAreaProps, getSelectProps } = useCustomFormFields();

  return (
    <ModalLayout size="md">
      <ZGModalHeader
        title={data ? "Editar grupo" : "Nuevo Grupo"}
        description="Complete la información del grupo"
      >
        <Users className="h-5 w-5" />
      </ZGModalHeader>
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
        <Textarea
          {...getFieldProps("description")}
          {...getTextAreaProps("Descripción", "Descripción", touched.description, errors.description)}
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
              touched.description,
              errors.description
            )}
            {...getFieldProps("zoneId")}
          >
            {(zone: ZoneInput) => <SelectItem key={zone.id}>{zone.name}</SelectItem>}
          </Select>
        </div>
        <div>
          <Select
            items={personList ? personList : []}
            {...getSelectProps(
              "Responsable asignado",
              personList ? personList.length : 0,
              values.personId,
              touched.description,
              errors.description
            )}
            {...getFieldProps("personId")}
          >
            {(person: IPersonList) => <SelectItem key={person.id}>{person.fullName}</SelectItem>}
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
