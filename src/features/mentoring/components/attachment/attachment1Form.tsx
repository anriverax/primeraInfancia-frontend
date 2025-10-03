"use client";

import { FileText } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { FormikProps } from "@/shared/types/globals";

type Attachment1FormProps = {
  formik: FormikProps<any>;
};

const Attachment1Form = ({ formik }: Attachment1FormProps): React.JSX.Element => {
  const { handleSubmit, touched, errors, isSubmitting, getFieldProps } = formik as any;

  const { getInputProps } = useCustomFormFields();
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold text-left">Anexo 1</h1>
        <h2 className="text-4xl font-bold text-left">Acuerdo de mentoría</h2>
        <p className="text-xl text-muted-foreground text-justify">
          El acuerdo de mentoría es un instrumento que ayuda a definir la relación entre mentor o mentora
          y docente. Es importante que se explique y se firme en la primera sesión.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-xl text-muted-foreground text-justify">
          Acuerdos de Mentoría entre el personal mentor y el personal docente acompañado
        </p>
        <Input
          {...getFieldProps("applicationDate")}
          {...getInputProps("applicationDate", "Fecha", touched.applicationDate, errors.applicationDate)}
        />
        <Input
          {...getFieldProps("schoolName")}
          {...getInputProps("schoolName", "Centro educactivo", touched.schoolName, errors.schoolName)}
        />
        <Input
          {...getFieldProps("departmentMunicipality")}
          {...getInputProps(
            "departmentMunicipality",
            "Departamento/Municipio",
            touched.departmentMunicipality,
            errors.departmentMunicipality
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">I. Participantes</p>
        <Input
          {...getFieldProps("teacherName")}
          {...getInputProps(
            "teacherName",
            "Nombre del/la docente acompañado/a",
            touched.teacherName,
            errors.teacherName
          )}
        />
        <Input
          {...getFieldProps("mentorName")}
          {...getInputProps(
            "mentorName",
            "Nombre del/la mentor/a",
            touched.mentorName,
            errors.mentorName
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          II. Objetivo del acuerdo
          <br />
          Estos acuerdos de mentoría tienen como proósito establecer los compromisso mutuos dne el marco
          del proceso de mentría pedagógica, orientado a formatecer la práctica docente, fomentar la
          reflexión profesional y promover el desarrollo continuo del personal docente acompañado.
        </p>
        <p className="text-xl text-muted-foreground text-justify">III. Duración de la mentoría</p>
        <Input
          {...getFieldProps("startDate")}
          {...getInputProps(
            "startDate",
            "Fecha de inicio de acompañamiento",
            touched.startDate,
            errors.startDate
          )}
        />
        <Input
          {...getFieldProps("finishDate")}
          {...getInputProps(
            "finishDate",
            "Feha estimada de cierre",
            touched.finishDate,
            errors.finishDate
          )}
          autoComplete="fecha"
        />
        <Input
          {...getFieldProps("frequencyOfEncounters")}
          {...getInputProps(
            "frequencyOfEncounters",
            "Frecuencia estimada de encuentros",
            touched.frequencyOfEncounters,
            errors.frequencyOfEncounters
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          IV. Acuerdos del personal docente acompañado
          <br />
          Me comprometo a:
        </p>
        <ol>
          <li>Participar activamente en las actividades de mentoria acordadas.</li>
          <li>Abir mi práctica a la observación, la reflexión y la retroalimentación.</li>
          <li>Colaborar en la elaboración del plan de mejora profesional.</li>
          <li>Asistir puntualmente a las reuniones y encuentros programados.</li>
          <li>Mantener una actitud respetuosa, propositiva y receptiva.</li>
          <li>Compartir evidencias y docuemntos que contribuyan al seguimiento de mi proceso.</li>
        </ol>
        <Input
          {...getFieldProps("teacherSignature")}
          {...getInputProps(
            "teacherSignature",
            "Firma del/la docente acompañado/a:",
            touched.teacherSignature,
            errors.teacherSignature
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          V. Acuerdos del personal mentor
          <br />
          Me comprometo a:
        </p>
        <ol>
          <li>Acompañar el proceso con respeto, confidencialidad y actitud de escucha.</li>
          <li>Generar un ambiente de confianza y apoyo profesional.</li>
          <li>Brindar orientación opoprtuna, contextualizada y constructiva.</li>
          <li>Planificar junto con el/la docente el proceso de mejora.</li>
          <li>Sistematizar y documentar los avances del proceso.</li>
          <li>Promover la autonomía y el desarrollo profesional del/la docente.</li>
        </ol>
        <Input
          {...getFieldProps("mentorSignature")}
          {...getInputProps(
            "mentorSignature",
            "Firma del/la docente acompañado/a:",
            touched.mentorSignature,
            errors.mentorSignature
          )}
        />
        <p className="text-xl text-muted-foreground text-justify">
          VI. Acuerdos compartidos
          <br />
          Ambas partes nos comprometemos a:
        </p>
        <ol>
          <li>
            Establecer una relación profesional basada en el respeto, la honestidad y la colaboración.
          </li>
          <li>Revisar periódicamente los avances y realizar ajustes si es necesario.</li>
          <li>Cuidar la confidencialidad de la información compartida durante el proceso.</li>
        </ol>
        <p className="text-xl text-muted-foreground text-justify">
          VII. Seguimiento
          <br />
          Estos acuerdos podrán ser revisados y actualizados de común acuerdo según las necesidades del
          proceso.
        </p>
        <div className="mt-8">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Attachment1Form;
