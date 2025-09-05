import { IGroupDetail } from "../../group/groupType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupDetail | undefined;
} => {
  const { data: groupDetail } = useQueryRequest<IGroupDetail>(
    `group-detail-${groupId}`, // Unique key for each group
    `/group/${groupId}`,
    true,
    "grupo"
  );

  return { groupDetail };
};

export { useGroupDetail };
