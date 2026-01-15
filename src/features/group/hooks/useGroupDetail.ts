import { IGroupDetail } from "../../group/groupType";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";

const useGroupDetail = (
  groupId: number
): {
  groupDetail: IGroupDetail | undefined;
} => {
  const { data: groupDetail } = useApiQuery<IGroupDetail>(
    `group-detail-${groupId}`, // Unique key for each group
    `/group/detail/${groupId}`,
    { enabled: true, description: "grupo" }
  );

  return { groupDetail };
};

export { useGroupDetail };
