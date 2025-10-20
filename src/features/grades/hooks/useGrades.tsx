import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

interface IEvaluationInstrument {
    id: number;
    code: string;
    name: string;
    periodicity: string;
    percentage: number;
}

interface IEvaluationInstrumentDetail {
    id: number;
    description: string;
    evaluationInstrumentId: number;
    percentage: number;
    moduleNumber: number;
}

export interface ITrainingGrades {
    id: number;
    email: string;
    evaluationInstrumentId: number;
    evaluationInstrumentDetailId: number;
    score: number;
    evaluationInstrument: IEvaluationInstrument;
    evaluationInstrumentDetail: IEvaluationInstrumentDetail;
    createdAt: string;
    comment: string
}

export interface ITrainingGradeTable {
    id: number;
    docente: string;
    instrumento: string;
    nota: number;
    comentario: string;
}

const useGrades = (): {
    gradesList: ITrainingGradeTable[];
} => {
    const { data: gradeDetails } = useQueryRequest<ITrainingGrades[]>(
        "evaluacion-formacion",
        "/grade/all",
        true,
        "grade"
    );

    const gradesList: ITrainingGradeTable[] =
        gradeDetails?.map((g) => ({
            id: g.id,
            docente: g.email,
            instrumento: g.evaluationInstrument?.name ?? "-",
            nota: g.score ?? 0,
            comentario: g.comment ?? "-",
        })) ?? [];

    return {
        gradesList,
    };
};

export default useGrades;
