import { ITrainingModuleTable } from "./trainingModuleType";
import { useApiQuery } from "@/shared/react-query/hook/useApiQuery";

const useTrainingModuleList = (): {
  trainingModuleList: ITrainingModuleTable[];
} => {
  const { data: trainingModuleList } = useApiQuery<ITrainingModuleTable[]>(
    "trainingModule-list",
    "/catalogue/trainingModule",
    true,
    "modulosFormativos"
  );

  return { trainingModuleList: trainingModuleList as ITrainingModuleTable[] };
};

export { useTrainingModuleList };
