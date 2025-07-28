import { Button, Select, SelectItem } from "@heroui/react";
import { PersonByTypePersonResult } from "../groupDetailType";
import { usePersonByTypePerson } from "../hooks/usePersonByTypePerson";
import { useFormAddLeader } from "../hooks/useFormAddLeader";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";

interface FormAddLeaderProps {
  zoneId: number;
  groupId: number;
}

const FormAddLeader = ({ zoneId, groupId }: FormAddLeaderProps): React.JSX.Element => {
  const { leaderFormik } = useFormAddLeader(groupId);
  const { values, touched, errors, handleSubmit, getFieldProps, isSubmitting } = leaderFormik;

  const { personList } = usePersonByTypePerson(zoneId, groupId);
  const { getSelectProps } = useCustomFormFields();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Select
          items={personList ? personList : []}
          {...getSelectProps(
            "Seleccione una formador",
            personList ? personList.length : 0,
            values.trainerId,
            touched.trainerId,
            errors.trainerId
          )}
          {...getFieldProps("trainerId")}
        >
          {(person: PersonByTypePersonResult) => (
            <SelectItem key={person.id}>{person.fullName}</SelectItem>
          )}
        </Select>

        <div className="flex flex-row gap-2 py-4">
          <Button fullWidth type="submit" color="primary" isLoading={isSubmitting}>
            Agregar formador
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormAddLeader;
