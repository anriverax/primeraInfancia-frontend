import { useQueryRequest } from "@/shared/hooks/http/useApiQuery";
import { ISchoolDetail } from "../schoolType";

const useSchoolDetail = (
  schoolId: number
): {
  schoolDetail: ISchoolDetail | undefined;
} => {
  const { data: schoolDetail } = useQueryRequest<ISchoolDetail>(
    `school-detail-${schoolId}`, // Unique key for each group
    `/catalogue/school/${schoolId}`,
    true,
    "centro escolar"
  );

  return { schoolDetail };
};

export { useSchoolDetail };
