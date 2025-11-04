import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { AppendixLayout } from "../../component/appendixLayout";
import { AppendixForm } from "../../component/appendixForm";
import { Select, SelectItem, SharedSelection } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { dimensionData } from "../appendix3Data";
import { useAppendix3Form } from "../hook/useAppendix3Form";
import { IOptions } from "@/shared/types/globals";
import { AppendixCard } from "../../component/appendixCard";

const Appendix3Form = (): React.JSX.Element => {
  const params = useParams();
  const { anexoId, fullName, groupId } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix3 = useAppendix3Form(Number(anexoId), Number(groupId));
  const { setFieldValue, errors, handleSubmit, values } = formikAppendix3;

  const { getSelectProps } = useCustomFormFields();

  return (
    <AppendixLayout
      title={appendix?.title || ""}
      subTitle={decodeURIComponent(appendix?.subTitle || "")}
      teacher={decodeURIComponent(fullName?.toString() || "")}
      description={appendix?.description || ""}
    >
      <AppendixForm onSubmit={handleSubmit}>
        <AppendixCard
          step="I"
          title="Plan de mejora continua: registro de planificación y retroalimentación"
        >
          <Select
            items={dimensionData}
            name="dimension"
            {...getSelectProps(
              "¿Cuenta con estudios de posgrado u otra formación complementaria?",
              "Seleccione sus estudios",
              dimensionData.length || 0,
              values.dimension,
              errors.dimension
            )}
            onSelectionChange={(keys: SharedSelection) => {
              const selected = Array.from(keys as Set<string>)[0];
              setFieldValue("dimension", selected);
            }}
          >
            {(item: IOptions) => <SelectItem key={item.key}>{item.label}</SelectItem>}
          </Select>
        </AppendixCard>
      </AppendixForm>
    </AppendixLayout>
  );
};

export default Appendix3Form;
