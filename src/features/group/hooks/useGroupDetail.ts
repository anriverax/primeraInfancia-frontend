import { IGroupDetail } from "../../group/groupType";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupDetail | undefined;
} => {
  const { data: groupDetail } = useApiQuery<IGroupDetail>({
    key: `group-detail-${groupId}`, // Unique key for each group
    endpoint: `/group/detail/${groupId}`,
    enabled: true,
    description: "grupo"
  });

  return { groupDetail };
};

export { useGroupDetail };
