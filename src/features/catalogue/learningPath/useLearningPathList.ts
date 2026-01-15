import { useQueryRequest } from "@/shared/hooks/http/useApiQuery";
import { ILearningPathTable } from "./learningPathType";

const useLearningPathList = (): {
  learningPathList: ILearningPathTable[];
} => {
  const { data: learningPathList } = useQueryRequest<ILearningPathTable[]>(
    "evaluationInstrument-list",
    "/catalogue/evaluationInstrument",
    true,
    "modulosFormativos"
  );

  return { learningPathList: learningPathList as ILearningPathTable[] };
};

export { useLearningPathList };
