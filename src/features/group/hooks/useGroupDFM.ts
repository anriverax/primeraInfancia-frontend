import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { IGroupByUser } from "../groupType";

const useGroupDFM = (): {
  groupDetailList: IGroupByUser[];
} => {
  const { data: groupDetail } = useApiQuery<IGroupByUser[]>(
    "group-detail-byUser",
    "/group/byTypePerson",
    { enabled: true, description: "lista de grupos" }
  );

  return { groupDetailList: groupDetail };
};

export default useGroupDFM;
