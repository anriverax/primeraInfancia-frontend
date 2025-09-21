import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import useAxios from "@/shared/hooks/useAxios";
import { useAppendixList } from "@/features/attachment/hooks/appendix/useAppendixList";
import { Eye, FileText, Users, BookOpen, ClipboardCheck, BarChart3, Target } from "lucide-react";

const TrainerView = (): React.JSX.Element => {
  const useRequest = useAxios(true);
  const { appendixsList } = useAppendixList();

  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appendixsList?.map((item) => {
          const IconComponent = item.iconName;
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
                    {item.periodicity} • {item.title}
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
