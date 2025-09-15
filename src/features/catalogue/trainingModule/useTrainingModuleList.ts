import { ITrainingModuleTable } from "./trainingModuleType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useTrainingModuleList = (): {
  trainingModuleList: ITrainingModuleTable[];
} => {
  const { data: trainingModuleList } = useQueryRequest<ITrainingModuleTable[]>(
    "trainingModule-list",
    "/catalogue/trainingModule",
    true,
    "modulosFormativos"
  );

  return { trainingModuleList: trainingModuleList as ITrainingModuleTable[] };
};

export { useTrainingModuleList };
