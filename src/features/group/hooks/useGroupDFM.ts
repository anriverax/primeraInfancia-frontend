import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { IGroupByUser } from "../groupType";

const useGroupDFM = (): {
  groupDetailList: IGroupByUser[];
} => {
  const { data: groupDetail } = useApiQuery<IGroupByUser[]>({
    key: "group-detail-byUser",
    endpoint: "/group/byTypePerson",
    enabled: true,
    description: "lista de grupos"
  });

  return { groupDetailList: groupDetail };
};

export default useGroupDFM;
