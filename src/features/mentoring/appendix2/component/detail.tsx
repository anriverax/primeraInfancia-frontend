"use client";

import { useState } from "react";
import { FileText, Save, StepBack, Trash2 } from "lucide-react";
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  Textarea,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure
} from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";
import { Appendix2Input } from "../type";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

interface ClasificationChildrenData {
  id: string;
  shift: string;
  section: string;
  girlNumber: number;
  boyNumber: number;
  girlDisabilityNumber: number;
  boyDisabilityNumber: number;
}

export const dataList = [
  { name: "experiencie", key: "Menos de un año", label: "Menos de un año" },
  { name: "experiencie", key: "1 a 3 años", label: "1 a 3 años" },
  { name: "experiencie", key: "4 a 10 años", label: "4 a 10 años" },
  { name: "experiencie", key: "Más de 10 años", label: "Más de 10 años" },
  { name: "initialTraining", key: "Licenciatura", label: "Licenciatura" },
  { name: "initialTraining", key: "Bachiller", label: "Bachiller" },
  { name: "initialTraining", key: "Otros", label: "Otros" },
  { name: "levelOfPractice", key: "Necesito apoyo", label: "Necesito apoyo" },
  { name: "levelOfPractice", key: "En desarrollo", label: "En desarrollo" },
  { name: "levelOfPractice", key: "Me siento competente", label: "Me siento competente" },
  { name: "educationalLevelServed", key: "Inicial 3", label: "Inicial 3" },
  { name: "educationalLevelServed", key: "Parvularia 4", label: "Parvularia 4" },
  { name: "educationalLevelServed", key: "Parvulario 5", label: "Parvulario 5" },
  { name: "educationalLevelServed", key: "Parvularia 6", label: "Parvularia 6" },
  { name: "educationalLevelServed", key: "Primer grado", label: "Primer grado" },
  { name: "ampm", key: "a.m.", label: "A.M." },
  { name: "ampm", key: "p.m.", label: "P.M." },
  { name: "additionalEducation", key: "Maestría", label: "Maestría" },
  { name: "additionalEducation", key: "Doctorado", label: "Doctorado" },
  { name: "additionalEducation", key: "Especializacion/Diplomado", label: "Especializacion/Diplomado" },
  { name: "additionalEducation", key: "Otro", label: "Otro" }
];

const experienceList = dataList.filter((item) => item.name === "experiencie");
const initialTrainingList = dataList.filter((item) => item.name === "initialTraining");
const levelOfPracticeList = dataList.filter((item) => item.name === "levelOfPractice");
const educationLevelServedList = dataList.filter((item) => item.name === "educationalLevelServed");
const ampmList = dataList.filter((item) => item.name === "ampm");
const additionalEducationList = dataList.filter((item) => item.name === "additionalEducation");

type Attachment2FormProps = {
  formik: FormikProps<Appendix2Input>;
  id?: number;
  inscription?: number;
};

