import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { ILearningPathTable } from "./learningPathType";

const useLearningPathList = (): {
  learningPathList: ILearningPathTable[];
} => {
  const { data: learningPathList } = useApiQuery<ILearningPathTable[]>({
    key: "evaluationInstrument-list",
    endpoint: "/catalogue/evaluationInstrument",
    enabled: true,
    description: "modulosFormativos"
  });

  return { learningPathList: learningPathList as ILearningPathTable[] };
};

export { useLearningPathList };
