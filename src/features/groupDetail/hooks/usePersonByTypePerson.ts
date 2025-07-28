import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { PersonByTypePersonResult } from "../groupDetailType";
// IPersonList
const usePersonByTypePerson = (zoneId: number) => {
  const { data: personList } = useQueryRequest<PersonByTypePersonResult[]>(
    "persons-list-select",
    `/group-leader/typePerson/4/zoneId/${zoneId}`,
    true,
    "personas"
  );

  return {
    personList: personList || []
  };
};

export { usePersonByTypePerson };
