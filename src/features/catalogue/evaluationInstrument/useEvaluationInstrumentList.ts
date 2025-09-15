import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { IEvaluationInstrumentTable } from "./evaluationInstrumentType";

const useEvaluationInstrumentList = (): {
  evaluationInstrumentList: IEvaluationInstrumentTable[];
} => {
  const { data: evaluationInstrumentList } = useQueryRequest<IEvaluationInstrumentTable[]>(
    "evaluationInstrument-list",
    "/catalogue/evaluationInstrument",
    true,
    "modulosFormativos"
  );

  return { evaluationInstrumentList: evaluationInstrumentList as IEvaluationInstrumentTable[] };
};

export { useEvaluationInstrumentList };
