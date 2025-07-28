import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { PersonByTypePersonResult } from "../groupDetailType";

const usePersonByTypePerson = (
  zoneId: number,
  groupId: number
): { personList: PersonByTypePersonResult[] } => {
  const { data: personList } = useQueryRequest<PersonByTypePersonResult[]>(
    `persons-list-select-${zoneId}-${groupId}`,
    `/group-leader/typePerson/4/zoneId/${zoneId}`,
    true,
    "personas"
  );

  return {
    personList: personList || []
  };
};

export { usePersonByTypePerson };
