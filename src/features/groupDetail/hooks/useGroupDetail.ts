import { IGroupTable } from "../../group/groupType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupTable | undefined;
} => {
  const { data: groupDetail } = useQueryRequest<IGroupTable>(
    `group-detail-${groupId}`, // Unique key for each group
    `/group/${groupId}`,
    true,
    "grupo"
  );

  return { groupDetail };
};

export { useGroupDetail };
