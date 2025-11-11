import { IGroupDetail } from "../../group/groupType";
import { useQueryRequest } from "@/shared/hooks/useApiQuery";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupDetail | undefined;
} => {
  const { data: groupDetail } = useQueryRequest<IGroupDetail>(
    `group-detail-${groupId}`, // Unique key for each group
    `/group/detail/${groupId}`,
    true,
    "grupo"
  );

  return { groupDetail };
};

export { useGroupDetail };
