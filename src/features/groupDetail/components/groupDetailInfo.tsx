import { Progress } from "@heroui/react";
import { Info } from "lucide-react";
import { cn } from "@/shared/utils/tv";
import { IGroupTable } from "../../group/groupType";
import { GroupListRender } from "./groupInfo";
import FormAddLeader from "./formAddLeader";
import { usePersonByTypePerson } from "../hooks/usePersonByTypePerson";

const GroupDetailInfo = (props: IGroupTable): React.JSX.Element => {
  const { personList, handleConfirmDeleteLeader } = usePersonByTypePerson(
    props.Zone?.id as number,
    props.id as number
  );

  return (
    <div
      className={cn("bg-white border border-blue-100 mt-6", {
        "max-h-[300px]": Array.isArray(props.GroupLeader) && props.GroupLeader.length > 0,
        "max-h-[400px]": Array.isArray(props.GroupLeader) && !props.GroupLeader.length
      })}
    >
      <div className="p-6 flex items-center gap-2 bg-blue-50 text-blue-500">
        <Info className="h-5 w-5" />
        <h3 className="text-2xl font-semibold">Información</h3>
      </div>

      <div className="p-6 space-y-4">
        <ul className="space-y-3">
          <GroupListRender numList={1} value={props.name} />
          <GroupListRender numList={2} value={props.Zone?.name} />
          {props.GroupLeader && props.GroupLeader.length > 0 ? (
            <GroupListRender
              numList={3}
              value={String(props.GroupLeader[0]?.Person?.fullName)}
              onDeleteLeader={handleConfirmDeleteLeader}
              leaderId={props.GroupLeader[0].id}
            />
          ) : (
            <li>
              {props.Zone && <FormAddLeader personList={personList} groupId={props.id as number} />}
            </li>
          )}
        </ul>

        <div className="space-y-2">
          <div className="flex flex-col justify-between text-sm">
            <Progress
              className="max-w-md"
              label="Capacidad"
              maxValue={props?.memberCount}
              showValueLabel={true}
              size="sm"
              value={props?._count?.Inscription}
              valueLabel={
                <span>
                  <span>450</span>/<span>{props?.memberCount}</span>
                </span>
              }
            />
            {props?._count ? (
              <p className="text-xs text-gray-500">
                {Math.round((props?._count?.Inscription / props?.memberCount) * 100)}% ocupado
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetailInfo;
