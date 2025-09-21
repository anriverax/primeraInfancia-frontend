import { Eye, FileText, Users, BookOpen, ClipboardCheck, BarChart3, Target } from "lucide-react";
import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";

const attachmentList = [
  {
    id: 1,
    attachmentName: "Anexo 1",
    title: "Acuerdo de mentoría",
    phase: "Al iniciar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: FileText,
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: 2,
    attachmentName: "Anexo 2",
    title: "Formulario inicial",
    phase: "Al iniciar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: ClipboardCheck,
    color: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: 3,
    attachmentName: "Anexo 3",
    title: "Registro de planificación y retroalimentación: plan de mejora",
    phase: "Al finalizar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: Target,
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: 5,
    attachmentName: "Anexo 5",
    title: "Cuaderno de mentoría",
    phase: "Al finalizar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: BookOpen,
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: 6,
    attachmentName: "Anexo 6",
    title: "Registro de visitas y seguimiento",
    phase: "Al finalizar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: Users,
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: 7,
    attachmentName: "Anexo 7",
    title: "Informe final de mentor que entrega al personal técnico de apoyo",
    phase: "Al finalizar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: BarChart3,
    color: "bg-green-50 text-green-700 border-green-200"
  },
  {
    id: 8,
    attachmentName: "Anexo 8",
    title:
      "Guía de observación y medición del grado de implementación del diseño curricular para la transformación de las prácticas docentes en la aulas de primera infancia de El Salvador",
    phase: "Al finalizar la formación",
    order: "Anexo 1",
    description: "Documento inicial que establece los términos y objetivos de la mentoría",
    icon: Eye,
    color: "bg-green-50 text-green-700 border-green-200"
  }
];

const TrainerView = (): React.JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attachmentList.map((item) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={item.id}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-accent/20"
            >
              <CardBody className="pt-3">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${item.color}`}
                  >
                    {item.phase} • {item.attachmentName}
                  </div>
                  {/* Indicador de la realización */}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                    <IconComponent className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground text-balance leading-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="flex justify-center text">
                  <Button
                    color="primary"
                    as={Link}
                    href={`/admin/mentoria/${item.id}`}
                    className="w-3xs hover:bg-accent/90 text-accent-foreground font-medium transition-colors"
                    size="sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TrainerView;
