import { useApiQuery } from "@/shared/react-query/hook/useApiQuery";
import { ILearningPathTable } from "./learningPathType";

const useLearningPathList = (): {
  learningPathList: ILearningPathTable[];
} => {
  const { data: learningPathList } = useApiQuery<ILearningPathTable[]>(
    "evaluationInstrument-list",
    "/catalogue/evaluationInstrument",
    true,
    "modulosFormativos"
  );
  console.log("useLearningPathList - learningPathList:", learningPathList);
  return { learningPathList: learningPathList as ILearningPathTable[] };
};

export { useLearningPathList };
