import { useParams } from "next/navigation";
import { useAppendix } from "../../hooks/useAppendix";
import { ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { Button, Divider, Input } from "@heroui/react";
import { useAppendix1Form } from "../hook/useAppendix1Form";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import Link from "next/link";
import { AppendixLayout } from "../../component/appendixLayout";
import { AppendixCard } from "../../component/appendixCard";
import { agreement3Data, agreement4Data, agreement5Data } from "../appendix1Data";

const Appendix1Form = (): React.JSX.Element => {
  const params = useParams();
  const { anexoId, groupId, fullName } = params;
  const { appendix } = useAppendix(Number(anexoId));

  const formikAppendix1 = useAppendix1Form(Number(anexoId), Number(groupId));
  const { getFieldProps, touched, errors, handleSubmit } = formikAppendix1;

  const { getInputProps } = useCustomFormFields();

  return (
    <AppendixLayout
      title={appendix?.title || ""}
      subTitle={decodeURIComponent(appendix?.subTitle || "")}
      teacher={decodeURIComponent(fullName?.toString() || "")}
      description={appendix?.description || ""}
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <AppendixCard
          step="I"
          title="Objetivo del acuerdo"
          detail="Estos acuerdos de mentoría tienen como propósito establecer los compromisos mutuos en el marco del proceso de mentoría pedagógica, orientado a fortalecer la práctica docente, fomentar la reflexión profesional y promover el desarrollo continuo del personal docente acompañado."
        />
        <AppendixCard step="II" title="Información general">
          <div className="space-y-6">
            <Input
              {...getFieldProps("estimatedClosingDate")}
              {...getInputProps(
                "date",
                "Fecha estimada de cierre",
                Boolean(touched.estimatedClosingDate),
                errors.estimatedClosingDate as string
              )}
              className="max-w-md"
            />
            <Input
              {...getFieldProps("estimatedFrequencyMeetings")}
              {...getInputProps(
                "text",
                "Frecuencia estimada de encuentros",
                touched.estimatedFrequencyMeetings,
                errors.estimatedFrequencyMeetings
              )}
              className="max-w-md"
            />
          </div>
        </AppendixCard>
        <AppendixCard
          step="III"
          title="Acuerdos del personal docente acompañado"
          detail="Me comprometo a:"
        >
          <div className="space-y-2">
            {agreement3Data.map((item: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </AppendixCard>
        <AppendixCard step="IV" title="Acuerdos del personal mentor" detail="Me comprometo a:">
          <div className="space-y-2">
            {agreement4Data.map((item: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </AppendixCard>
        <AppendixCard step="V" title="Acuerdos compartidos" detail="Ambas partes nos comprometemos a:">
          <div className="space-y-2">
            {agreement5Data.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </AppendixCard>

        <Divider className="my-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
          <Button
            as={Link}
            href="../"
            type="submit"
            color="secondary"
            size="lg"
            startContent={<ArrowLeft className="w-4 h-4 mr-2" />}
          >
            Regresar
          </Button>

          <Button
            type="submit"
            size="lg"
            color="primary"
            startContent={<Send className="w-4 h-4 mr-2" />}
          >
            Enviar acuerdo
          </Button>
        </div>
      </form>
    </AppendixLayout>
  );
};

export default Appendix1Form;
