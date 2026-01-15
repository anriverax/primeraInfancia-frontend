import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { AppendixLayout } from "../../component/appendixLayout";
import { AppendixForm } from "../../component/appendixForm";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  SelectItem,
  SharedSelection,
  Textarea,
  Link,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { dimensionData, strategiesValueData, subDimensionMap } from "../appendix3Data";
import { useAppendix3Form } from "../hook/useAppendix3Form";
import { IOptions } from "@/shared/types/globals";
import { AppendixCard } from "../../component/appendixCard";
import { Fragment, useMemo } from "react";
import { useAppendix3Func } from "../hook/useAppendix3Func";

const Appendix3Form = (): React.JSX.Element => {
  const params = useParams();
  const { anexoId, fullName, groupId } = params as any;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix3 = useAppendix3Form(Number(anexoId), Number(groupId));
  const {
    getFieldProps,
    setFieldValue,
    touched,
    errors,
    handleSubmit,
    values,
    validateForm,
    setTouched
  } = formikAppendix3;

  const { addNewTask, newTask, addNewDimension, currentIndex } = useAppendix3Func({
    setTouched,
    validateForm,
    touched,
    setFieldValue,
    data: values.dimensions
  });

  const current = values.dimensions[currentIndex];
  const addedRows = useMemo(() => values.dimensions.length > 0, [values.dimensions]);

  const { getSelectProps, getInputProps, getTextAreaProps } = useCustomFormFields();

  return (
    <AppendixLayout
      title={appendix?.title || ""}
      subTitle={decodeURIComponent(appendix?.subTitle || "")}
      teacher={decodeURIComponent((fullName as string) || "")}
      description={appendix?.description || ""}
      width="max-w-full"
    >
      <AppendixForm onSubmit={handleSubmit}>
        <AppendixCard
          step="I"
          title="Plan de mejora continua: registro de planificación y retroalimentación"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Select
                  items={dimensionData}
                  name={`dimensions[${currentIndex}].dimension`}
                  {...getSelectProps(
                    "Dimensión:",
                    "Seleccione una dimensión",
                    dimensionData.length || 0,
                    current.dimension,
                    (errors as any)?.dimensions?.[currentIndex]?.dimension
                  )}
                  onSelectionChange={(keys: SharedSelection) => {
                    const selected = Array.from(keys as Set<string>)[0];
                    setFieldValue(`dimensions[${currentIndex}].dimension`, selected);
                    setFieldValue(`dimensions[${currentIndex}].subDimension`, "");
                  }}
                >
                  {(item: IOptions) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                </Select>
              </div>
              <div>
                <Select
                  items={subDimensionMap[current.dimension] || []}
                  name={`dimensions[${currentIndex}].subDimension`}
                  {...getSelectProps(
                    "Sub-dimensión:",
                    "Seleccione una sub-dimensión",
                    subDimensionMap[current.dimension]?.length || 0,
                    current.subDimension,
                    (errors as any)?.dimensions?.[currentIndex]?.subDimension
                  )}
                  disabled={!current.dimension}
                  onSelectionChange={(keys: SharedSelection) => {
                    const selected = Array.from(keys as Set<string>)[0];
                    setFieldValue(`dimensions[${currentIndex}].subDimension`, selected);
                  }}
                >
                  {(item: IOptions) => <SelectItem key={item.key}>{item.label}</SelectItem>}
                </Select>
              </div>
              <Input
                {...getFieldProps(`dimensions[${currentIndex}].goal`)}
                {...getInputProps(
                  "text",
                  "Objetivos",
                  (touched as any)?.dimensions?.[currentIndex]?.goal,
                  (errors as any)?.dimensions?.[currentIndex]?.goal
                )}
              />
              <Input
                {...getFieldProps(`dimensions[${currentIndex}].levelOfAchievement`)}
                {...getInputProps(
                  "text",
                  "Nivel de logro",
                  (touched as any)?.dimensions?.[currentIndex]?.levelOfAchievement,
                  (errors as any)?.dimensions?.[currentIndex]?.levelOfAchievement
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-6">
              {newTask.map((idx) => (
                <Fragment key={idx}>
                  <Input
                    {...getFieldProps(`dimensions[${currentIndex}].activities[${idx}].activity`)}
                    {...getInputProps(
                      "text",
                      `Actividad ${idx + 1}`,
                      (touched as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.activity,
                      (errors as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.activity
                    )}
                    className="max-w-md"
                  />
                  <Input
                    {...getFieldProps(`dimensions[${currentIndex}].activities[${idx}].resource`)}
                    {...getInputProps(
                      "text",
                      `Recurso ${idx + 1}`,
                      (touched as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.resource,
                      (errors as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.resource
                    )}
                    className="max-w-md"
                  />
                  <Input
                    {...getFieldProps(`dimensions[${currentIndex}].activities[${idx}].timing`)}
                    {...getInputProps(
                      "text",
                      `Temporización ${idx + 1}`,
                      (touched as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.timing,
                      (errors as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.timing
                    )}
                    className="max-w-md"
                  />
                  <Input
                    {...getFieldProps(`dimensions[${currentIndex}].activities[${idx}].successIndicator`)}
                    {...getInputProps(
                      "text",
                      `Indicador de éxito ${idx + 1}`,
                      (touched as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.successIndicator,
                      (errors as any)?.dimensions?.[currentIndex]?.activities?.[idx]?.successIndicator
                    )}
                    className="max-w-md"
                  />
                </Fragment>
              ))}
            </div>
            <div>
              <Link
                href="#"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  addNewTask();
                }}
              >
                Agregar una nueva actividad
              </Link>
            </div>
            <div>
              <Button className="w-full bg-primary-100" onPress={addNewDimension}>
                Agregar
              </Button>
            </div>
            {addedRows && (
              <div className="mt-6">
                <Table aria-label="Dimensiones agregadas">
                  <TableHeader>
                    <TableColumn>Dimensión</TableColumn>
                    <TableColumn>Sub-dimensión</TableColumn>
                    <TableColumn>Objetivos</TableColumn>
                    <TableColumn>Nivel de logro</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent="Sin dimensiones">
                    {values.dimensions.map((d, idx) => (
                      <TableRow key={`${d.dimension}-${idx}`}>
                        <TableCell>{d.dimension || "-"}</TableCell>
                        <TableCell>{d.subDimension || "-"}</TableCell>
                        <TableCell>{d.goal || "-"}</TableCell>
                        <TableCell>{d.levelOfAchievement || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </AppendixCard>
        <AppendixCard step="II" title="Estrategias de acompañamiento">
          <div className="grid grid-cols-2 gap-6">
            <CheckboxGroup
              value={values.strategies}
              label="Seleccionar estrategias utilizadas:"
              onValueChange={(val: string[]) => {
                setFieldValue("strategies", val);
                setFieldValue("otherStrategies", "");
              }}
            >
              {strategiesValueData.map((item) => (
                <Checkbox key={item} value={item}>
                  {item}
                </Checkbox>
              ))}
            </CheckboxGroup>
            {values.strategies?.includes(strategiesValueData[6]) && (
              <Textarea
                {...getFieldProps("otherStrategies")}
                {...getTextAreaProps(
                  "Otras estrategias",
                  "",
                  touched?.otherStrategies,
                  errors?.otherStrategies,
                  false
                )}
                className="max-w-full"
              />
            )}
          </div>
        </AppendixCard>
      </AppendixForm>
    </AppendixLayout>
  );
};

export default Appendix3Form;