const Attachment2Form = ({ formik, inscription }: Attachment2FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps, values } = formik;
  const { isOpen, onOpenChange } = useDisclosure();
  const { getInputProps } = useCustomFormFields();
  const searchParams = useSearchParams();
  const search = searchParams ? `?${searchParams.toString()}` : "";
  const [clasificationChildreEntries, setClasificationChildrenEntries] = useState<
    ClasificationChildrenData[]
  >([]);

  const handleDetailTeacher = (): void => {
    // if (!values.shift || !values.section) {
    //   showToast(String("Por favor complete los campos obligatorios: Turno y Sección"), "danger");
    //   return
    // }

    const newEntry: ClasificationChildrenData = {
      id: clasificationChildreEntries.length.toString(),
      shift: values.anx2Ask1,
      section: values.anx2Ask2,
      girlNumber: values.anx2Ask3,
      boyNumber: values.anx2Ask4,
      girlDisabilityNumber: values.anx2Ask5,
      boyDisabilityNumber: values.anx2Ask6
    };

    setClasificationChildrenEntries((prev) => [...prev, newEntry]);
  };

  const handleDelete = (id: string): void => {
    setClasificationChildrenEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const getClasificacion = (entry: ClasificationChildrenData): number => {
    return Number(entry.girlNumber || 0) + Number(entry.boyNumber || 0);
  };

  /* eslint-disable @typescript-eslint/explicit-function-return-type */
  const handleConfirmSubmit = () => {
    handleSubmit();
    onOpenChange();
  };
  /* eslint-enable @typescript-eslint/explicit-function-return-type */
  return (
    <div className="flex justify-center">
      <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-3/4">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
            <FileText className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-bold text-center">Anexo 2</h1>
          <h2 className="text-4xl font-bold text-center">Formulario inicial</h2>
          <p className="text-xl text-justify">
            Un formulario inicial ayuda a establecer un primer vínculo.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <h3 className="pb-6">
            <p className="text-xl text-justify">I. Datos generales del docente</p>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Select
                items={ampmList}
                {...getFieldProps("anx2Ask1")}
                {...getInputProps("anx2Ask1", "Turno: ", touched.anx2Ask1, errors.anx2Ask1)}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
            </div>
            <div className="space-y-2">
              <Select
                items={educationLevelServedList}
                {...getFieldProps("anx2Ask2")}
                {...getInputProps(
                  "anx2Ask2",
                  "Nivel educativo que atiende: ",
                  touched.anx2Ask2,
                  errors.anx2Ask2
                )}
              >
                {(item) => <SelectItem>{item.label}</SelectItem>}
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Input
                {...getFieldProps("anx2Ask3")}
                {...getInputProps(
                  "anx2Ask3",
                  "Total de niñas atendidos",
                  touched.anx2Ask3,
                  errors.anx2Ask3
                )}
              />
            </div>

            <div className="space-y-2">
              <Input
                {...getFieldProps("anx2Ask4")}
                {...getInputProps(
                  "anx2Ask4",
                  "Total de niños atendidos",
                  touched.anx2Ask4,
                  errors.anx2Ask4
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Input
                {...getFieldProps("anx2Ask5")}
                {...getInputProps(
                  "anx2Ask5",
                  "Cantidad de niñas con discapacidad diagnosticada",
                  touched.anx2Ask5,
                  errors.anx2Ask5
                )}
              />
            </div>

            <div className="space-y-2">
              <Input
                {...getFieldProps("anx2Ask6")}
                {...getInputProps(
                  "anx2Ask6",
                  "Cantidad de niños con discapacidad diagnosticada",
                  touched.anx2Ask6,
                  errors.anx2Ask6
                )}
              />
            </div>

            <Button className="w-full" onClick={() => handleDetailTeacher()}>
              Agregar Registro
            </Button>
          </div>

          <div>
            {clasificationChildreEntries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No hay registros ingresados aún
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table aria-label="Example table with dynamic content">
                  <TableHeader>
                    <TableColumn>Turno</TableColumn>
                    <TableColumn>Sección</TableColumn>
                    <TableColumn>Niñas</TableColumn>
                    <TableColumn>Niños</TableColumn>
                    <TableColumn>
                      Niñas con <br />
                      discapacidad diagnosticada
                    </TableColumn>
                    <TableColumn>
                      Niños con <br />
                      discapacidad diagnosticada
                    </TableColumn>
                    <TableColumn>Total</TableColumn>
                    <TableColumn>Acción</TableColumn>
                  </TableHeader>
                  <TableBody items={clasificationChildreEntries}>
                    {(item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.shift}</TableCell>
                        <TableCell>{item.section}</TableCell>
                        <TableCell>{item.girlNumber}</TableCell>
                        <TableCell>{item.boyNumber}</TableCell>
                        <TableCell>{item.girlDisabilityNumber}</TableCell>
                        <TableCell>{item.boyDisabilityNumber}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground">
                            {getClasificacion(item)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <Select
              items={experienceList}
              {...getFieldProps("anx2Ask7")}
              {...getInputProps(
                "anx2Ask7",
                "Años de experiencia docente:",
                touched.anx2Ask7,
                errors.anx2Ask7
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <h3>
            <p className="text-xl text-justify">II. Formación y actualización profesional</p>
          </h3>
          <div className="space-y-3">
            <Select
              items={initialTrainingList}
              {...getFieldProps("anx2Ask8")}
              {...getInputProps(
                "anx2Ask8",
                "1. ¿Cuál es su formación inicial?",
                touched.anx2Ask8,
                errors.anx2Ask8
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={additionalEducationList}
              {...getFieldProps("anx2Ask9")}
              {...getInputProps(
                "anx2Ask9",
                "2. ¿Cuenta con estudios de posgrado u otra formación complementaria?",
                touched.anx2Ask9,
                errors.anx2Ask9
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <RadioGroup
              {...getFieldProps("anx2Ask10")}
              {...getInputProps(
                "anx2Ask10",
                "3. ¿Ha participado recientemente en procesos de formación continua?",
                touched.anx2Ask10,
                errors.anx2Ask10
              )}
            >
              <Radio value="Sí">Sí</Radio>
              <Radio value="No">No</Radio>
            </RadioGroup>
          </div>
          <div className="space-y-3">
            <Input
              {...getFieldProps("anx2Ask11")}
              {...getInputProps(
                "anx2Ask11",
                "Si respondió sí, ¿cuáles?:",
                touched.anx2Ask11,
                errors.anx2Ask11
              )}
            />
          </div>
          <h3 className="pb-6">
            <p className="text-xl text-justify">III. Autopercepción de la práctica docente</p>
          </h3>
          <h4>4. Aspecto de la práctica</h4>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask12")}
              {...getInputProps(
                "anx2Ask12",
                "Conocimiento del desarrollo infantil en la Primera Infancia",
                touched.anx2Ask12,
                errors.anx2Ask12
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask13")}
              {...getInputProps(
                "anx2Ask13",
                "Planificación de experiencias de aprendizaje",
                touched.anx2Ask13,
                errors.anx2Ask13
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask14")}
              {...getInputProps(
                "anx2Ask14",
                "Atención a la inclusión educativa",
                touched.anx2Ask14,
                errors.anx2Ask14
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask15")}
              {...getInputProps(
                "anx2Ask15",
                "Estrategias de juego y exploración",
                touched.anx2Ask15,
                errors.anx2Ask15
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask16")}
              {...getInputProps(
                "anx2Ask16",
                "Evaluación de los aprendizajes",
                touched.anx2Ask16,
                errors.anx2Ask16
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask17")}
              {...getInputProps(
                "anx2Ask17",
                "Relación con las familias",
                touched.anx2Ask17,
                errors.anx2Ask17
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Select
              items={levelOfPracticeList}
              {...getFieldProps("anx2Ask18")}
              {...getInputProps(
                "anx2Ask18",
                "Gestión del ambiente educativo",
                touched.anx2Ask18,
                errors.anx2Ask18
              )}
            >
              {(item) => <SelectItem>{item.label}</SelectItem>}
            </Select>
          </div>
          <div className="space-y-3">
            <Input
              {...getFieldProps("anx2Ask19")}
              {...getInputProps("anx2Ask19", "Otros", touched.anx2Ask19, errors.anx2Ask19)}
            />
          </div>
          <p className="text-xl text-justify">
            IV. Áreas de interés o mejora identificadas por el docente
          </p>
          <div className="space-y-3">
            <Input
              {...getFieldProps("anx2Ask20")}
              {...getInputProps(
                "anx2Ask20",
                "5. ¿En qué aspectos le gustaría mejorar o profundizar su práctica?",
                touched.anx2Ask20,
                errors.anx2Ask20
              )}
            />
          </div>
          <div className="space-y-3">
            <Input
              {...getFieldProps("anx2Ask21")}
              {...getInputProps(
                "anx2Ask21",
                "6. ¿Qué desafíos enfrenta actualmente en su aula?",
                touched.anx2Ask21,
                errors.anx2Ask21
              )}
            />
          </div>
          <p className="text-xl text-justify">V. Expectativas del acompañamiento </p>
          <div className="space-y-3">
            <Input
              {...getFieldProps("anx2Ask22")}
              {...getInputProps(
                "anx2Ask22",
                "7. ¿Qué espera del proceso de mentoría o acompañamiento?",
                touched.anx2Ask22,
                errors.anx2Ask22
              )}
            />
          </div>
          <div className="space-y-3">
            <Input
              {...getFieldProps("anx2Ask23")}
              {...getInputProps(
                "anx2Ask23",
                "8. ¿Hay algo que considere importante que el personal mentor conozca para apoyar mejor su proceso?",
                touched.anx2Ask23,
                errors.anx2Ask23
              )}
            />
          </div>
          <p className="text-xl text-justify">VI. Observaciones del personal mentor</p>
          <div className="space-y-3">
            <Textarea
              {...getFieldProps("anx2Ask24")}
              {...getInputProps(
                "anx2Ask24",
                "Observaciones del personal mentor",
                touched.anx2Ask24,
                errors.anx2Ask24
              )}
            />
          </div>

          <div className="flex space-x-4 mt-8">
            {/* <div className="flex justify-center text"> */}
            <Button
              color="secondary"
              variant="shadow"
              type="button"
              as={Link}
              href={`/admin/grupos/anexos/${inscription}${search}`}
              startContent={<StepBack />}
            >
              Regresar
            </Button>
            <Button
              color="primary"
              variant="shadow"
              type="submit"
              isLoading={isSubmitting}
              startContent={<Save />}
            >
              Enviar
            </Button>
          </div>
        </form>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Confirmar envío</ModalHeader>
                <ModalBody>
                  <p>¿Está seguro de que desea enviar el formulario inicial?</p>
                  <p className="text-sm text-gray-600">
                    Una vez enviado, no podrá realizar modificaciones.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" isLoading={isSubmitting} onPress={handleConfirmSubmit}>
                    Enviar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
export default Attachment2Form;
