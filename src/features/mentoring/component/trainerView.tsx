import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppendixList } from "../hooks/useAppendixList";
import { IAppendixTable } from "../mentoringType";
import { Eye } from "lucide-react";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/custom/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

type TrainerViewProps = {
  inscriptionId: number;
  teacher: string;
};

const TrainerView = ({ teacher }: TrainerViewProps): React.JSX.Element => {
  const { appendixsList } = useAppendixList();
  console.log(teacher);
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) return text.substring(0, maxLength) + "...";

    return text;
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <CardBody className="pt-3">
              <div className="flex items-start justify-between mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-secondary-500">
                  Docente seleccionado
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">{teacher}</h3>
                  {/*<ul>
                    {appendixsList.map((item: IAppendixTable) => (
                      <li key={item.id}>
                        {item.title} - {item.subTitle}
                      </li>
                    ))}
                  </ul>*/}
                </div>
              </div>
            </CardBody>
          </Card>
          {appendixsList.map((item: IAppendixTable) => (
            <Card key={item.id} className="p-6">
              <CardBody className="pt-3">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${item.color}`}
                  >
                    {item.periodicity} • {item.title}
                  </div>
                  {/* Indicador de la realización */}
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                    <LucideIconRenderer iconName={item.iconName} className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">{item.subTitle}</h3>
                    <p className="text-sm">{truncateText(item.description, 94)}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    as={Link}
                    href={`anexos/${item.id}/${encodeURIComponent(item.subTitle)}`}
                    startContent={<Eye />}
                  >
                    Visualizar
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerView;
