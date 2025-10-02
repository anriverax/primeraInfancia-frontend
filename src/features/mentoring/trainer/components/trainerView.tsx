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
  const { appendixsList } = useAppendixList()

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="flex items-center gap-2">
      
      <TrainerDetailView />
    </div>
  );
};

export default TrainerView;
