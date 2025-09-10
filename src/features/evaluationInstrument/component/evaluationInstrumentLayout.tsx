import { useEvaluationInstrumentsList } from "../hooks/evaluationInstrument/useEvaluationInstrumentList";

import EvaluationInstrumentTable from "./table";

const EvaluationInstrumentLayout = (): React.JSX.Element => {
  const { evaluationInstrumentsList } = useEvaluationInstrumentsList();

  return (
    <>
      <EvaluationInstrumentTable evaluationInstrumentsList={evaluationInstrumentsList} />
    </>
  );
};

export default EvaluationInstrumentLayout;
