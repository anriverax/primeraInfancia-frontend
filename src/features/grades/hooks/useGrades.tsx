import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
interface IEvaluationInstrument {
    id: number;
    code: string;
    name: string;
    periodicity: string;
    percentage: number;
}
interface IEvaluationInstrumentDetail{
    id: number;
    description: number;
}
export interface ITrainingGrades {
    id: number;
    email: string;
    evaluationInstrumentId: number;
    evaluationInstrumentDetailId: number;
    score: number;
    evaluationInstrument: IEvaluationInstrument;
    evaluationInstrumentDetail: IEvaluationInstrumentDetail;
}
/*
[
    {
        "id": 1,
        "email": "byronpenna@gmail.com",
        "evaluationInstrumentId": 1,
        "evaluationInstrumentDetailId": 1,
        "score": 10,
        "createdAt": "2025-10-20T13:10:12.000Z",
        "evaluationInstrument": {
            "id": 1,
            "code": "PD-004",
            "name": "Portafolio Digital",
            "periodicity": "Durante el módulo",
            "percentage": 0.5
        },
        "evaluationInstrumentDetail": {
            "id": 1,
            "description": "Módulo 1",
            "evaluationInstrumentId": 1,
            "percentage": 0.1,
            "moduleNumber": 1
        }
    }
]
* */
const useGrades = (): {
    gradesList: ITrainingGrades[]
} => {
    const { data: gradeDetails } = useQueryRequest<ITrainingGrades[]>(
        "evaluacion-formacion",
        "/grade/all",
        true,
        "grade"
    );

    return {
        gradesList: gradeDetails
    };
};

export default useGrades;
