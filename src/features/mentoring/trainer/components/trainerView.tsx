import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import useAxios from "@/shared/hooks/useAxios";
import { useAppendixList } from "@/features/attachment/hooks/appendix/useAppendixList";
import { Eye } from "lucide-react";
import TrainerDetailView from "./detailView";
import dynamic from "next/dynamic";

const LucideIconRenderer = dynamic(
  () => import("@/shared/ui/custom/lucideIcon").then((mod) => mod.LucideIconRenderer),
  {
    ssr: false
  }
);

const TrainerView = (): React.JSX.Element => {
  const useRequest = useAxios(true);
  const { appendixsList } = useAppendixList();

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="flex items-center gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appendixsList?.map((item) => {
          //const IconComponent = item.iconName;

          return (
            <>
              <Card
                key={item?.id}
                className="p-6 h-[285px] hover:shadow-lg  transition-all duration-300 border-border/50 hover:border-accent/20"
              >
                <CardBody className="pt-3">
                  <div className="flex items?-start justify-between mb-6">
                    <div
                      className={`inline-flex items?-center px-3 py-1 rounded-full text-xs font-medium border ${item?.color}`}
                    >
                      {item?.periodicity} • {item?.color}
                    </div>
                    {/* Indicador de la realización */}
                  </div>

                  <div className="flex items?-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg shrink-0 ${item?.color}`}>
                      <LucideIconRenderer iconName={item?.iconName} className="h-5 w-5 text-accent" />
                      {/* <IconComponent className="w-5 h-5 " /> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-card-foreground text-balance leading-tight mb-2">
                        {item?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {truncateText(item?.description, 94)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center text">
                    <Button
                      fullWidth
                      color="primary"
                      variant="shadow"
                      type="submit"
                      as={Link}
                      href={`/admin/mentoria/${item?.id}`}
                      startContent={<Eye />}
                    >
                      Visualizar
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </>
          );
        })}
      </div>
      <TrainerDetailView />
    </div>
  );
};

export default TrainerView;
