import { IGroupTable } from "../groupType";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupTable | undefined;
} => {
  const { data: groupDetail } = useQueryRequest<IGroupTable>(
    "group-detail",
    `/group/${groupId}`,
    true,
    "grupo"
  );

  return { groupDetail };
};

export { useGroupDetail };
