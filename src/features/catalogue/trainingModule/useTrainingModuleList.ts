import { ITrainingModuleTable } from "./trainingModuleType";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";

const useTrainingModuleList = (): {
  trainingModuleList: ITrainingModuleTable[];
} => {
  const { data: trainingModuleList } = useApiQuery<ITrainingModuleTable[]>({
    key: "trainingModule-list",
    endpoint: "/catalogue/trainingModule",
    enabled: true,
    description: "modulosFormativos"
  });

  return { trainingModuleList: trainingModuleList as ITrainingModuleTable[] };
};

export { useTrainingModuleList };
