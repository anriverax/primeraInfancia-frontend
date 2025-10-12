import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { IGroupByUser } from "../groupType";

const useGroupDFM = (): {
  groupDetailList: IGroupByUser[];
} => {
  const { data: groupDetail } = useQueryRequest<IGroupByUser[]>(
    "group-detail-byUser",
    "/group/byTypePerson",
    true,
    "grupo"
  );

  return { groupDetailList: groupDetail };
};

export default useGroupDFM;
